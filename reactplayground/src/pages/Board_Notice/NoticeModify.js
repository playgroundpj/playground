import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap'; // Bootstrap의 Button 컴포넌트를 사용
import { updateNoticeAPI, deleteNoticeAPI } from '../../apis/NoticeAPICalls'; // 수정 및 삭제 API 호출 함수 임포트
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';


function NoticeModify() {
  const { noticeCode } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [notice, setNotice] = useState({
    noticeTitle: '',
    noticeContent: ''
  });

  useEffect(() => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNotice({
      ...notice,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateNoticeAPI(noticeCode, {
      ...notice,
      createDate: new Date().toISOString().split('T')[0], // 작성일자를 수정일자로 변경
      modifiedDate: new Date().toISOString().split('T')[0] // 수정일자를 YYYY-MM-DD 형식으로 저장
    }));
    navigate(`/board/notice/${noticeCode}`); // 수정된 내용으로 상세 페이지로 이동
  };

  const handleDelete = async () => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      await dispatch(deleteNoticeAPI(noticeCode));
      navigate('/board/notice'); // 게시글 목록으로 이동
    }
  };


  return (
    <div className='registerCSS'>
        <NavLink to='/'>
                <span>
                    <img src='../../../images/common/logo-playground.png'/>
                </span>
        </NavLink>
        <h2>게시글수정</h2>  
        <hr></hr> 
      <form onSubmit={handleSubmit}>
        <div className='formTotal'>
          <label htmlFor="noticeTitle">제목</label>
          <input
            type="text"
            id="noticeTitle"
            name="noticeTitle"
            value={notice.noticeTitle}
            onChange={handleChange}
          />
        <div>
          <label htmlFor="noticeContent">내용</label>
          <textarea
            id="noticeContent"
            name="noticeContent"
            value={notice.noticeContent}
            onChange={handleChange}
            />
        </div>
        </div> 
        <div>
          <p>작성일: {new Date(notice.createDate).toLocaleDateString()}</p>
          {notice.modifiedDate && <p>수정일: {new Date(notice.modifiedDate).toLocaleDateString()}</p>}
        </div>
        <Button variant="primary" type="submit">수정하기</Button>
        <Button variant="danger" type="button" onClick={handleDelete}>삭제하기</Button>
      </form>
    </div>
  );
}

export default NoticeModify;
