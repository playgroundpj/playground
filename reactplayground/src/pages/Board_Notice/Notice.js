import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { callNoticeAPI } from '../../apis/NoticeAPICalls';
import { decodeJwt } from '../../utils/tokenUtils'; // 토큰 디코딩 함수 임포트

function Notice() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const notices = useSelector(state => state.noticeReducer);
    const noticeList = notices?.data || [];
    const pageInfo = notices?.pageInfo || {};

    const [currentPage, setCurrentPage] = useState(1);
    const [category, setCategory] = useState('All');
    const [pageNumber, setPageNumber] = useState([]);


    const [decoded, setDecoded] = useState(''); // 사용자 역할
    
    
    const handleCategoryChange = (newCategory) => {
        setCategory(newCategory);
        setCurrentPage(1);
    }
    
    useEffect(() => {
        console.log(`API 호출: currentPage=${currentPage}, category=${category}`);
        dispatch(callNoticeAPI({currentPage, category}));
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
        console.log('Redux 상태:', notices);
    }, [notices]);

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

    const handleCreateNotice = () => {
        navigate('/board/notice/create');     // 게시글 등록 페이지로 이동
    }
    

    return (
        <>
            <div>
                <h2 onClick={() => handleCategoryChange('All')}>공지게시판</h2>
                <button onClick={() => handleCategoryChange('공지사항')}>공지사항</button>
                <button onClick={() => handleCategoryChange('이벤트')}>이벤트</button>
                <button onClick={() => handleCategoryChange('자주묻는질문')}>자주묻는질문</button>
            </div>
            {decoded === "ROLE_ADMIN" && (
                <div>
                    <button onClick={handleCreateNotice}>게시글 등록</button>
                </div>
            )}
            <table>
                <colgroup>
                    <col width="15%" />
                    <col width="50%" />
                    <col width="20%" />
                    <col width="15%" />
                </colgroup>
                <thead>
                    <tr>
                        <th>카테고리</th>
                        <th>제목</th>
                        <th>작성일</th>
                        <th>작성자</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(noticeList) && noticeList.length > 0 ? (
                        noticeList.map((notice) => (
                            <tr key={notice.noticeCode}>
                                <td>{notice.noticeCategory}</td>
                                <td>{notice.noticeTitle}</td>
                                <td>{notice.createDate}</td>
                                <td>{notice.memberCode}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">데이터가 없습니다.</td>
                        </tr>
                    )}
                </tbody>
            </table>
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
                            disabled={currentPage === pageInfo.pageEnd}
                        >
                            &gt;
                        </button>
                    </>
                )}
            </div>
        </>
    );
}

export default Notice;
