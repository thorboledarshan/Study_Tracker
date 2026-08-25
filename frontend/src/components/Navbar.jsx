function Navbar({ page, setPage })
{
    return (
        <nav className="navbar">

            <h1>Study Tracker</h1>

            <div className="navbar-buttons">

                <button
                    className={page === "dashboard" ? "active" : ""}
                    onClick={() => setPage("dashboard")}
                >
                    Dashboard
                </button>

                <button
                    className={page === "add" ? "active" : ""}
                    onClick={() => setPage("add")}
                >
                    Add Log
                </button>

                <button
                    className={page === "logs" ? "active" : ""}
                    onClick={() => setPage("logs")}
                >
                    Study Logs
                </button>

                <button
                    className={page === "date" ? "active" : ""}
                    onClick={() => setPage("date")}
                >
                    Summary By Date
                </button>

                <button
                    className={page === "subject" ? "active" : ""}
                    onClick={() => setPage("subject")}
                >
                    Summary By Subject
                </button>

                <button
                    className={page === "csv" ? "active" : ""}
                    onClick={() => setPage("csv")}
                >
                    CSV Operations
                </button>

            </div>

        </nav>
    );
}

export default Navbar;