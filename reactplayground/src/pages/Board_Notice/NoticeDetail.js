import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { decodeJwt } from '../../utils/tokenUtils'; // 토큰 디코딩 함수 임포트


function NoticeDetail() {
  const { noticeCode } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [notice, setNotice] = useState(null);
  const [decoded, setDecoded] = useState('');

  useEffect(() => {
    // API 호출을 통해 공지사항 상세 정보를 가져옴
    const fetchNoticeDetail = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/board/notice/${noticeCode}`);
        const result = await response.json();
        if (response.ok) {
          setNotice(result.data);
        } else {
          console.error('Error fetching notice detail:', result.error);
        }
      } catch (error) {
        console.error('Error fetching notice detail:', error);
      }
    };

    fetchNoticeDetail();
  }, [noticeCode]);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const decodedToken = decodeJwt(token); // JWT 토큰 디코딩
      setDecoded(decodedToken.auth[0]); // 역할 정보 설정
    }
  }, []);

  const handleBackToList = () => {
    const category = location.state?.category || 'All';
    navigate('/board/notice', { state: { category } });
  };

  // 수정
  const handleModifyNotice = () => {
    navigate(`/board/notice/modify/${noticeCode}`);
  };

  // 삭제
  const handleDeleteNotice = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/board/notice/${noticeCode}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        handleBackToList();
      } else {
        console.error('Error deleting notice:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting notice:', error);
    }
  };


  if (!notice) {
    return <div>Loading...</div>;
  }
  

  return (
    <div>
        <h2>{notice.noticeTitle}</h2>
        <hr></hr>
        <p>{notice.noticeContent}</p>
        <p>작성자 : {notice.memberNickname}</p>
        <p>작성일 : {notice.createDate}</p>
        <Button onClick={handleBackToList}> 목록으로 </Button>
        {decoded === 'ROLE_ADMIN' && (
            <>
                <Button variant='primary' onClick={handleModifyNotice}> 게시물수정 </Button>
                <Button variant='danger' onClick={handleDeleteNotice}> 게시물삭제 </Button>
            </>
        )}
    </div>
  );
}

export default NoticeDetail;
