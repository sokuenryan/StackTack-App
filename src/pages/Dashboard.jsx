import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchData } from "../helpers";
import Sidebar from "../component/Sidebar";
import Login from "../pages/Login";

export function dashboardLoader() {
    const userName = fetchData("userName");
    return { userName };
}

export async function dashboardAction({ request }) {
    const data = await request.formData();
    const {_action, ...values} = Object.fromEntries(data);
    
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
<<<<<<< HEAD
          {userName ? (
            <div className="dashboard">
                <h1>
                    Welcome back, <span className="accent">{ userName}</span>
                </h1>
                <div className="grid-sm">
                    {
                        budgets && budgets.length > 0 
                        ? (
                        <div className="grid-lg">
                            <div className="flex-lg">
                                <AddBudgetForm />
                                <AddExpenseForm budgets={budgets} />
                            </div>
                            <h2>Existing Budgets</h2>
                            <div className="budgets">
                                {
                                    budgets.map((budget) => (
                                        <BudgetItem key={budget.id} budget={budget} />
                                    ))
                                }
                            </div>
                            {
                                expenses && expenses.length > 0 && (
                                    <div className="grid-md">
                                        <h2>Recent Expenses</h2>
                                        <Table expenses={expenses.sort
                                        ((a, b ) => 
                                        b.createdAt - a.createdAt).slice(0, 8)} 
                                        />
                                        {expenses.length > 8 && (
                                            <Link
                                                to="expenses"
                                                className="btn btn--dark"
                                            >
                                                View all expenses
                                            </Link>
                                        )
                                        }
                                    </div>
                                )
                            }
                        </div>
                        ) : (
                            <div className="grid-sm">
                                    <p>Personal budgeting is the secret to financial freedom.</p>
                                    <p>Create a budget to get started!</p>
                                <AddBudgetForm />
                            </div>
                        )
                    }
=======
            {userName ? (
                <div className="dashboard-header">
                    <h2>
                        Welcome back, <span className="accent">{userName}</span>
                    </h2>
                    <Sidebar />
>>>>>>> b284e689ec5c2a442a1f879bf2c354672fc1c24b
                </div>
            ) : (
                <Login />
            )}
        </>
    );
}

export default Dashboard;
