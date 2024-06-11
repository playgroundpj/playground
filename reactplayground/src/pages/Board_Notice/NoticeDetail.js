import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { decodeJwt } from '../../utils/tokenUtils'; // 토큰 디코딩 함수 임포트
<<<<<<< HEAD
import { callNoticeDetailAPI } from '../../apis/NoticeAPICalls'; // API 호출 함수 임포트

=======
import { callNoticeDetailAPI, deleteNoticeAPI } from '../../apis/NoticeAPICalls'; // API 호출 함수 임포트
import Swal from "sweetalert2";
>>>>>>> boardgame/crud

function NoticeDetail() {
const { noticeCode } = useParams();
const location = useLocation();
const navigate = useNavigate();
const dispatch = useDispatch();
<<<<<<< HEAD
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

=======
const notice = useSelector(state => state.noticeReducer.noticeDetail);

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

// 삭제
const onClickhandleDeleteNotice = () => {
	Swal.fire({
		title: "게시글을 삭제하시겠습니까?",
		text: "삭제 후 되돌릴 수 없습니다.",
		icon: "warning",
		showCancelButton: true,
		confirmButtonColor: "#97A482",
		cancelButtonColor: "#C45D4A",
		confirmButtonText: "삭제",
		cancelButtonText: "취소"
		}).then((result) => {
		if (result.isConfirmed) {
			dispatch(deleteNoticeAPI(noticeCode))
			.then(() => {
				Swal.fire({
				title: "삭제 완료!",
				text: "게시글이 삭제되었습니다",
				icon: "success",
				showConfirmButton: false,
				timer: 1000
			});
			navigate('/board/notice');	// 게시글 목록으로 이동
			})
		}
	});
}
>>>>>>> boardgame/crud

if (!notice) {
	return <div>Loading...</div>;
}

return (
	<>
<<<<<<< HEAD
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
=======
		<div className='profileDiv'>
			<h2>{notice.noticeTitle}</h2>
			<hr></hr>
			<div className='formTotal'>
				<table>
					<colgroup>
						<col style={{width : '20%'}}></col>
						<col style={{width : '80%'}}></col>
					</colgroup>
					<tbody>
						<tr>
							<td><p>{notice.noticeContent}</p></td>
						</tr>
>>>>>>> boardgame/crud
						<tr>
							<td><span>작성자</span> | </td>
							<td>{notice.memberNickname}</td>
						</tr>
						<tr>
							<td><span>작성일</span> | </td>
							<td>{notice.createDate}</td>
						</tr>
<<<<<<< HEAD
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
=======
					</tbody>
				</table>
			</div>
		</div>
		<div className='boardRegisterBtn'>
			<button  className='noticeModifyBtn' 
				onClick={handleBackToList}
				> 
				목록으로
			</button>
			{decoded === "ROLE_ADMIN" && (
				<>
					<button className='noticeModifyBtn'
>>>>>>> boardgame/crud
						onClick={() => onClickhandleModifyNotice(noticeCode)}
					>
						게시물수정
					</button>
<<<<<<< HEAD
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
		
=======
					
					<button className='noticeDeleteBtn'
						onClick={() => onClickhandleDeleteNotice}
						> 
						게시물삭제
					</button>
				</>
			)}
		</div>
>>>>>>> boardgame/crud

	</>
);
}

export default NoticeDetail;
