import { Outlet, useLoaderData} from "react-router-dom";
import Nav from "../components/Nav";
import { fetchData } from "../helpers";

export function mainLoader() {
    const userName = fetchData("userName");
    return { userName }
}

const Main = () => {
   const { userName } = useLoaderData()

    return (
        <div className="layout">
            <Nav userName={userName} />
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default Main;