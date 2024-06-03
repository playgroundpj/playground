import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createNoticeAPI, callNoticeAPI } from '../../apis/NoticeAPICalls';
import { NavLink } from 'react-router-dom';
import { ButtonGroup, Button } from 'react-bootstrap';
import Swal from "sweetalert2";

function CreateNotice() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [category, setCategory] = useState('공지사항');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');


    const handleCategoryChange = (category) => {
        setCategory(category);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleRegister = async () => {
        if (!title.trim() || !content.trim()) {
            Swal.fire({
                icon: 'warning',
                title: '제목과 내용을 입력해주세요.',
                showConfirmButton: true,
                confirmButtonColor: '#97A482',
                customClass: { title: 'swal2-title' }
            });
            return;
        }

        const noticeData = {
            noticeCategory: category,
            noticeTitle: title,
            noticeContent: content,
            memberCode: 1,
            createDate: new Date().toISOString(),
            modifyedDate: new Date().toISOString()
        };

        await dispatch(createNoticeAPI(noticeData))
        await dispatch(callNoticeAPI({ currentPage: 1, category }));
        navigate('/board/notice');
    };

    const handleCancel = () => {
        navigate('/board/notice');
    };
    

    return (
        <div className='registerCSS'>
            <NavLink to='/'>
                <span>
                    <img src='../../../images/common/logo-playground.png'/>
                </span>
            </NavLink>
            <h2>게시글등록</h2>
           
            <hr></hr> 
            <ButtonGroup className='mb-3'>
                {['공지사항', '이벤트', '자주묻는질문'].map((cat) => (
                    <Button
                        key={cat}
                        variant={category === cat ? 'primary' : 'outline-primary'}
                        onClick={() => handleCategoryChange(cat)}
                    >
                        {cat}
                    </Button>
                ))}
            </ButtonGroup>
            <div className='formTotal'>
                <table>
                    <colgroup>
                        <col style={{width:'15%'}}></col>
                        <col style={{width:'63%'}}></col>
                        <col style={{width:'22%'}}></col>
                    </colgroup>
                    <tbody>
                        <tr>
                            <td><label>제목</label></td>
                            <td>
                                <input
                                    type='text'
                                    value={title}
                                    onChange={handleTitleChange}
                                    placeholder='제목을 입력해주세요'>
                                </input>
                            </td>
                        </tr>
                    <tr>
                        <td><label>내용</label></td>
                        <td>
                            <textarea
                            value={content}
                            onChange={handleContentChange}
                            placeholder='내용을 입력해주세요'>
                            </textarea>
                        </td>
                        
                    </tr>
                    <tr>
                        <td><label>첨부파일 1</label></td>
                        <td>
                            <input
                            type='file'
                            multiple>
                        </input>
                        </td>
                    </tr>
                    <tr>
                        <td><label>첨부파일 2</label></td>
                        <td>
                           <input
                            type='file'
                            multiple>
                        </input> 
                        </td>
                    </tr>
                    <tr>
                        <td><label>첨부파일 3</label></td>
                        <td>
                           <input
                            type='file'>
                        </input> 
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            <div className='bottomBtn'>
                                <button className='registerBtn' onClick={handleRegister}>등록</button>
                                <button className='backBtn' onClick={handleCancel}>취소</button>
                            </div>
                        </td>
                        
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CreateNotice;