// Actions from Dashboard
if (_action === "createBudget") {
  try {
      createBudget({
          name: values.newBudget,
          amount: values.newBudgetAmount,
      })
      return toast.success('Budget created!')
  } catch (e) {
      throw new Error("There is a problem creating your budget.")
  }
}

if (_action === "createExpense") {
  try {
      createExpense({
          name: values.newExpense,
          amount: values.newExpenseAmount,
          budgetId: values.newExpenseBudget
      })

      return toast.success(`Expense ${values.newExpense} created!`)
  } catch (e) {
      throw new Error("There was a problem creating your expense.")
  }
}

if (_action === "deleteExpense") {
  try {
      deleteItem({
          key: "expenses",
          id: values.expenseId,
      })

      return toast.success("Expense Deleted!")
  } catch (e) {
      throw new Error("There was a problem deleting your expense.")
  }
}


// This is an unmodified Dashboard 
const Dashboard = () => {
  const { userName, budgets, expenses } = useLoaderData()

   return (
       <>
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
                           </div>
                       )
                   }
               </div>
           </div>
         ) : <Intro />}
       </>
   )
}


// Dashboards conditional for budget and expense forms

<div className="grid-sm">
{
    budgets && budgets.length > 0 
    ? (
    <div className="grid-lg">
        <div className="flex-lg">

        </div>
        <h2>Existing Budgets</h2>
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
        </div>
    )
}
</div>


// UnAltered App.jsx File
// rrd imports
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// library imports
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layouts
import Main, { mainLoader } from "./layouts/Main";

// Actions
import { logoutAction } from "./actions/Logout";
import { deleteBudget } from "../z-old-files/DeleteBudget";

// Routes
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import Error from "./pages/Error";
import ExpensesPage, { expensesAction, expensesLoader } from "../z-old-files/ExpensesPage";
import BudgetPage, { budgetAction, budgetLoader } from "./pages/BudgetPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement: <Error />
      },
      {
        path: "logout",
        action: logoutAction
      }
    ]
  },
]);

function App() {
  return <div className="App">
    <RouterProvider router={router} />
    <ToastContainer />
  </div>; 
}

export default App
