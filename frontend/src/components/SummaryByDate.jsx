import { useEffect, useState } from "react";

function SummaryByDate({ refresh })
{
    const [summary, setSummary] = useState({});

    useEffect(() =>
    {
        fetch("http://localhost:8080/api/logs/summary/date")
            .then((response) => response.json())
            .then((data) =>
            {
                setSummary(data);
            })
            .catch((error) =>
            {
                console.error("Error:", error);
            });

    }, [refresh]);

    return (
        <div className="card">
            <h2>Summary By Date</h2>

            {Object.keys(summary).length === 0 ? (
                <div className="empty-state">
                    <h3>No Study Data Found</h3>
                    <p>Add study logs to see your daily summary.</p>
                </div>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Total Study Duration</th>
                    </tr>
                    </thead>

                    <tbody>
                    {Object.entries(summary).map(([date, duration]) => (
                        <tr key={date}>
                            <td>{date}</td>
                            <td>{duration} hrs</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default SummaryByDate;