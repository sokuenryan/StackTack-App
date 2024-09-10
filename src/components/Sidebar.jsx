// rrd imports
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
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
  );
};

export default Sidebar;