import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { decodeJwt } from '../../utils/tokenUtils';

import {
    callGetMemberByCodeAPI
} from '../../apis/MemberAPICalls'

function MemberDetails() {

    const { memberCode } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const member = useSelector(state => state.memberReducer);  
    const isLogin = window.localStorage.getItem('accessToken');    // Local Storage 에 token 정보 확인
    const token = decodeJwt(window.localStorage.getItem("accessToken"));   
    const memberDetail = member.data;
    const [loading, setLoading] = useState(true);


    const onClickBackHandler = () => {
        
        /* 돌아가기 클릭시 메인 페이지로 이동 */
        navigate(-1);
    }

    const onClickModifyHandler = (getMemberCode) => {
        console.log('getMemberCode : ', getMemberCode);
        navigate(`/mypage/member/memberModify/${getMemberCode}`);
    }


    useEffect(
        () => {
            // 관리자가 아니면 못 들어오게 막음
            if(isLogin !== undefined && isLogin !== null) {
                if(token.auth[0] !== 'ROLE_ADMIN'){
                    navigate("/");
                }
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
                })).finally(() => setLoading(false));
            }
        }
        ,[]
    );
    


    return (
        <div className='profileDiv'  >
            {loading ? ( // 로딩 중일 때 표시할 내용
                <p>Loading...</p>
            ) : (
                <>
            <h2><b>{memberDetail.memberId}</b>님의 정보</h2>
            <div className='formTotal memberDetails'>
                <table>
                    <colgroup>
                        <col style={{width:'20%'}}></col>
                        <col style={{width:'80%'}}></col>
                    </colgroup>
                    <tbody>
                        <tr>
                            <td><label>아이디 </label></td>
                            <td>
                                <input 
                                    type="text" 
                                    placeholder="아이디" 
                                    readOnly={true}
                                    value={memberDetail.memberId || ''}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label>닉네임 </label></td>
                            <td>
                                <input 
                                    type="text" 
                                    placeholder="닉네임" 
                                    readOnly={true}
                                    value={memberDetail.memberNickname || ''}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label>연락처 </label></td>
                            <td>
                                <input 
                                    type="text" 
                                    placeholder="연락처" 
                                    readOnly={true}
                                    value={memberDetail.memberPhonenumber || ''}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label>생년월일 </label></td>
                            <td>
                                <input 
                                    type="text" 
                                    placeholder="생년월일" 
                                    readOnly={true}
                                    value={memberDetail.memberBirth || ''}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label>E-mail </label></td>
                            <td>
                                <input 
                                    type="text" 
                                    placeholder="E-mail" 
                                    readOnly={true}
                                    value={memberDetail.memberEmail || ''}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label>주소 </label></td>
                            <td>
                                <input 
                                    type="text" 
                                    placeholder="주소" 
                                    readOnly={true}
                                    value={memberDetail.memberAddress || ''}
                                />
                            </td>
                        </tr>
                        <tr>
                                <td colSpan={3}>
                                    <div className='bottomBtn'>
                                        {(memberDetail.memberRole[0].authorityCode == 2) && 
                                            <button className='registerBtn'
                                                onClick = { () => onClickModifyHandler(memberDetail.memberCode) }
                                            >   
                                                매니저 정보 수정
                                            </button>
                                        }
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
            </>
            )}
        </div>
    );
}

export default MemberDetails;