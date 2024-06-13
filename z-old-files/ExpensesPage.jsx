// rrd imports
import { useLoaderData } from "react-router-dom";

// library imports
import { toast } from "react-toastify";

// components
import Table from "./Table";

// helpers
import { deleteItem, fetchData } from "../src/helpers";


// loader 
export function expensesLoader() {
    const expenses = fetchData("expenses");
    return { expenses };
}

// action
export async function expensesAction({ request }) {
    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data);

   if (_action === "deleteExpense") {
    try {
        deleteItem({
            key: "expenses",
            id: values.expenseId,
        });
        return toast.success("Expense Deleted!");
        } catch (e) {
            throw new Error("There was a problem deleting your expense.");
        }
   }
    
}



const ExpensesPage = () => {
    const { expenses } = useLoaderData();

    return (
        <div className="grid-lg">
            <h1>All Expenses</h1>
            {
                expenses && expenses.length > 0 
                ? (
                    <div className="grid-md">
                        <h2>
                            Recent Expenses 
                            <small>
                                ({expenses.length} total)
                            </small>
                        </h2>
                        <Table expenses={expenses} />
                    </div>
                )
                : <p>You have no expenses at this time.</p>
            }
        </div>
    )
};

export default ExpensesPage;