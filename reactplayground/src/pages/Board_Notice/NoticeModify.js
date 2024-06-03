import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Swal from "sweetalert2";
import { updateNoticeAPI, deleteNoticeAPI, callNoticeDetailAPI } from '../../apis/NoticeAPICalls';

function NoticeModify() {
  const { noticeCode } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const noticeDetail = useSelector(state => state.noticeReducer.noticeDetail);


  const [notice, setNotice] = useState({
    noticeTitle: '',
    noticeContent: '',
    createDate: '',
    modifyedDate: ''
  });

  useEffect(() => {
    dispatch(callNoticeDetailAPI(noticeCode));
  }, [dispatch, noticeCode]);

  useEffect(() => {
    if (noticeDetail) {
      setNotice({
        noticeTitle: noticeDetail.noticeTitle,
        noticeContent: noticeDetail.noticeContent,
        createDate: noticeDetail.createDate, // 기존 작성일자 설정
        modifyedDate: noticeDetail.modifyedDate // 기존 수정일자 설정
      });
    }
  }, [noticeDetail]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNotice(prevNotice => ({
      ...prevNotice,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('noticeCode', noticeCode);
      console.log('notice', notice);
      setNotice(
        {
          noticeTitle: notice.noticeTitle,
          noticeContent: notice.noticeContent,
          createDate: notice.createDate, // 기존 작성일자를 유지
          modifyedDate: new Date().toISOString().split('T')[0] // 수정일자를 YYYY-MM-DD 형식으로 저장
        }
      )
      const result = await dispatch(updateNoticeAPI(noticeCode, {notice}));

      if (result) {
        Swal.fire({
          icon: 'success',
          title: '수정이 완료되었습니다.',
          showConfirmButton: true,
          confirmButtonColor: '#97A482',
          customClass: { title: 'swal2-title' }
        });
        navigate(`/board/notice/${noticeCode}`); // 수정된 내용으로 상세 페이지로 이동
      }
    } catch (error) {
      console.error('Error updating notice:', error);
      Swal.fire({
        icon: 'error',
        title: '수정 중 오류가 발생했습니다.',
        showConfirmButton: true,
        confirmButtonColor: '#97A482',
        customClass: { title: 'swal2-title' }
      });
    }
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
          <img src='../../../images/common/logo-playground.png' />
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
          {notice.modifyedDate && <p>수정일: {new Date(notice.modifyedDate).toLocaleDateString()}</p>}
        </div>
        <Button variant="primary" type="submit">수정하기</Button>
        <Button variant="danger" type="button" onClick={handleDelete}>삭제하기</Button>
      </form>
    </div>
  );
}

export default NoticeModify;
