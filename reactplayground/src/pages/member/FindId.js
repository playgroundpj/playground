import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from "react-router-dom";
import { POST_REGISTER } from '../../modules/MemberModule';
import {
    callGetNumberAPI,
    callGetMemberNumberIdAPI
} from '../../apis/MemberAPICalls'
import { POST_LOGIN } from '../../modules/MemberModule';
import { FaCircleCheck } from "react-icons/fa6";
import Swal from "sweetalert2";


function FindId() {
        
    const navigate = useNavigate();

    /* 리덕스를 이용하기 위한 디스패처, 셀렉터 선언 */
    const dispatch = useDispatch();
    const member = useSelector(state => state.memberReducer);  // API 요청하여 가져온 정보


    
    /* State */
    const [isNumberChecked, setNumberchecked] = useState(false);
    const [isCheckNumberChecked, setCheckNumberChecked] = useState(false);
    const [checkNumber, setCheckNumber] = useState('');
    const [checkNumberGet, setCheckNumberGet] = useState('');   
    const [memberPhonenumber, setMemberPhonenumber] = useState('');
    const [resultFindId, setResultFindId] = useState('');
    const [isPhoneChange, setPhoneChange] = useState(false);



    useEffect(
        ()=>{
            if(member.data !== undefined){
                if (member.data.length < 5) {
                    setCheckNumberGet(member.data);
                    console.log('인증번호 : ', member.data);
                }

            }
        },[member]
    )

    const onChangeHandler = (e) => {
        setMemberPhonenumber(e.target.value);
    };

    const onCheckNumberChaneHandler = (e) => {
        setCheckNumber(e.target.value);
    }

    useEffect(
        ()=>{
            console.log('결과 : ', member.message);
            if(member.message === '존재하지 않는 아이디입니다'){
                setResultFindId('아이디 찾기 실패');
            }else if(member.message === '아이디 찾기 성공.'){
                setResultFindId('아이디 찾기 성공');
            }
            
        },[member]
    )



    const onClickCheckNumberHandler = () => {
        if(checkNumber === ''){
            Swal.fire({
                icon: "warning",
                title: `인증번호를 확인하세요`,
                showConfirmButton: true,
                confirmButtonColor: "#97A482",
                customClass: {
                    title: 'swal2-title'
                }
            })
        }else if(checkNumber == checkNumberGet){
            setCheckNumberChecked(true);
            dispatch(callGetMemberNumberIdAPI({memberPhonenumber}));
            document.getElementById('memberPhonenumber').readOnly = true;
            document.getElementById('checkNumber').readOnly = true;
            document.getElementById('FindDiv').style.display = "block";
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

    const onClickMessageSendHandler = () => {
        if(memberPhonenumber.trim() === ''){
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
            console.log("연락처 : " + memberPhonenumber);
            dispatch(callGetNumberAPI({
                memberPhonenumber
            }));
            
        }
    }

    function NotFound(){
        return (
            <>
                <h3>존재하지 않는 아이디입니다.</h3>
                <NavLink to="/register">회원가입</NavLink>
            </>
        )
    }

    function IdFound(){
        
        return (
            <>
                <h3>찾으신 아이디는 <b>{member.data.memberId}</b>입니다.</h3>
                <NavLink to="/login">로그인</NavLink>
            </>
        )
    }


    return (
        <div >
            <div className='FindCSS' >
                <NavLink to='/'>
                    <span>
                        <img src='../../../images/common/logo-playground.png'/>
                    </span>
                </NavLink>
                <h1>아이디 찾기</h1>
                <hr/>
                <p>회원정보에 등록한 휴대전화로 인증</p>
                <table>
                    <colgroup>
                        <col style={{width:'17%'}}></col>
                        <col style={{width:'58%'}}></col>
                        <col style={{width:'25%'}}></col>
                    </colgroup>
                    <tbody>
                        <tr>
                            <td><label>연락처</label></td>
                            <td>
                            <input 
                                type="text" 
                                name="memberPhonenumber"
                                pattern="\d{10,11}"
                                placeholder="-없이 휴대폰번호를 입력해주세요" 
                                autoComplete='off'
                                id='memberPhonenumber'
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
                                        id='checkNumber'
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
                    </tbody>
                </table>
                <div className='Find-result' id='FindDiv' style={{ display: 'none' }}>
                    {(resultFindId === '아이디 찾기 실패') ? <NotFound/> : (resultFindId === '아이디 찾기 성공') ? <IdFound/> : null}

                </div>
            </div>
        </div>
    );
}

export default FindId;