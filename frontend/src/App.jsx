import { useState } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import StudyLogForm from "./components/StudyLogForm";
import StudyLogTable from "./components/StudyLogTable";
import SummaryByDate from "./components/SummaryByDate";
import SummaryBySubject from "./components/SummaryBySubject";
import CSVOperations from "./components/CSVOperations";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";

function App()
{
    const [page, setPage] = useState("dashboard");

    const [refresh, setRefresh] = useState(false);

    return (
        <div>

            <Navbar page={page} setPage={setPage} />

            <main className="main-content">

                {page === "dashboard" && (
                    <Dashboard
                        refresh={refresh}
                    />
                )}

                {page === "add" && (
                    <StudyLogForm
                        onLogAdded={() => setRefresh(!refresh)}
                    />
                )}

                {page === "logs" && (
                    <StudyLogTable
                        refresh={refresh}
                        onLogDeleted={() => setRefresh(!refresh)}
                    />
                )}

                {page === "date" && (
                    <SummaryByDate
                        refresh={refresh}
                    />
                )}

                {page === "subject" && (
                    <SummaryBySubject
                        refresh={refresh}
                    />
                )}

                {page === "csv" && (
                    <CSVOperations
                        onDataChanged={() => setRefresh(!refresh)}
                    />
                )}
            </main>

            <Footer />

        </div>
    );
}

export default App;