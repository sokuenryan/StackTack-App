// rrd imports
import { Link, Outlet } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className='sidebar-content'>
        <div className="sidebar">
            <Link to="/bills">
                <button>Bills</button>
            </Link>
            <Link to="/investments">
                <button>Investments</button>
            </Link>
            <Link to="/credit">
                <button>Credit</button>
            </Link>
        </div>

    <div className="main-content">
        <Outlet />
    </div>
    </div>
  );
};

export default Sidebar;