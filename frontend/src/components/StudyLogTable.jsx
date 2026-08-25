import { useEffect, useState } from "react";

function StudyLogTable({ refresh, onLogDeleted })
{
    const [logs, setLogs] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() =>
    {
        fetch("http://localhost:8080/api/logs")
            .then((response) => response.json())
            .then((data) =>
            {
                setLogs(data);

            })
            .catch((error) =>
            {
                console.error("Error:", error);
            });

    }, [refresh]);

    const handleDelete = (id) =>
    {
        const confirmed = window.confirm(
            "Are you sure you want to delete this study log?"
        );

        if(!confirmed)
        {
            return;
        }

        fetch(`http://localhost:8080/api/logs/${id}`,
            {
                method: "DELETE"
            })
            .then((response) => response.text())
            .then((data) =>
            {
                setMessage(data);

                if(onLogDeleted)
                {
                    onLogDeleted();
                }
            })
            .catch((error) =>
            {
                console.error("Error:", error);
                setMessage("Error while deleting study log");
            });
    };

    return (
        <div className="card">

            <h2>Study Logs</h2>

            {message && (
                <p className="success-message">
                    {message}
                </p>
            )}

            {logs.length === 0 ? (
                <div className="empty-state">
                    <h3>No Study Logs Found</h3>
                    <p>Add your first study log to get started.</p>
                </div>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Subject</th>
                        <th>Duration</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                    </thead>

                    <tbody>
                    {logs.map((log) => (
                        <tr key={log.id}>
                            <td>{log.id}</td>
                            <td>{log.date}</td>
                            <td>{log.subject}</td>
                            <td>{log.duration} hrs</td>
                            <td>{log.description}</td>
                            <td>
                                <button
                                    className="delete-button"
                                    onClick={() => handleDelete(log.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

        </div>
    );
}

export default StudyLogTable;