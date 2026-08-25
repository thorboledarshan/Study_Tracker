import { useEffect, useState } from "react";

import
{
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
}
    from "recharts";


function Dashboard({ refresh, setPage })
{
    const [logs, setLogs] = useState([]);

    const [subjectSummary, setSubjectSummary] = useState([]);

    const [dateSummary, setDateSummary] = useState([]);


    // =================================
    // Fetch Dashboard Data
    // =================================

    useEffect(() =>
    {
        fetchLogs();

        fetchSubjectSummary();

        fetchDateSummary();

    }, [refresh]);


    // =================================
    // Fetch All Logs
    // =================================

    const fetchLogs = () =>
    {
        fetch("http://localhost:8080/api/logs")
            .then((response) => response.json())
            .then((data) =>
            {
                setLogs(data);
            })
            .catch((error) =>
            {
                console.error("Error fetching logs:", error);
            });
    };


    // =================================
    // Fetch Summary By Subject
    // =================================

    const fetchSubjectSummary = () =>
    {
        fetch("http://localhost:8080/api/logs/summary/subject")
            .then((response) => response.json())
            .then((data) =>
            {
                const formattedData = Object.entries(data).map(
                    ([subject, duration]) =>
                        ({
                            subject: subject,
                            duration: Number(duration)
                        })
                );

                setSubjectSummary(formattedData);
            })
            .catch((error) =>
            {
                console.error(
                    "Error fetching subject summary:",
                    error
                );
            });
    };


    // =================================
    // Fetch Summary By Date
    // =================================

    const fetchDateSummary = () =>
    {
        fetch("http://localhost:8080/api/logs/summary/date")
            .then((response) => response.json())
            .then((data) =>
            {
                const formattedData = Object.entries(data).map(
                    ([date, duration]) =>
                        ({
                            date: date,
                            duration: Number(duration)
                        })
                );

                setDateSummary(formattedData);
            })
            .catch((error) =>
            {
                console.error(
                    "Error fetching date summary:",
                    error
                );
            });
    };


    // =================================
    // Calculate Total Study Hours
    // =================================

    const totalHours = logs.reduce(
        (total, log) => total + Number(log.duration),
        0
    );


    // =================================
    // Calculate Subjects
    // =================================

    const subjects = [
        ...new Set(
            logs.map((log) => log.subject)
        )
    ];


    // =================================
    // Find Most Studied Subject
    // =================================

    let mostStudiedSubject = "N/A";

    let highestDuration = 0;

    subjectSummary.forEach((item) =>
    {
        if(item.duration > highestDuration)
        {
            highestDuration = item.duration;

            mostStudiedSubject = item.subject;
        }
    });


    // =================================
    // Dashboard UI
    // =================================

    return (
        <div className="dashboard">


            {/* =================================
                DASHBOARD TITLE
            ================================= */}

            <div className="dashboard-title">

                <h2>
                    Dashboard
                </h2>

                <p>
                    Overview of your study progress
                </p>

            </div>


            {/* =================================
                FOUR DASHBOARD CARDS
            ================================= */}

            <div className="dashboard-cards">


                {/* Total Logs */}

                <div className="dashboard-card">

                    <div className="card-icon">
                        📚
                    </div>

                    <div className="card-content">

                        <span>
                            Total Study Logs
                        </span>

                        <strong>
                            {logs.length}
                        </strong>

                    </div>

                </div>


                {/* Total Hours */}

                <div className="dashboard-card">

                    <div className="card-icon">
                        ⏱️
                    </div>

                    <div className="card-content">

                        <span>
                            Total Study Hours
                        </span>

                        <strong>
                            {totalHours.toFixed(1)}
                        </strong>

                    </div>

                </div>


                {/* Subjects */}

                <div className="dashboard-card">

                    <div className="card-icon">
                        📖
                    </div>

                    <div className="card-content">

                        <span>
                            Subjects Studied
                        </span>

                        <strong>
                            {subjects.length}
                        </strong>

                    </div>

                </div>


                {/* Most Studied Subject */}

                <div className="dashboard-card">

                    <div className="card-icon">
                        🏆
                    </div>

                    <div className="card-content">

                        <span>
                            Most Studied Subject
                        </span>

                        <strong className="top-subject">
                            {mostStudiedSubject}
                        </strong>

                    </div>

                </div>

            </div>


            {/* =================================
                CHARTS
            ================================= */}

            <div className="dashboard-charts">


                {/* =================================
                    SUBJECT SUMMARY
                ================================= */}

                <div className="dashboard-chart-card">

                    <div className="chart-header">

                        <h3>
                            Summary By Subject
                        </h3>

                        <p>
                            Total study duration by subject
                        </p>

                    </div>


                    {subjectSummary.length === 0 ? (

                        <div className="chart-empty">
                            No subject data available.
                        </div>

                    ) : (

                        <ResponsiveContainer
                            width="100%"
                            height={320}
                        >

                            <BarChart
                                data={subjectSummary}
                                margin={{
                                    top: 10,
                                    right: 20,
                                    left: 0,
                                    bottom: 10
                                }}
                            >

                                <CartesianGrid
                                    strokeDasharray="3 3"
                                />

                                <XAxis
                                    dataKey="subject"
                                />

                                <YAxis />

                                <Tooltip />

                                <Bar
                                    dataKey="duration"
                                    name="Study Hours"
                                    fill="#2563eb"
                                    radius={[5, 5, 0, 0]}
                                />

                            </BarChart>

                        </ResponsiveContainer>

                    )}

                </div>


                {/* =================================
                    DATE SUMMARY
                ================================= */}

                <div className="dashboard-chart-card">

                    <div className="chart-header">

                        <h3>
                            Summary By Date
                        </h3>

                        <p>
                            Total study duration by date
                        </p>

                    </div>


                    {dateSummary.length === 0 ? (

                        <div className="chart-empty">
                            No date data available.
                        </div>

                    ) : (

                        <ResponsiveContainer
                            width="100%"
                            height={320}
                        >

                            <LineChart
                                data={dateSummary}
                                margin={{
                                    top: 10,
                                    right: 20,
                                    left: 0,
                                    bottom: 10
                                }}
                            >

                                <CartesianGrid
                                    strokeDasharray="3 3"
                                />

                                <XAxis
                                    dataKey="date"
                                />

                                <YAxis />

                                <Tooltip />

                                <Line
                                    type="monotone"
                                    dataKey="duration"
                                    name="Study Hours"
                                    stroke="#2563eb"
                                    strokeWidth={3}
                                    dot={{
                                        r: 5
                                    }}
                                    activeDot={{
                                        r: 7
                                    }}
                                />

                            </LineChart>

                        </ResponsiveContainer>

                    )}

                </div>

            </div>

        </div>
    );
}

export default Dashboard;