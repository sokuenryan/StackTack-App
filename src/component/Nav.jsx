// rrd imports
import { Form, NavLink } from "react-router-dom";

// logo image
import logo from "../assets/logo.png";

// library imports
import { TrashIcon } from "@heroicons/react/16/solid";

const Nav = ({ userName }) => {
    return (
        <nav>
            <NavLink 
                to="/"
                aria-label="Go to home"
            >
                <img src={ logo } height={35} />
                <h3><span>Stack</span>Tack</h3>
            </NavLink>
            {
                userName && (
                    <Form
                    method="post"
                    action="/logout"
                    onSubmit={(event) => {
                        if (!confirm("Delete user and all data?")) {
                            event.preventDefault();
                        }
                    }}
                >
                    <button type="submit" className="btn btn--warning">
                        <span> Delete User</span>
                        <TrashIcon width={20} />
                    </button>
                </Form>
            )
            }

        </nav>
    )
}
export default Nav;