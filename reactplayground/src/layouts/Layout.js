import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Navbars from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { useSelector } from 'react-redux';
import Loading from "../components/common/loading";

function Layout() {

    const isLoading = useSelector((state) => state.loading.isLoading);

    return (
        <div className="app-container">
            {isLoading && <Loading />}
            <Header/>
            <Navbars/>
            <main >
                <Outlet/>
            </main>
            <Footer/>
        </div>
    );
}

export default Layout;