import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { callReviewAPI } from '../../apis/ReviewAPICalls';
import { ButtonGroup, Button } from 'react-bootstrap';
import { decodeJwt } from '../../utils/tokenUtils'; // 토큰 디코딩 함수 임포트
import StarRating from '../Board_Review/StarRating'; // StarRating 컴포넌트 임포트

function Review() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const reviews = useSelector(state => state.reviewReducer);
    const reviewList = useMemo(() => reviews?.data || [], [reviews]);
    const pageInfo = useMemo(() => reviews?.pageInfo || {}, [reviews]);

    const [currentPage, setCurrentPage] = useState(1);
    const [category, setCategory] = useState('All');
    const [pageNumber, setPageNumber] = useState([]);
    const [decoded, setDecoded] = useState(''); // 사용자 역할

    const handleCategoryChange = (newCategory) => {
        setCategory(newCategory);
        setCurrentPage(1);
    };

    useEffect(() => {
        console.log('환경 변수 REACT_APP_RESTAPI_IP:', process.env.REACT_APP_RESTAPI_IP);
        console.log(`API 호출: currentPage=${currentPage}, category=${category}`);
        dispatch(callReviewAPI({ currentPage, category }));
    }, [currentPage, category, dispatch]);

    useEffect(() => {
        console.log('pageInfo : ', pageInfo);
        if (pageInfo.pageEnd) {
            const newPageNumber = [];
            for (let i = 1; i <= pageInfo.pageEnd; i++) {
                newPageNumber.push(i);
            }
            setPageNumber(newPageNumber);
        }
    }, [pageInfo]);

    useEffect(() => {
        console.log('Redux 상태:', reviews);
    }, [reviews]);

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

    const handleCreateReview = () => {
        navigate('/board/review/create'); // 게시글 등록 페이지로 이동
    };

    const handleRowClick = (reviewCode) => {
        navigate(`/board/review/${reviewCode}`, { state: { category } }); // 게시글 상세 페이지로 이동 ( 카테고리 전달)
    };

    return (
        <>
            <h2 onClick={() => handleCategoryChange('All')}>리뷰게시판</h2>
            <ButtonGroup className='mb-3'>
                <Button onClick={() => handleCategoryChange('강남점')}>강남</Button>
                <Button onClick={() => handleCategoryChange('종로점')}>종로</Button>
                <Button onClick={() => handleCategoryChange('신촌점')}>신촌</Button>
                {decoded === "ROLE_USER" && (
                    <Button onClick={handleCreateReview}>게시글 등록</Button>
                )}
            </ButtonGroup>
            <hr />
            <div className='formTotal'>
                <table>
                    <colgroup>
                        <col width="15%" />
                        <col width="40%" />
                        <col width="20%" />
                        <col width="10%" />
                        <col width="15%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>지점</th>
                            <th>제목</th>
                            <th>작성일</th>
                            <th>작성자</th>
                            <th>별점</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(reviewList) && reviewList.length > 0 ? (
                            reviewList.map((review) => (
                                <tr key={review.reviewCode} onClick={() => handleRowClick(review.reviewCode)}>
                                    <td>{review.storeName}</td>
                                    <td>{review.reviewTitle}</td>
                                    <td>{review.createDate}</td>
                                    <td>{review.memberNickname}</td>
                                    <td><StarRating rating={review.reviewStar}/></td>{/* 별점 표시 */}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">데이터가 없습니다.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div>
                {pageNumber.length > 0 && (
                    <>
                        <button 
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            &lt;
                        </button>
                        {pageNumber.map((num) => (
                            <li key={num} onClick={() => setCurrentPage(num)}>
                                <button> {num} </button>
                            </li>
                        ))}
                        <button 
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === pageNumber[pageNumber.length - 1] || pageNumber.length === 0}
                        >
                            &gt;
                        </button>
                    </>
                )}
            </div>
        </>
    );
}

export default Review;
