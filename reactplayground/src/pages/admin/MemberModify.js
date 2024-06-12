import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef } from "react";
import { decodeJwt } from '../../utils/tokenUtils';
import { FaCircleCheck } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";

import {
    callMemberUpdateAPI,
    callGetMemberNicknameAPI,
    callGetNumberAPI,
    callDeleteMemberAPI,
    callLogoutAPI,
    callGetMemberByCodeAPI,
    callManagerStoreByMemberCodeAPI
} from '../../apis/MemberAPICalls'
import { callGetShopAPI, callGetShopListAPI, callGetShopListAllAPI } from '../../apis/ShopAPICalls';

function MemberModify() {

    const { memberCode } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const member = useSelector(state => state.memberReducer);
    const manager = useSelector(state => state.managerReducer); 
    const store = useSelector(state => state.shopReducer);
    const storeList = useSelector(state => state.checkReducer);
    const check = useSelector(state => state.checkReducer); 
    const isLogin = window.localStorage.getItem('accessToken');    // Local Storage 에 token 정보 확인
    const token = decodeJwt(window.localStorage.getItem("accessToken"));
    const [isMemberNicknameChecked, setMemberNicknamechecked] = useState(false);
    const [isPhoneChange, setPhoneChange] = useState(false);
    const [isNumberChecked, setNumberchecked] = useState(false);
    const [isCheckNumberChecked, setCheckNumberChecked] = useState(false);
    const [checkNumber, setCheckNumber] = useState('');
    const [checkNumberGet, setCheckNumberGet] = useState('');
    const memberDetail = member.data;
    const [loading, setLoading] = useState(true);
    const [checkMemberId, setCheckMemberId] = useState('');
    const [managerStore, setManagerStore] = useState('');
    const [isFirstLoad, setIsFirstLoad] = useState(true); // 페이지 처음 로드 및 새로고침에서 경고창이 안 뜨도록 설정해주는 state
    const [form, setForm] = useState({  
        memberId: '',
        memberPassword: '',
        memberNickname: '',
        memberBirth:'',
        memberPhonenumber: '',
        memberAddress: '',        
        memberEmail: '',
    });

    const onClickBackHandler = () => {
        
        /* 돌아가기 클릭시 메인 페이지로 이동 */
        navigate(-1);
    }

    const onClickModifyHandler = () => {
        if(!isMemberNicknameChecked){
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
        }else{
            Swal.fire({
                icon: "success",
                title: `매니저 정보가 수정되었습니다`,
                showConfirmButton: true,
                confirmButtonColor: "#97A482",
                customClass: {
                    title: 'swal2-title'
                }
            }).then(()=>{
                dispatch(callMemberUpdateAPI({form}));
                navigate("/mypage/member", { replace: false });
                window.location.reload();
            });
        }
    }

    const onChangeHandler = (e) => {

        if(e.target.name === 'memberPhonenumber'){
            setPhoneChange(true);
            if(e.target.value === memberDetail.memberPhonenumber){
                setPhoneChange(false);
            }
        }

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
        console.log('form : ',form);
        setIsFirstLoad(false);
    };  

    const managerStoreChangeHandler = (e) => {

        setManagerStore(e.target.value);

    }
    
    const onPasswordChangeHandler = (e) => {

        if(e.target.value.trim === ''){

        }else{
            setForm({
                ...form,
                memberPassword: e.target.value
            })
        }

    }

    
    const onClickNicknameDuplicateCheckHandler = () => {
        console.log('nickname : ' + form.memberNickname);
        if(form.memberNickname.trim() === memberDetail.memberNickname){
            console.log('닉네임 변경하지 않음');
            setMemberNicknamechecked(true);
        }else if(form.memberNickname.trim() === ''){
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
                memberNickname: form.memberNickname,
            }));
            
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

    const onClickDeleteHandler = () => {
        Swal.fire({
			title: "매니저를 삭제하겠습니까?",
			text: "삭제 후 되돌릴 수 없습니다.",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#97A482",
			cancelButtonColor: "#C45D4A",
			confirmButtonText: "삭제",
			cancelButtonText: "취소"
			}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire({
				title: "삭제 완료!",
				text: "매니저가 삭제되었습니다",
				icon: "success",
				showConfirmButton: false,
				timer: 1000
				});
                //회원탈퇴
				dispatch(callDeleteMemberAPI({memberId: form.memberId}));
                navigate("/mypage/member", { replace: true });
                window.location.reload();
			}
		});
    }

    useEffect(
        () => {
            // 관리자가 아니면 못 들어오게 막음
            if(isLogin !== undefined && isLogin !== null) {
                if(token.auth[0] !== 'ROLE_ADMIN'){
                    navigate("/");
                }
            }else{
                navigate("/");
            }        

        },[token]
    )

    useEffect(
        () => {    
            console.log('token', token.sub);
            console.log('memberCode', memberCode);
            if(token !== null) {
                dispatch(callGetMemberByCodeAPI({	// 회원 정보 조회
                    memberCode: memberCode
                }));

                dispatch(callGetShopListAllAPI()); // 전체 매장 조회
                // console.log('storeList', storeList);
            }
        }
        ,[]
    );


    useEffect(() => {
        if (member) {
            // console.log("member", member);
            dispatch(callManagerStoreByMemberCodeAPI({ memberCode }));
        }
    }, [member]);

    useEffect(
        () => {
            if (member != "") {
                if(manager.status == "201"){
                    // console.log("201 success", manager);
                    dispatch(callGetShopAPI({storeCode: manager.data.storeCode}));
                    setLoading(false);
                }else if(manager.status == "400"){
                    console.log("400 error", manager);
                    setLoading(false);
                }
            }
        },[manager]
    )


    useEffect(
        () => {
            if(memberDetail){
                setForm({
                    memberId: memberDetail.memberId,
                    memberPassword: memberDetail.memberPassword,
                    memberNickname: memberDetail.memberNickname,
                    memberBirth:memberDetail.memberBirth,
                    memberPhonenumber: memberDetail.memberPhonenumber,
                    memberAddress: memberDetail.memberAddress,        
                    memberEmail: memberDetail.memberEmail,
                });
            }
        },[memberDetail]
    )


    useEffect(() => {
        console.log('check : ', check);
        if(check.message == '중복된 닉네임입니다.'){
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
        } else if(check.message === '사용 가능한 닉네임입니다'){
            setMemberNicknamechecked(true);
        }
    },
    [check]);

    return (
        <div>
            {loading ? ( // 로딩 중일 때 표시할 내용
                <p>Loading...</p>
            ) : (
            <>
            <h2><b>{memberDetail.memberId}</b>님의 정보</h2>
            <div className='formTotal'>
                <table>
                    <colgroup>
                        <col style={{width:'20%'}}></col>
                        <col style={{width:'50%'}}></col>
                        <col style={{width:'15%'}}></col>
                    </colgroup>
                    <tbody>
                        <tr>
                            <td><label>아이디 </label></td>
                            <td>
                                <input 
                                    type="text" 
                                    placeholder="아이디"
                                    name="memberId"
                                    id='memberId' 
                                    readOnly={true}
                                    value={form.memberId || ''}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label>변경할 비밀번호 </label></td>
                            <td>
                                <input 
                                    type="password" 
                                    placeholder="변경할 비밀번호"
                                    name='memberPasswordChange'
                                    onChange={ onPasswordChangeHandler } 
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label>닉네임 </label></td>
                            <td>
                                <div style={{ position: 'relative' }}>
                                    <input 
                                        type="text" 
                                        placeholder="닉네임"
                                        name="memberNickname"
                                        id="memberNickname"
                                        autoComplete='off'
                                        onChange={ onChangeHandler }
                                        value={form.memberNickname || ''}
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
                            <td><label>관리 매장 </label></td>
                            <td>
                                <select 
                                    value={managerStore || ''}
                                    onChange={ managerStoreChangeHandler }
                                >
                                    {storeList.map((store) => (<option>{store.storeName}</option>))}
                                    <option>없음</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td><label>연락처 </label></td>
                            <td>
                                <input 
                                    type="text" 
                                    placeholder="연락처" 
                                    name="memberPhonenumber"
                                    autoComplete='off'
                                    value={form.memberPhonenumber || ''}
                                    onChange={ onChangeHandler }
                                />
                            </td>
                            <td>
                            {isPhoneChange ? (
                                !isCheckNumberChecked && (
                                    <button 
                                        className='checkBtn'
                                        onClick={ onClickMessageSendHandler }
                                    >
                                        인증번호 전송
                                    </button>
                                )
                            ) : null}
                            </td>
                        </tr>
                        {(isPhoneChange) && (
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
                        )}
                        
                        <tr>
                            <td><label>생년월일 </label></td>
                            <td>
                                <input 
                                    type="date" 
                                    placeholder="생년월일"
                                    name="memberBirth" 
                                    value={form.memberBirth || ''}
                                    onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label>E-mail </label></td>
                            <td>
                                <input 
                                    type="text" 
                                    placeholder="E-mail"
                                    name="memberEmail"
                                    autoComplete='off' 
                                    value={form.memberEmail || ''}
                                    onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label>주소 </label></td>
                            <td>
                                <input 
                                    type="text" 
                                    placeholder="주소"
                                    name="memberAddress"
                                    autoComplete='off' 
                                    value={form.memberAddress || ''}
                                    onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3}>
                                <div className='bottomBtn'>
                                    <button className='registerBtn'
                                        onClick = { onClickModifyHandler }
                                    >   
                                        매니저 정보 수정 완료
                                    </button>
                                    <button className='backBtn'
                                        onClick = { onClickBackHandler }
                                    >
                                        돌아가기
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3}>
                            <button className='deleteBtn'
                                        onClick = { onClickDeleteHandler }
                                    >   
                                        매니저 삭제
                                    </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            </>
            )}
        </div>
    )

}

export default MemberModify;