import { useState } from "react";

function CSVOperations({ onDataChanged })
{
    const [message, setMessage] = useState("");
    const [fileName, setFileName] = useState("");
    const [messageType, setMessageType] = useState("");

    const handleExport = () =>
    {
        fetch("http://localhost:8080/api/logs/export")
            .then((response) => response.text())
            .then((data) =>
            {
                setMessage(data);
                setMessageType("success");
            })
            .catch((error) =>
            {
                console.error("Error:", error);
                setMessage("Error while exporting CSV");
                setMessageType("error");
            });
    };

    const handleImport = () =>
    {
        if(fileName.trim() === "")
        {
            setMessage("Please enter CSV file name");
            return;
        }

        fetch(
            `http://localhost:8080/api/logs/import?fileName=${encodeURIComponent(fileName)}`,
            {
                method: "POST"
            }
        )
            .then((response) => response.text())
            .then((data) =>
            {
                setMessage(data);
                setMessageType("success");
                onDataChanged();
            })
            .catch((error) =>
            {
                console.error("Error:", error);
                setMessage("Error while importing CSV");
                setMessageType("error");

            });
    };

    return (
        <div className="card">

            <h2>CSV Operations</h2>

            <div className="csv-section">

                <div className="csv-buttons">

                    <button
                        className="primary-button"
                        onClick={handleExport}
                    >
                        Export CSV
                    </button>

                </div>

                <div>
                    <label>
                        CSV File Path
                    </label>

                    <input
                        className="csv-input"
                        type="text"
                        placeholder="Enter CSV file path"
                        value={fileName}
                        onChange={(event) =>
                            setFileName(event.target.value)
                        }
                    />
                </div>

                <div className="csv-buttons">

                    <button
                        className="secondary-button"
                        onClick={handleImport}
                    >
                        Import CSV
                    </button>

                </div>

                {message && (
                    <p className={messageType === "success"
                        ? "success-message"
                        : "error-message"}>
                        {message}
                    </p>
                )}

            </div>

        </div>
    );
}

export default CSVOperations;