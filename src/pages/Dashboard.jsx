import { useLoaderData } from "react-router-dom";

// libraries
import { toast } from "react-toastify";

// helpers
import { fetchData } from "../helpers";

// components
import Sidebar from "../component/Sidebar";
import Intro from "../component/Intro";

// loader 
export function dashboardLoader() {
    const userName = fetchData("userName");
    return { userName };
}

// action
export async function dashboardAction({ request }) {
    const data = await request.formData();
    const {_action, ...values} = Object.fromEntries(data);
    
    // new user submission
    if (_action === "newUser") {
        try {
            localStorage.setItem("userName", JSON.stringify(values.userName));
            return toast.success(`Welcome, ${values.userName}!`);
        } catch(e) {
            throw new Error("There was a problem creating your account.");
        }
    }
}

const Dashboard = () => {
    const { userName } = useLoaderData();

    return (
        <>
            {userName ? (
                <div className="dashboard-header">
                    <h2>
                        Welcome back, <span className="accent">{userName}</span>
                    </h2>
                    <Sidebar />
                </div>
            ) : (
                <Intro />
            )}
        </>
    );
}

export default Dashboard;
