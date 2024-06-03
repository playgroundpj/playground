import { Outlet, useNavigate } from "react-router-dom";
import MyPageNavbar from "../components/common/MyPageNavbar";
import { Navigate } from 'react-router-dom';
import { useEffect } from "react";
import { decodeJwt } from "../utils/tokenUtils";
import ManagePageNavbar from "../components/common/ManagePageNavbar";


function MyPageLayout() {

    const navigate = useNavigate();

    const isLogin = window.localStorage.getItem('accessToken');    // Local Storage 에 token 정보 확인
    let decoded = null;
    let nickname = null;

    if(isLogin !== undefined && isLogin !== null) {
        const temp = decodeJwt(window.localStorage.getItem("accessToken"));
        console.log(temp);
        decoded = temp.auth[0];
        nickname = temp.nickname;
    }



    return (
        <>
            <hr/>
            <div className="myPageLayoutCSS">
                {(decoded=='ROLE_ADMIN') ? <ManagePageNavbar /> : <MyPageNavbar />}
                <main className="myPageMain">
                    <Outlet/>
                </main>
            </div>
        </>
    );
}

export default MyPageLayout;