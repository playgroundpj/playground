import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createNoticeAPI } from '../../apis/NoticeAPICalls';
import { NavLink } from 'react-router-dom';
import Swal from "sweetalert2";

function CreateNotice() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [category, setCategory] = useState('공지사항');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState([]);
    const maxFileSize = 10 * 1024 * 1024; // 10MB

    const handleCategoryChange = (category) => {
        setCategory(category);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        const totalSize = selectedFiles.reduce((sum, file) => sum + file.size, 0);

        if (totalSize > maxFileSize) {
            Swal.fire({
                icon: 'warning',
                title: '파일 총 용량이 10MB를 초과할 수 없습니다.',
                showConfirmButton: true,
                confirmButtonColor: '#97A482',
                customClass: { title: 'swal2-title' }
            });
        } else {
            setFiles(selectedFiles);
        }
    };

    const handleRegister = () => {
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

        const formData = new FormData();
        formData.append('category', category);
        formData.append('title', title);
        formData.append('content', content);
        files.forEach((file, index) => {
            formData.append('files', file);
        });

        dispatch(createNoticeAPI(formData));
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
            <h2>공지게시글등록</h2>
           
            <hr></hr> 
            <div>
                {['공지사항', '이벤트', '자주묻는질문'].map((cat) => (
                    <button 
                        key={cat}
                        className={`categoryButton ${category === cat ? 'active' : ''}`}
                        onClick={() => handleCategoryChange(cat)}>
                        {cat}
                    </button>
                ))}
            </div>
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
                            onChange={handleFileChange}
                            multiple>
                        </input>
                        </td>
                    </tr>
                    <tr>
                        <td><label>첨부파일 2</label></td>
                        <td>
                           <input
                            type='file'
                            onChange={handleFileChange}
                            multiple>
                        </input> 
                        </td>
                    </tr>
                    <tr>
                        <td><label>첨부파일 3</label></td>
                        <td>
                           <input
                            type='file'
                            onChange={handleFileChange}
                            multiple>
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