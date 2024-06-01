import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

function NoticeDetail() {
  const { noticeCode } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [notice, setNotice] = useState(null);

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

  const handleBackToList = () => {
    navigate('/board/notice', {state : {category : location.state.category}});
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
    </div>
  );
}

export default NoticeDetail;
