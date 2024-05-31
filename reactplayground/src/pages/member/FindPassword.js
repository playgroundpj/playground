import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
    callGetFindPasswordAPI
} from '../../apis/MemberAPICalls'
import Swal from "sweetalert2";


function FindPassword() {
        
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
    const [form, setForm] = useState({  
        memberId: '',
        memberPhonenumber: '',
    });



    useEffect(
        ()=>{
            if(member.data !== undefined){
                if(member.data == '존재하지 않는 아이디'){
                    Swal.fire({
                        icon: "warning",
                        title: `존재하지 않는 아이디입니다`,
                        showConfirmButton: true,
                        confirmButtonColor: "#97A482",
                        customClass: {
                            title: 'swal2-title'
                        }
                    })
                }else if(member.data == '회원정보의 연락처 불일치'){
                    Swal.fire({
                        icon: "warning",
                        title: `회원정보의 연락처가 <br/>동일하지 않습니다.`,
                        showConfirmButton: true,
                        confirmButtonColor: "#97A482",
                        customClass: {
                            title: 'swal2-title'
                        }
                    })
                }else{
                    Swal.fire({
                        icon: "success",
                        title: `새로운 비밀번호를 전송하였습니다.`,
                        showConfirmButton: true,
                        confirmButtonColor: "#97A482",
                        customClass: {
                            title: 'swal2-title'
                        }
                    }).then(() => {
                        console.log('새로운 비밀번호 : ', member.data[1]);
                        navigate("/");
                    });
                }

            }
        },[member]
    )

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
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
            dispatch(callGetFindPasswordAPI({form: form}));
            
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
                <h1>비밀번호 찾기</h1>
                <hr/>
                <p>아이디와 회원정보에 등록된 연락처로 새로운 비밀번호 전송</p>
                <table>
                    <colgroup>
                        <col style={{width:'17%'}}></col>
                        <col style={{width:'58%'}}></col>
                        <col style={{width:'25%'}}></col>
                    </colgroup>
                    <tbody>
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
                                </div>
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
                                        비밀번호 전송
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

export default FindPassword;