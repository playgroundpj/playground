import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import { POST_REGISTER } from '../../modules/MemberModule';
import {
    callLoginAPI
} from '../../apis/MemberAPICalls'
import { POST_LOGIN } from '../../modules/MemberModule';
import Swal from "sweetalert2";


function Login() {
        
    const navigate = useNavigate();

    /* 리덕스를 이용하기 위한 디스패처, 셀렉터 선언 */
    const dispatch = useDispatch();
    const loginMember = useSelector(state => state.memberReducer);  // API 요청하여 가져온 loginMember 정보
    
    /* 폼 데이터 한번에 변경 및 State에 저장 */   
    const [form, setForm] = useState({
        memberId: '',
        memberPassword: ''
    });

    useEffect(() => {
        
        if(loginMember.status === 200){
            if(loginMember.message !== '아이디 찾기 성공.'){

                console.log("[Login] Login SUCCESS {}", loginMember);
                navigate("/", { replace: true });
            }
        }

        if(loginMember.status === 400){
            if(loginMember.message === `${form.memberId}를 찾을 수 없습니다.`)
            {
                Swal.fire({
                    icon: "warning",
                    title: `<b>${form.memberId}</b>은 존재하지 아이디입니다.`,
                    showConfirmButton: true,
                    confirmButtonColor: "#97A482",
                    customClass: {
                        title: 'swal2-title'
                    }
                })
            }else if(loginMember.message === '잘못된 비밀번호 입니다.'){
                Swal.fire({
                    icon: "warning",
                    title: `잘못된 비밀번호 입니다.`,
                    showConfirmButton: true,
                    confirmButtonColor: "#97A482",
                    customClass: {
                        title: 'swal2-title'
                    }
                })
            }
        }

        /* 회원 가입 후 로그인 페이지로 안내 되었을 때 */
        if(loginMember.status === 201){

            loginMember.status = 100  // Continue
            dispatch({ type: POST_REGISTER,  payload: loginMember });
        }  
    }
    ,[loginMember]);
    
    /* 로그인 상태일 시 로그인페이지로 접근 방지 */
    if(loginMember.length > 0) {
        console.log("[Login] Login is already authenticated by the server");        
        return <Navigate to="/"/>
    }

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onClickRegisterHandler = () => { 
        navigate("/register", { replace: true })
    }

    const onClickFindIdHandler = () => { 
        navigate("/findId", { replace: true })
    }

    const onClickFindPasswordHandler = () => { 
        navigate("/findPassword", { replace: true })
    }

    /* 로그인 버튼 클릭시 디스패처 실행 및 메인 페이지로 이동 */
    const onClickLoginHandler = () => { 
        dispatch(callLoginAPI({	// 로그인
            form: form
        }));
    }

    return (
        <div >
            <div className='loginCSS' >
                <NavLink to='/'>
                    <span>
                        <img src='../../../images/common/logo-playground.png'/>
                    </span>
                </NavLink>
                <h1>로그인</h1>
                <table>
                    <tbody>
                        <tr>
                            <td><label>ID</label></td>
                            <td>
                                <input 
                                    type="text" 
                                    name='memberId'
                                    placeholder="아이디" 
                                    autoComplete='off'
                                    onChange={ onChangeHandler }
                                />
                            </td>
                            <td rowSpan={3}><button onClick={onClickLoginHandler}>로그인</button></td>
                        </tr>
                        <tr></tr>
                        <tr>
                            <td><label>PW</label></td>
                            <td>
                                <input 
                                    type="password"
                                    name='memberPassword' 
                                    placeholder="패스워드" 
                                    autoComplete='off'
                                    onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <ul className='loginBtnUl'>
                    <li>
                        <button className='login-sideBtn'
                            onClick={ onClickFindIdHandler }
                        >
                            아이디 찾기
                        </button>
                    </li>
                    <li>
                        <button className='login-sideBtn'
                            onClick={ onClickFindPasswordHandler }
                        >
                            비밀번호 찾기
                        </button>
                    </li>
                    <li>
                        <button className='login-sideBtn'
                            onClick={ onClickRegisterHandler }
                        >
                            회원 가입
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Login;