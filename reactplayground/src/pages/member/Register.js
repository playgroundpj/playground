import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import Swal from "sweetalert2";
import { FaCircleCheck } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Accordion, Button, Form } from 'react-bootstrap';

import {
    callRegisterAPI,
    callGetNumberAPI,
    callGetMemberIdAPI,
    callGetMemberNicknameAPI
} from '../../apis/MemberAPICalls'
import { POST_LOGIN } from '../../modules/MemberModule';
import Privacy from '../../components/common/privacy';

function Register() {

    const navigate = useNavigate();

    /* 리덕스를 이용하기 위한 디스패처, 셀렉터 선언 */
    const dispatch = useDispatch();
    const member = useSelector(state => state.memberReducer);  // API 요청하여 가져온 loginMember 정보
    
    const [showPassword, setShowPassword] = useState(false);
    const [isMemberIdChecked, setIsMemberIdChecked] = useState(false);
    const [isMemberNicknameChecked, setMemberNicknamechecked] = useState(false);
    const [isNumberChecked, setNumberchecked] = useState(false);
    const [isCheckNumberChecked, setCheckNumberChecked] = useState(false);
    const [checkNumber, setCheckNumber] = useState('');
    const [isFirstLoad, setIsFirstLoad] = useState(true); // 페이지 처음 로드 및 새로고침에서 경고창이 안 뜨도록 설정해주는 state
    const [isAgreementChecked, setIsAgreementChecked] = useState(false);
    const [form, setForm] = useState({  
        memberId: '',
        memberPassword: '',
        memberNickname: '',
        memberBirth:'',
        memberPhonenumber: '',
        memberAddress: '',        
        memberEmail: '',

    });


    const memberIdinput = document.getElementById('memberId');

    useEffect(() => {
        if(member.status == 201){
            console.log("[Login] Register SUCCESS {}", member);
            navigate("/login", { replace: true })
        }
    },
    [member]);


    useEffect(() => {
        if(member.message == '중복된 아이디입니다.'){
            Swal.fire({
                icon: "warning",
                title: `중복된 아이디입니다 </br> 다른 아이디를 입력해주세요.`,
                showConfirmButton: true,
                confirmButtonColor: "#97A482",
                customClass: {
                    title: 'swal2-title'
                }
            }).then(() => {
                setIsMemberIdChecked(false);
            });
        } else if(member.message === '사용 가능한 아이디입니다'){
            
            setIsMemberIdChecked(true);
        }
    },
    [member, isFirstLoad]);

    useEffect(() => {
        if(member.message == '발신번호 미등록'){
            Swal.fire({
                icon: "warning",
                title: `발신번호 미등록 </br> 연락처를 다시 입력해주세요.`,
                showConfirmButton: true,
                confirmButtonColor: "#97A482",
                customClass: {
                    title: 'swal2-title'
                }
            }).then(() => {
                setNumberchecked(false);
            });
        } else if(member.message === '유효한 번호입니다.'){
            console.log('인증번호 : ' + member.data);
            setNumberchecked(true);
        }
    },
    [member, isFirstLoad]);

    


    useEffect(() => {
        if(member.message == '중복된 닉네임입니다.'){
            Swal.fire({
                icon: "warning",
                title: `중복된 닉네임입니다 </br> 다른 닉네임을 입력해주세요.`,
                showConfirmButton: true,
                confirmButtonColor: "#97A482",
                customClass: {
                    title: 'swal2-title'
                }
            }).then(() => {
                setMemberNicknamechecked(false);
            });
        } else if(member.message === '사용 가능한 닉네임입니다'){
            setMemberNicknamechecked(true);
        }
    },
    [member, isFirstLoad]);

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
        setIsFirstLoad(false);
    };    

    const onClickBackHandler = () => {

        /* 돌아가기 클릭시 메인 페이지로 이동 */
        navigate("/", { replace: true })
    }
    
    const onClickRegisterHandler = () => {

        console.log("isMemberNicknameChecked : " + isMemberNicknameChecked);
        console.log("isMemberIdChecked : " + isMemberIdChecked);

        if (!isAgreementChecked) {
            Swal.fire({
                icon: "warning",
                title: `필수 약관에 동의해주세요`,
                showConfirmButton: true,
                confirmButtonColor: "#97A482",
                customClass: { title: 'swal2-title' }
            });
        } else if(!isMemberIdChecked){
            Swal.fire({
                icon: "warning",
                title: `아이디 중복체크를 해주세요`,
                showConfirmButton: true,
                confirmButtonColor: "#97A482",
                customClass: {
                    title: 'swal2-title'
                }
            }).then(() => {
                setIsMemberIdChecked(false);
            })
        }else if(form.memberPassword.trim() == ''){
            Swal.fire({
                icon: "warning",
                title: `비밀번호 입력은 필수입니다.`,
                showConfirmButton: true,
                confirmButtonColor: "#97A482",
                customClass: {
                    title: 'swal2-title'
                }
            }).then(() => {
                setMemberNicknamechecked(false);
                })
        }else if(!isMemberNicknameChecked){
            Swal.fire({
                icon: "warning",
                title: `닉네임 중복체크를 해주세요`,
                showConfirmButton: true,
                confirmButtonColor: "#97A482",
                customClass: {
                    title: 'swal2-title'
                }
            }).then(() => {
                setMemberNicknamechecked(false);
                })
        }else if(!isCheckNumberChecked){
            Swal.fire({
                icon: "warning",
                title: `연락처 인증을 해주세요`,
                showConfirmButton: true,
                confirmButtonColor: "#97A482",
                customClass: {
                    title: 'swal2-title'
                }
            }).then(() => {
                setIsMemberIdChecked(false);
            })
        }else if(form.memberBirth.trim() == ''){
            Swal.fire({
                icon: "warning",
                title: `생년월일 입력은 필수입니다.`,
                showConfirmButton: true,
                confirmButtonColor: "#97A482",
                customClass: {
                    title: 'swal2-title'
                }
            })
        }else{
            Swal.fire({
                icon: "sucess",
                title: `회원가입이 완료되었습니다`,
                showConfirmButton: true,
                confirmButtonColor: "#97A482",
                customClass: {
                    title: 'swal2-title'
                }
            }).then(() => {
                dispatch(callRegisterAPI({
                    form: form
                }));
            })
            
        }

        
    }

    const onClickMessageSendHandler = () => {
        if(form.memberPhonenumber.trim() === ''){
            Swal.fire({
                icon: "warning",
                title: `연락처 입력은 필수입니다`,
                showConfirmButton: true,
                confirmButtonColor: "#97A482",
                customClass: {
                    title: 'swal2-title'
                }
            }).then(() => {
                setNumberchecked(false);
            });
        }else{
            console.log("연락처 : " + form.memberPhonenumber);
            dispatch(callGetNumberAPI({
                memberPhonenumber: form.memberPhonenumber
            }));
        }
    }

    const onCheckNumberChaneHandler = (e) => {
        setCheckNumber(e.target.value);
    }


    const onDateChangeHandler = (e) => {
        const { name, value } = e.target;
        const formattedDate = value; // 원하는 형식으로 변환 가능
        console.log("formattedDate : " + formattedDate);
        setForm({
            ...form,
            [name]: formattedDate
        });
        setIsFirstLoad(false);
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const onClickMemberDuplicateCheckHandler = () => {
        if(form.memberId.trim() === ''){
            Swal.fire({
                icon: "warning",
                title: `아이디 입력은 필수입니다`,
                showConfirmButton: true,
                confirmButtonColor: "#97A482",
                customClass: {
                    title: 'swal2-title'
                }
            }).then(() => {
                setIsMemberIdChecked(false);
            });
        }else{
            dispatch(callGetMemberIdAPI({
                memberId: form.memberId
            }));
        }
        
    }

    const onClickNicknameDuplicateCheckHandler = () => {
        if(form.memberNickname.trim() === ''){
            Swal.fire({
                icon: "warning",
                title: `닉네임 입력은 필수입니다`,
                showConfirmButton: true,
                confirmButtonColor: "#97A482",
                customClass: {
                    title: 'swal2-title'
                }
            }).then(() => {
                setMemberNicknamechecked(false);
            });
        }else{
            dispatch(callGetMemberNicknameAPI({
                memberNickname: form.memberNickname
            }));
        }
    }

    const onClickCheckNumberHandler = () => {
        if(checkNumber == member.data){
            setCheckNumberChecked(true);
        }else{
            Swal.fire({
                icon: "warning",
                title: `인증번호를 다시 확인하세요`,
                showConfirmButton: true,
                confirmButtonColor: "#97A482",
                customClass: {
                    title: 'swal2-title'
                }
            }).then(() => {
                setCheckNumberChecked(false);
            })
        }
    }

    const handleAgreementChange = (e) => {
        setIsAgreementChecked(e.target.checked);
    };


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
                            <col style={{width:'63%'}}></col>
                            <col style={{width:'22%'}}></col>
                        </colgroup>
                        <tbody>
                        <tr>
                                <td colSpan={3}>
                                    <Privacy handleAgreementChange={handleAgreementChange} isAgreementChecked={isAgreementChecked}/>
                                </td>
                            </tr>
                            <tr>
                                <td><label>아이디 </label></td>
                                <td>
                                    <div style={{ position: 'relative' }}>
                                        <input 
                                            style={{ position: 'relative' }}
                                            type="text" 
                                            name="memberId"
                                            id='memberId'
                                            placeholder="아이디를 입력해주세요" 
                                            autoComplete='off'
                                            onChange={ onChangeHandler }
                                        />
                                        {(!!isMemberIdChecked) && (
                                        <span 
                                            style={{
                                                position: 'absolute',
                                                right: '10px',
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                            }}
                                        >
                                            <FaCircleCheck />
                                        </span>
                                        )}
                                    </div>
                                </td>
                                <td>
                                    {(!isMemberIdChecked) && (
                                        <button 
                                        className='checkBtn'
                                        onClick={ onClickMemberDuplicateCheckHandler }
                                    >
                                        중복 확인
                                    </button>
                                    )}
                                
                                </td>
                            </tr>
                            <tr>
                                <td><label>비밀번호 </label></td>
                                <td>
                                    <div style={{ position: 'relative' }}>
                                        <input 
                                            type={showPassword ? "text" : "password"} 
                                            name="memberPassword" 
                                            placeholder="패스워드" 
                                            autoComplete='off'
                                            value={form.memberPassword}
                                            onChange={onChangeHandler}
                                        />
                                        <span 
                                            style={{
                                                position: 'absolute',
                                                right: '10px',
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                cursor: 'pointer'
                                            }}
                                            onClick={toggleShowPassword}
                                        >
                                            {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                                        </span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td><label>닉네임 </label></td>
                                <td>
                                    <div style={{ position: 'relative' }}>
                                        <input 
                                            type="text" 
                                            name="memberNickname"
                                            id="memberNickname"
                                            placeholder="닉네임" 
                                            autoComplete='off'
                                            onChange={ onChangeHandler }
                                        />
                                        {(!!isMemberNicknameChecked) && (
                                        <span 
                                            style={{
                                                position: 'absolute',
                                                right: '10px',
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                            }}
                                        >
                                            <FaCircleCheck />
                                        </span>
                                        )}
                                    </div> 
                                </td>
                                <td>
                                    {(!isMemberNicknameChecked) && (
                                            <button 
                                            className='checkBtn'
                                            onClick={ onClickNicknameDuplicateCheckHandler }
                                        >
                                            중복 확인
                                        </button>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td><label>연락처</label></td>
                                <td>
                                <input 
                                    type="text" 
                                    name="memberPhonenumber"
                                    pattern="\d{10,11}"
                                    placeholder="-없이 휴대폰번호를 입력해주세요" 
                                    autoComplete='off'
                                    maxLength={11}
                                    inputMode="numeric"
                                    onChange={ onChangeHandler }
                                    onKeyDown={(e) => {
                                        if (e.key !== "Backspace" && !/[0-9]/.test(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                /> 
                                </td>
                                <td>
                                    {(!isCheckNumberChecked) && (
                                            <button 
                                            className='checkBtn'
                                            onClick={ onClickMessageSendHandler }
                                        >
                                            인증번호 전송
                                        </button>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td><label>인증번호</label></td>
                                <td>
                                    <div style={{ position: 'relative' }}>
                                        <input 
                                            type="text" 
                                            name="checkNumber"
                                            placeholder="인증번호" 
                                            autoComplete='off'
                                            onChange={ onCheckNumberChaneHandler }
                                        /> 
                                        {(!!isCheckNumberChecked) && (
                                        <span 
                                            style={{
                                                position: 'absolute',
                                                right: '10px',
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                            }}
                                        >
                                            <FaCircleCheck />
                                        </span>
                                        )}
                                    </div>
                                </td>
                                <td>
                                    {(!isCheckNumberChecked) && (
                                        <button 
                                            className='checkBtn'
                                            onClick={ onClickCheckNumberHandler }
                                        >
                                            인증번호 확인
                                        </button>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td><label>생년월일</label></td>
                                <td>
                                <input 
                                    type="date" 
                                    name="memberBirth"
                                    placeholder="생년월일" 
                                    autoComplete='off'
                                    value={form.memberBirth}
                                    onChange={ onDateChangeHandler }
                                /> 
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