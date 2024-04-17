import { Outlet, Link } from "react-router-dom";
import literaR from "../assets/literaR90.png"
import Footer from "./Footer";

const Layout = () => {
    return (
        <>
            <div id="top-bar">
                <h1 class="text-center">
                    <img id="letterR" alt="" src={literaR} />eplacer for docs
                </h1>
            </div>

            <nav class="container-md">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/terms">Terms of service</Link>
                    </li>
                    <li>
                        <Link to="/policy">Privacy policy</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                </ul>
            </nav>

            <Outlet />
            <Footer />
        </>
    )
};

export default Layout;