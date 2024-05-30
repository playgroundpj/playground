import { Outlet, useNavigate } from "react-router-dom";
import MyPageNavbar from "../components/common/MyPageNavbar";
import { Navigate } from 'react-router-dom';
import { useEffect } from "react";

function MyPageLayout() {

    const navigate = useNavigate();


    useEffect(() => {
        navigate("/mypage/profile", { replace: false });
    }, 
    []);


    return (
        <>
            <hr/>
            <div className="myPageLayoutCSS">
                <MyPageNavbar />
                <main className="myPageMain">
                    <Outlet/>
                </main>
            </div>
        </>
    );
}

export default MyPageLayout;