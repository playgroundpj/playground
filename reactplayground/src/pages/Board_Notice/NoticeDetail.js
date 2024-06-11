import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { decodeJwt } from '../../utils/tokenUtils'; // 토큰 디코딩 함수 임포트
import { callNoticeDetailAPI } from '../../apis/NoticeAPICalls'; // API 호출 함수 임포트


function NoticeDetail() {
const { noticeCode } = useParams();
const location = useLocation();
const navigate = useNavigate();
const dispatch = useDispatch();
const notice = useSelector(state => state.noticeReducer);

const [decoded, setDecoded] = useState('');

useEffect(() => {
	// API 호출을 통해 공지사항 상세 정보를 가져옴
	dispatch(callNoticeDetailAPI(noticeCode));
}, [dispatch, noticeCode]);

useEffect(() => {
	// 로그인 상태와 역할 정보를 설정하는 로직 추가
	const token = localStorage.getItem('accessToken');
	console.log('토큰: ', token); // 토큰 확인용 로그
	if (token) {
		const decodedToken = decodeJwt(token); // JWT 토큰 디코딩
		console.log('디코딩된 토큰: ', decodedToken); // 디코딩된 토큰 확인용 로그
		setDecoded(decodedToken.auth[0]); // 역할 정보 설정
	}
}, []);

const handleBackToList = () => {
	const category = location.state?.category || 'All';
	navigate('/board/notice', { state: { category } });
};

// 수정
const onClickhandleModifyNotice = (noticeCode) => {
	navigate(`/board/notice/modify/${noticeCode}`);
};


if (!notice) {
	return <div>Loading...</div>;
}

return (
	<>
		<div className='profileDiv divCSS'>
			<h2>{notice.noticeCategory} - 상세 조회</h2>
			<div className='formTotal NoticeDetailCSS'>
				<table>
					<colgroup>
						<col style={{width : '15%'}}></col>
						<col style={{width : '85%'}}></col>
					</colgroup>
					<tbody>
						<tr>
							<td><span>제목</span> | </td>
							<td>{notice.noticeTitle}</td>
						</tr>						
						<tr>
							<td><span>작성자</span> | </td>
							<td>{notice.memberNickname}</td>
						</tr>
						<tr>
							<td><span>작성일</span> | </td>
							<td>{notice.createDate}</td>
						</tr>
						<tr>
							<td><span>내용</span> | </td>
							<td>{notice.noticeContent}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div className='noticeBtnDiv'>
				{decoded === "ROLE_ADMIN" && (
				<>
					<button className='registerBtn'
						onClick={() => onClickhandleModifyNotice(noticeCode)}
					>
						게시물수정
					</button>
				</>
				)}
				<button  className='backBtn'
					style={ (decoded === "ROLE_ADMIN") ? {} : {width: '100%', margin: '20px 0 0 0'}}
					onClick={handleBackToList}
					> 
					목록으로
				</button>
			</div>
		</div>
		

	</>
);
}

export default NoticeDetail;
