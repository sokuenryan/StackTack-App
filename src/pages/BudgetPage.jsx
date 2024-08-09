// rrd imports
import { useLoaderData } from "react-router-dom";

// library
import { toast } from "react-toastify";

// components
import AddExpenseForm from "../component/AddExpenseForm";
import Item from "../component/Item";
import Table from "../component/Table";

// helpers
import { createExpense, deleteItem, getAllMatchingItems } from "../helpers";

// loader
export async function Loader({params}) {
    const  = await getAllMatchingItems({
        category: "s",
        key: "id",
        value: params.id,
    })[0];

    const expenses = await getAllMatchingItems({
        category: "expenses",
        key: "Id",
        value: params.id,
    });

    if(!) {
        throw new Error("The  you're trying to find doesn't exist.")
    }

    return { , expenses }
}

// action
export async function Action({ request }) {
    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data);

    if (_action === "createExpense") {
        try {
            createExpense({
                name: values.newExpense,
                amount: values.newExpenseAmount,
                Id: values.newExpense
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
        });
        return toast.success("Expense Deleted!");
        } catch (e) {
            throw new Error("There was a problem deleting your expense.");
        }
   }
}

const Page = () => {
    const { , expenses } = useLoaderData();

    return (
        <div className="grid-lg" 
        style={{
            "--accent": .color,
        }}>
            <h1 className="h2">
                <span className="accent">{.name}</span> Overview 
            </h1>
            <div className="flex-lg">
                <Item ={} showDelete={true} />
                <AddExpenseForm s={[]} />
            </div>
            {
                expenses && expenses.length > 0 && (
                    <div className="grid-md">
                        <h2>
                            <span className="accent">{.name}</span> Expenses
                        </h2>
                        <Table expenses={expenses} show={false} />
                    </div>
                )
            }
        </div>
    )
};

export default Page;