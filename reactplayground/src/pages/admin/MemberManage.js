import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { decodeJwt } from '../../utils/tokenUtils';

import {
    callGetMemberListAPI
} from '../../apis/MemberAPICalls';

function MemberManage() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const member = useSelector(state => state.memberReducer);  
    const isLogin = window.localStorage.getItem('accessToken');    // Local Storage 에 token 정보 확인
    const token = decodeJwt(window.localStorage.getItem("accessToken"));   
    const [roleList, setRoleList] = useState([]);
    const memberList = member.data || [];
    const [sortConfig, setSortConfig] = useState({ key: 'memberCode', direction: 'ascending' });
    const [sortedMembers, setSortedMembers] = useState([]);
    const [loading, setLoading] = useState(true);


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


    


    const sortMembers = (members, config) => {
        console.log('sortMember 동작');
        if(members.grantType === 'Bearer'){
            return null;
        }else{
            console.log('members : ', members);
            if(members !== null && members.length !== undefined){
                const finalRolelist = memberList.map(member => member.memberRole.map(role => role.authority.name)).map(role => role[0].slice(5));
                setRoleList(finalRolelist);
                return [...members].sort((a, b) => {
                let aKey = a[config.key];
                let bKey = b[config.key];
    
                // # 인덱스 정렬
                if (config.key === 'index') {
                    aKey = members.indexOf(a);
                    bKey = members.indexOf(b);
                }
    
                // 권한 정렬
                if (config.key === 'authorityName') {
                    aKey = roleList[members.indexOf(a)];
                    bKey = roleList[members.indexOf(b)];
                }
    
                if (aKey < bKey) {
                    return config.direction === 'ascending' ? -1 : 1;
                }
                if (aKey > bKey) {
                    return config.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
            }
            
        }
    };

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) {
            return null;
        }
        if (sortConfig.direction === 'ascending') {
            return '▲';  // 삼각형 위 방향
        }
        return '▼';  // 삼각형 아래 방향
    };

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const onCilckMemberSelectHandler = (memberCode) => {
        navigate(`/mypage/member/${memberCode}`);
    }

    const onClickResgisterHandler = () => {
        navigate(`/mypage/member/memberRegist`);
    }

    useEffect(() => {
        if (Array.isArray(memberList) && memberList.length > 0) {
            console.log('[memberList]',memberList);
            
            setSortedMembers(sortMembers(memberList, sortConfig));
            setLoading(false); // 데이터가 로드되면 로딩 상태를 false로 설정
        }
    }, [memberList]);

    useEffect(() => {
        setSortedMembers(sortMembers(memberList, sortConfig));
    }, [sortConfig, memberList]);

    useEffect(() => {
        if (token !== null) {
            dispatch(callGetMemberListAPI());
        }
    }, []);

    return (
        <div className='profileDiv'>
            <h2>전체 회원 및 매니저 목록</h2>
            <button className='mangerRegisterBtn' onClick={ onClickResgisterHandler }>매니저 등록</button>
            {loading ? ( // 로딩 중일 때 표시할 내용
                <p>Loading...</p>
            ) : (
                memberList &&
                <div className='formTotal manageList'>
                    <table>
                        <colgroup>
                            <col style={{ width: '4%' }}></col>
                            <col style={{ width: '10%' }}></col>
                            <col style={{ width: '10%' }}></col>
                            <col style={{ width: '10%' }}></col>
                            <col style={{ width: '10%' }}></col>
                            <col style={{ width: '15%' }}></col>
                            <col style={{ width: '20%' }}></col>
                            <col style={{ width: '20%' }}></col>
                        </colgroup>
                        <thead>
                            <tr>
                                <th onClick={() => requestSort('index')}># {getSortIcon('index')}</th>
                                <th onClick={() => requestSort('authorityName')}>권한 {getSortIcon('authorityName')}</th>
                                <th onClick={() => requestSort('memberId')}>아이디 {getSortIcon('memberId')}</th>
                                <th onClick={() => requestSort('memberNickname')}>닉네임 {getSortIcon('memberNickname')}</th>
                                <th onClick={() => requestSort('memberBirth')}>생년월일 {getSortIcon('memberBirth')}</th>
                                <th onClick={() => requestSort('memberPhonenumber')}>연락처 {getSortIcon('memberPhonenumber')}</th>
                                <th onClick={() => requestSort('memberEmail')}>E-mail {getSortIcon('memberEmail')}</th>
                                <th onClick={() => requestSort('memberAddress')}>주소 {getSortIcon('memberAddress')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(memberList) && memberList.length > 0 ? (
                                sortedMembers.map((member) => (
                                    <tr key={member.memberCode}
                                        onClick={ () => onCilckMemberSelectHandler(member.memberCode) }
                                    >
                                        <td>{memberList.indexOf(member) + 1}</td>
                                        <td>{roleList[memberList.indexOf(member)]}</td>
                                        <td>{member.memberId}</td>
                                        <td>{member.memberNickname}</td>
                                        <td>{member.memberBirth}</td>
                                        <td>{member.memberPhonenumber}</td>
                                        <td>{member.memberEmail}</td>
                                        <td>{member.memberAddress}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8">데이터가 없습니다.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default MemberManage;
