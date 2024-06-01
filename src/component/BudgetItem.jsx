// rrd imports
import { Form, Link } from "react-router-dom";

// library imports
import { BanknotesIcon } from "@heroicons/react/24/outline";

// Helper functions
import { calculateSpentByBudget, formatCurrency, formatPecentage } from "../helpers";
import { TrashIcon } from "@heroicons/react/16/solid";

const BudgetItem = ({ budget, showDelete = false }) => {
    const {id, name, amount, color } = budget
    const spent = calculateSpentByBudget(id);

    return (
        <div
        className="budget"
        style={{
            "--accent": color
        }}
        >
            <div className="progress-text">
                <h3>{name}</h3>
                <p>{formatCurrency(amount)} Budgeted</p>
                <progress max={amount} value="100">
                    {formatPecentage(spent / amount)}
                </progress>
                <div className="progress-text">
                    <small>{formatCurrency(spent)} spent</small>
                    <small>{formatCurrency(amount - spent)} remaining</small>
                </div>
                {
                    showDelete ? (
                            <Form 
                                method="post"
                                action="delete"
                                onSubmit={(event) => {
                                    if(!confirm("Are you sure you want to permanently delete this budget?")){
                                        event.preventDefault();
                                    }
                                }}
                                >
                                    <button typeof="submit" className="btn">
                                        <span>Delete Budget</span>
                                        <TrashIcon width={20} />
                                    </button>
                            </Form>
                    ) : (
                            <Link to={`/budget/${id}`} className="btn">
                                <span>View Details</span>
                                <BanknotesIcon width={24} />
                            </Link>
                    )
                }
            </div>
        </div>     
    )
}

export default BudgetItem;