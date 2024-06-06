import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Swal from "sweetalert2";
import { updateNoticeAPI, deleteNoticeAPI, callNoticeDetailAPI } from '../../apis/NoticeAPICalls';
import { decodeJwt } from '../../utils/tokenUtils'; // 토큰 디코딩 함수 임포트


function NoticeModify() {

    const navigate = useNavigate();
    const { noticeCode } = useParams();
    const dispatch = useDispatch();
    const isLogin = window.localStorage.getItem('accessToken');    // Local Storage 에 token 정보 확인
    const token = decodeJwt(window.localStorage.getItem("accessToken")); 
    const notice = useSelector(state => state.noticeReducer);
    const noticeDetail = notice.data;

    
    const [form, setForm] = useState({
        noticeTitle: '',
        noticeContent: '',
        createDate: '',
        modifyedDate: ''
    });


    useEffect(
        () => {
            // 관리자가 아니면 못 들어오게 막음
            if(isLogin !== undefined && isLogin !== null) {
                if(token.auth[0] !== 'ROLE_ADMIN'){
                    navigate("/notice/modify");
                }
            }else{
                navigate("/notice");
            }        

        },[token]
    )
    
    useEffect(() => {
        dispatch(callNoticeDetailAPI(noticeCode));
    }, [dispatch, noticeCode]);


    
    
    
    useEffect(() => {
        if (noticeDetail) {
            setForm({
                // noticeCode : noticeDetail.noticeCode,
                noticeTitle: noticeDetail.noticeTitle,
                noticeContent: noticeDetail.noticeContent,
                createDate: noticeDetail.createDate, // 기존 작성일자 설정
                modifyedDate: noticeDetail.modifyedDate // 기존 수정일자 설정
            });
        }
    }, [noticeDetail]);
    
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }; 
    
    const handleBack = () => {
        navigate(-1);
    }

    const handleModify = () => {
        Swal.fire({
            title : '수정하시겠습니까?',
            icon : 'warning',
            showCancelButton : true,
            confirmButtonColor : '#3085d6',
            cancelButtonColor : '#d33',
            confirmButtonText : '수정',
            cancelButtonText : '취소'
        }).then((result) => {
            if(result.isConfirmed){
                Swal.fire({
                    title : "수정완료",
                    text : "게시글이 수정되었습니다.",
                    icon : "success",
                    showConfirmButton : false,
                    timer : 1000
                });
                dispatch(updateNoticeAPI({noticeCode : form.noticeCode}));
                navigate(`/board/notice/{noticeCode}`, {replace : true});
                window.location.reload();
            }
        });
    }

    const handleDelete = async () => {
        Swal.fire({
            title : '삭제하시겠습니까?',
            text : '삭제 후 되돌릴 수 없습니다',
            icon : 'warning',
            showCancelButton : true,
            confirmButtonColor : '#d33',
            cancelButtonColor :  '#3085d6',
            confirmButtonText : '삭제',
            cancelButtonText : '취소'
        }).then((result) => {
            if(result.isConfirmed){
                Swal.fire({
                    title: "삭제 완료!",
                    text: "게시글이 삭제되었습니다",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1000
                });
                dispatch(deleteNoticeAPI({noticeCode : form.noticeCode}));
                navigate('/board/notice', {replace : true});
                window.location.reload();
            }
        });
    }

    return (
        <div className='registerCSS'>
            <NavLink to='/'>
                <span>
                    <img src='../../../images/common/logo-playground.png' alt='logo'/>
                </span>
            </NavLink>
            <h2>게시글수정</h2>
            <hr></hr>
            <div className='formTotal boardRegistForm'>
                <table>
                    <colgroup>
                        <col style={{width:'20%'}}></col>
                        <col style={{width:'50%'}}></col>
                        <col style={{width:'15%'}}></col>
                    </colgroup>
                    <tbody>
                        <tr>
                            <td><label>제목</label></td>
                            <td>
                                <input
                                    type="text"
                                    name="noticeTitle"
                                    // placeholder='게시글 제목을 입력해주세요'
                                    value={form.noticeTitle}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label>내용</label></td>
                            <td>
                                <textarea
                                style={{ color: 'black' }} // 인라인 스타일로 텍스트 색상 설정
                                name="noticeContent"
                                value={form.noticeContent}
                                onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label>작성일: {new Date(form.createDate).toLocaleDateString()}</label>
                                {form.modifyedDate && 
                                <label>수정일: {new Date(form.modifyedDate).toLocaleDateString()}</label>}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='boardRegisterBtn'>        
                <button className='noticeModifyBtn' onClick={handleModify}>수정하기</button>
                <button className='noticeDeleteBtn' onClick={handleDelete}>삭제하기</button>
                <button className='noticeModifyBtn' onClick={handleBack}>돌아가기</button>
            </div>        
        </div>
    );
}

export default NoticeModify;
