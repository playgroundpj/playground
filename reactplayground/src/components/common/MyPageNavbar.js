import { NavLink } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { decodeJwt } from '../../utils/tokenUtils';

function MyPageNavbar() {


    const activeStyle = {
        borderBottom: '1px solid #B4BCA3',
    }    

    const token = decodeJwt(window.localStorage.getItem("accessToken"));     

    if(token === undefined || token === null || token.exp * 1000 < Date.now()) {        
        return <Navigate to="/" />;
    }

    return (
        <div className='myPageNavbarCSS'>
            <ul >
                <li><NavLink to="/mypage/profile" style={({isActive}) => isActive? activeStyle : undefined}>회원 정보</NavLink></li>
                <li><NavLink to="/mypage/myreservation" style={({isActive}) => isActive? activeStyle : undefined}>예약 정보</NavLink></li>
                <li><NavLink to="/mypage/payment" style={({isActive}) => isActive? activeStyle : undefined}>결제 정보</NavLink></li>
            </ul>
        </div>
    );
}

export default MyPageNavbar;