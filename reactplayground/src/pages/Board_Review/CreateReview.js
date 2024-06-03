// src/components/board/CreateReview.js
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createReviewAPI } from '../../apis/ReviewAPICalls';
import { NavLink } from 'react-router-dom';
import { ButtonGroup, Button } from 'react-bootstrap';
import Swal from "sweetalert2";
import { decodeJwt } from '../../utils/tokenUtils'; // 토큰 디코딩 함수 임포트

function CreateReview() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [storeName, setStoreName] = useState('지점1'); // 기본값을 '지점1'로 설정
    const [reviewTitle, setReviewTitle] = useState('');
    const [reviewContent, setReviewContent] = useState('');
    const [reviewStar, setReviewStar] = useState(0);
    const [files, setFiles] = useState([]);

    const handleStoreNameChange = (store) => {
        setStoreName(store);
    };

    const handleTitleChange = (e) => {
        setReviewTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setReviewContent(e.target.value);
    };

    const handleStarChange = (e) => {
        setReviewStar(Number(e.target.value));
    };

    const handleFileChange = (e) => {
        setFiles(e.target.files);
    };

    const handleRegister = () => {
        if (!reviewTitle.trim() || !reviewContent.trim() || !reviewStar) {
            Swal.fire({
                icon: 'warning',
                title: '제목, 내용 및 별점을 입력해주세요.',
                showConfirmButton: true,
                confirmButtonColor: '#97A482',
                customClass: { title: 'swal2-title' }
            });
            return;
        }

        const token = localStorage.getItem('accessToken');
        const decoded = decodeJwt(token);
        const memberCode = parseInt(decoded.sub, 10); // 토큰에서 memberCode 추출 (정수로 변환)

        const reviewData = {
            storeName,
            reviewTitle,
            reviewContent,
            reviewStar,
            memberCode,
            files
        };

        console.log('Review Data:', reviewData); // 콘솔에 reviewData 로그 찍기

        dispatch(createReviewAPI(reviewData));
        navigate('/board/review');
    };

    const handleCancel = () => {
        navigate('/board/review');
    };

    return (
        <div className='registerCSS'>
            <NavLink to='/'>
                <span>
                    <img src='../../../images/common/logo-playground.png' alt="logo"/>
                </span>
            </NavLink>
            <h2>리뷰 작성</h2>
            <hr />
            <ButtonGroup className='mb-3'>
                {['지점1', '지점2', '지점3'].map((store) => (
                    <Button
                        key={store}
                        variant={storeName === store ? 'primary' : 'outline-primary'}
                        onClick={() => handleStoreNameChange(store)}
                    >
                        {store}
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
                                    value={reviewTitle}
                                    onChange={handleTitleChange}
                                    placeholder='제목을 입력해주세요'
                                    required>
                                </input>
                            </td>
                        </tr>
                        <tr>
                            <td><label>내용</label></td>
                            <td>
                                <textarea
                                    value={reviewContent}
                                    onChange={handleContentChange}
                                    placeholder='내용을 입력해주세요'
                                    required>
                                </textarea>
                            </td>
                        </tr>
                        <tr>
                            <td><label>별점</label></td>
                            <td>
                                <select value={reviewStar} onChange={handleStarChange} required>
                                    <option value="">별점을 선택해주세요</option>
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <option key={star} value={star}>{star}점</option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td><label>첨부파일 1</label></td>
                            <td>
                                <input
                                    type='file'
                                    multiple
                                    onChange={handleFileChange}>
                                </input>
                            </td>
                        </tr>
                        <tr>
                            <td><label>첨부파일 2</label></td>
                            <td>
                                <input
                                    type='file'
                                    multiple
                                    onChange={handleFileChange}>
                                </input>
                            </td>
                        </tr>
                        <tr>
                            <td><label>첨부파일 3</label></td>
                            <td>
                                <input
                                    type='file'
                                    multiple
                                    onChange={handleFileChange}>
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

export default CreateReview;
