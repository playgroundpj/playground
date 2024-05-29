import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from "react-router-dom";
import { NavLink } from 'react-router-dom';

import {
    callRegisterAPI
} from '../../apis/MemberAPICalls'
import { POST_LOGIN } from '../../modules/MemberModule';

function Register() {

    const navigate = useNavigate();

    /* 리덕스를 이용하기 위한 디스패처, 셀렉터 선언 */
    const dispatch = useDispatch();
    const member = useSelector(state => state.memberReducer);  // API 요청하여 가져온 loginMember 정보
    
    const [form, setForm] = useState({
        memberId: '',
        memberPassword: '',
        memberName: '',
        memberEmail: ''
    });
    useEffect(() => {
        if(member.status == 201){
            console.log("[Login] Register SUCCESS {}", member);
            navigate("/login", { replace: true })
        }
    },
    [member]);

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };    

    const onClickBackHandler = () => {

        /* 돌아가기 클릭시 메인 페이지로 이동 */
        navigate("/", { replace: true })
    }
    
    const onClickRegisterHandler = () => {
        dispatch(callRegisterAPI({
            form: form
        }));
    }

    return (
        <div >
            <div className='registerCSS'>
                <NavLink to='/'>
                    <span>
                        <img src='../../../images/common/logo-playground.png'/>
                    </span>
                </NavLink>
                <h2>회원가입</h2>
                <hr></hr>
                <div className='formTotal'>
                    <table>
                        <colgroup>
                            <col style={{width:'15%'}}></col>
                            <col style={{width:'65%'}}></col>
                            <col style={{width:'20%'}}></col>
                        </colgroup>
                        <tbody>
                            <tr>
                                <td><label>아이디 </label></td>
                                <td>
                                    <input 
                                        type="text" 
                                        name="memberId"
                                        placeholder="아이디" 
                                        autoComplete='off'
                                        onChange={ onChangeHandler }
                                    />
                                </td>
                                <td>
                                    <button className='checkBtn'>
                                        중복 확인
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td><label>비밀번호 </label></td>
                                <td>
                                    <input 
                                        type="password"
                                        name="memberPassword" 
                                        placeholder="패스워드" 
                                        autoComplete='off'
                                        onChange={ onChangeHandler }
                                    /> 
                                </td>
                            </tr>
                            <tr>
                                <td><label>닉네임 </label></td>
                                <td>
                                    <input 
                                        type="text" 
                                        name="memberNickname"
                                        placeholder="닉네임" 
                                        autoComplete='off'
                                        onChange={ onChangeHandler }
                                    /> 
                                </td>
                                <td>
                                    <button className='checkBtn'>
                                        중복 확인
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td><label>E-mail</label></td>
                                <td>
                                <input 
                                    type="text" 
                                    name="memberEmail"
                                    placeholder="이메일" 
                                    autoComplete='off'
                                    onChange={ onChangeHandler }
                                /> 
                                </td>
                                <td>
                                    <button className='checkBtn'>
                                        인증번호 전송
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td><label>인증번호</label></td>
                                <td>
                                <input 
                                    type="text" 
                                    name="memberConfirm"
                                    placeholder="인증번호" 
                                    autoComplete='off'
                                    onChange={ onChangeHandler }
                                /> 
                                </td>
                                <td>
                                    <button className='checkBtn'>
                                        인증번호 확인
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td><label>생년월일</label></td>
                                <td>
                                <input 
                                    type="text" 
                                    name="memberBirth"
                                    placeholder="생년월일" 
                                    autoComplete='off'
                                    onChange={ onChangeHandler }
                                /> 
                                </td>
                            </tr>
                            <tr>
                                <td><label>연락처</label></td>
                                <td>
                                <input 
                                    type="text" 
                                    name="memberPhonenumber"
                                    placeholder="연락처" 
                                    autoComplete='off'
                                    onChange={ onChangeHandler }
                                /> 
                                </td>
                            </tr>
                            <tr>
                                <td><label>주소</label></td>
                                <td>
                                <input 
                                    type="text" 
                                    name="memberAddress"
                                    placeholder="주소" 
                                    autoComplete='off'
                                    onChange={ onChangeHandler }
                                /> 
                                </td>
                                <td>
                                    <button className='checkBtn'>
                                        주소찾기
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={3}>
                                    <span id="nameCaution" className='nameCaution'></span>                
                                    <span id="pwdCaution" className='pwdCaution'></span>
                                    <span id="nicknameCaution" className='nameCaution'></span>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={3}>
                                    <div className='bottomBtn'>
                                        <button className='registerBtn'
                                            onClick = { onClickRegisterHandler }
                                        >   
                                            회원가입
                                        </button>
                                        <button className='backBtn'
                                            onClick = { onClickBackHandler }
                                        >
                                            돌아가기
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    
                


                    

                    
                </div>
                
                

            </div>
        </div>
    );
}

export default Register;