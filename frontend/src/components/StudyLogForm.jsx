import { useState, useEffect } from "react";

function StudyLogForm({ onLogAdded })
{
    const [date, setDate] = useState("");
    const [subject, setSubject] = useState("");
    const [duration, setDuration] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");


    const handleSubmit = async (event) =>
    {
        event.preventDefault();

        const studyLog =
            {
                date: date,
                subject: subject,
                duration: Number(duration),
                description: description
            };

        try
        {
            const response = await fetch(
                "http://localhost:8080/api/logs",
                {
                    method: "POST",

                    headers:
                        {
                            "Content-Type": "application/json"
                        },

                    body: JSON.stringify(studyLog)
                }
            );

            if(response.ok)
            {
                setMessage("Study log added successfully!");

                setDate("");
                setSubject("");
                setDuration("");
                setDescription("");

                onLogAdded();
            }
            else
            {
                setMessage("Failed to add study log");
            }
        }
        catch(error)
        {
            console.error("Error:", error);
            setMessage("Error while adding study log");
        }
    };

    return (
        <div className="card">

            <h2>Add Study Log</h2>

            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <label>Date</label>

                    <input
                        type="date"
                        value={date}
                        onChange={(event) => setDate(event.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Subject</label>

                    <input
                        type="text"
                        value={subject}
                        onChange={(event) => setSubject(event.target.value)}
                        placeholder="Enter subject"
                    />
                </div>

                <div className="form-group">
                    <label>Duration (hours)</label>

                    <input
                        type="number"
                        step="0.1"
                        value={duration}
                        onChange={(event) => setDuration(event.target.value)}
                        placeholder="Enter study duration"
                    />
                </div>

                <div className="form-group">
                    <label>Description</label>

                    <textarea
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        placeholder="Enter description"
                    />
                </div>

                <button
                    type="submit"
                    className="primary-button"
                >
                    Add Study Log
                </button>

            </form>

        </div>

    );
}

export default StudyLogForm;