import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { decodeJwt } from '../../utils/tokenUtils';

import {
    callGetMemberAPI
} from '../../apis/MemberAPICalls'

function Profile() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const member = useSelector(state => state.memberReducer);  
    const token = decodeJwt(window.localStorage.getItem("accessToken"));   
    const memberDetail = member.data;

    const onClickBackHandler = () => {
        
        /* 돌아가기 클릭시 메인 페이지로 이동 */
        navigate('/');
    }

    const onClickModifyHandler = () => {
        navigate('./memberUpdate');
    }

    useEffect(
        () => {    
            console.log('token', token.sub);
            if(token !== null) {
                dispatch(callGetMemberAPI({	// 회원 정보 조회
                    memberId: token.sub
                }));            
            }
        }
        ,[]
    );
    


    return (
        <div className='profileDiv'  >
            <h2>내 정보</h2>
            { memberDetail &&
            <div className='formTotal'>
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
                                        <button className='registerBtn'
                                            onClick = { onClickModifyHandler }
                                        >   
                                            회원정보 수정
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

            }
        </div>
    );
}

export default Profile;