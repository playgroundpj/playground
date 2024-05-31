import { NavLink } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { decodeJwt } from '../../utils/tokenUtils';

function ManagePageNavbar() {


    const activeStyle = {
        borderBottom: '1px solid #B4BCA3',
    }    

    const token = decodeJwt(window.localStorage.getItem("accessToken"));     

    if(token === undefined || token === null || token.exp * 1000 < Date.now()) {        
        return <Navigate to="/" />;
    }

    return (
        <div className='manageNavbarCSS myPageNavbarCSS'>
            <ul >
                <li><NavLink to="/mypage/member" style={({isActive}) => isActive? activeStyle : undefined}>인사 관리</NavLink></li>
                <li><NavLink to="/mypage/payment" style={({isActive}) => isActive? activeStyle : undefined}>등급 관리</NavLink></li>
                <li><NavLink to="/mypage/payment" style={({isActive}) => isActive? activeStyle : undefined}>쿠폰 관리</NavLink></li>
            </ul>
        </div>
    );
}

export default ManagePageNavbar;