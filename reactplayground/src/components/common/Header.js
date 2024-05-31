import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { decodeJwt } from '../../utils/tokenUtils';
import Container from 'react-bootstrap/Container';
import Swal from "sweetalert2";

import {
    callLogoutAPI
} from '../../apis/MemberAPICalls'
import LoginModal from './LoginModal';


function Header() {

    //const isLogin = false;
    const navigate = useNavigate();

    // 리덕스를 이용하기 위한 디스패처, 셀렉터 선언
    const dispatch = useDispatch();
    const loginMember = useSelector(state => state.memberReducer);  // 저장소에서 가져온 loginMember 정보
    const isLogin = window.localStorage.getItem('accessToken');    // Local Storage 에 token 정보 확인
    let decoded = null;
    let nickname = null;
    const [search, setSearch] = useState('');

    const [loginModal, setLoginModal] = useState(false);

    const onSearchChangeHandler = (e) => {
        setSearch(e.target.value);
    }

    if(isLogin !== undefined && isLogin !== null) {
        const temp = decodeJwt(window.localStorage.getItem("accessToken"));
        console.log(temp);
        decoded = temp.auth[0];
        nickname = temp.nickname;
    }

    const onEnterkeyHandler = (e) => {
        if (e.key == 'Enter') {
            console.log('Enter key', search);
            
            navigate(`/search?value=${search}`, { replace: false });
            
            // dispatch(callSearchProductAPI({
            //     search: search
            // }));
            window.location.reload();
        }
    }

    const onClickLogoHandler = () => {
        // 로고 클릭시 메인 페이지로 이동
        navigate("/", { replace: true })
    }

    const onClickMypageHandler = () => {    

        // 토큰이 만료되었을때 다시 로그인
        const token = decodeJwt(window.localStorage.getItem("accessToken"));
        console.log('[Header] onClickMypageHandler token : ', token);
        
        if (token.exp * 1000 < Date.now()) {
            window.localStorage.removeItem('accessToken');  
            //로그아웃
            dispatch(callLogoutAPI());
            Swal.fire({
                icon: "success",
                title: `유효시간이 만료되어 <b>${nickname}</b>님 로그아웃됩니다.`,
                showConfirmButton: true,
                confirmButtonColor: "#97A482",
                customClass: {
                    title: 'swal2-title'
                }
            }).then(() => {
                navigate("/login", { replace: true })
                window.location.reload();
            });
            return ;
        }

        navigate("/mypage", { replace: true });
    }

    const onClickManagepageHandler = () => {    

        // 토큰이 만료되었을때 다시 로그인
        const token = decodeJwt(window.localStorage.getItem("accessToken"));
        console.log('[Header] onClickManagepageHandler token : ', token);
        
        if (token.exp * 1000 < Date.now()) {
            setLoginModal(true);
            return ;
        }

        navigate("/managepage", { replace: true });
    }

    const onClickLogoutHandler = () => {
        window.localStorage.removeItem('accessToken');  
        //로그아웃
        dispatch(callLogoutAPI());
        
        Swal.fire({
			icon: "success",
			title: `<b>${nickname}</b>님 로그아웃되어 </br> 메인페이지로 이동합니다.`,
			showConfirmButton: true,
            confirmButtonColor: "#97A482",
            customClass: {
                title: 'swal2-title'
            }
		}).then(() => {
            navigate("/", { replace: true })
            window.location.reload();
		});
    
    }

    function BeforeLogin() {

        return (
            <div className='headerRight'>
                <NavLink to="/login">로그인</NavLink>  |  <NavLink to="/register">회원가입</NavLink>
            </div>
        );
    }

    function AfterLoginAdmin() {
        return (            
            <div className='headerRight'>
                <span> <b>'{nickname}'</b>님 환영합니다. </span> <button  onClick={ onClickManagepageHandler }>관리페이지</button>  | <button  onClick={ onClickLogoutHandler }>로그아웃</button>
            </div>
        );
    }

    function AfterLoginManagerAndUser() {
        return (            
            <div className='headerRight'> 
                <span> <b>'{nickname}'</b>님 환영합니다. </span> <button  onClick={ onClickMypageHandler }>마이페이지</button>  | <button  onClick={ onClickLogoutHandler }>로그아웃</button>
            </div>
        );
    }


    return (
        <Container className='header'>
            { loginModal ? <LoginModal setLoginModal={ setLoginModal }/> : null}
            { loginModal ? null : (
                <>
                <div className='logo'>
                    <NavLink to='/'>
                        <span><img src='/images/common/logo-playground.png'/></span>
                    </NavLink>
                </div>
                <div className='header-login'>
                    {/* 로그인 상태에 따라 다른 컴포넌트 랜더링 */}
                    { (isLogin == null || isLogin === undefined) ? <BeforeLogin /> : ( (decoded ==="ROLE_ADMIN") ? <AfterLoginAdmin /> : <AfterLoginManagerAndUser />)}
                </div>
                </>           
            )}
        </Container>
    );
}

export default Header;