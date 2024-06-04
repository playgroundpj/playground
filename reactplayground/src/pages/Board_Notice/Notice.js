import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { callNoticeAPI } from '../../apis/NoticeAPICalls';
import { ButtonGroup, Button } from 'react-bootstrap';
import { decodeJwt } from '../../utils/tokenUtils'; // 토큰 디코딩 함수 임포트

function Notice() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const notices = useSelector(state => state.noticeReducer);
    const noticeList = notices?.data || [];
    const pageInfo = useMemo(() => notices?.pageInfo || {}, [notices]) ;

    const [currentPage, setCurrentPage] = useState(1);
    const [category, setCategory] = useState('All');
    const [pageNumber, setPageNumber] = useState([]);
    const [activeButton, setActiveButton] = useState('All');


    const activeStyle = {
        backgroundColor: '#97A482',
    }    


    const [decoded, setDecoded] = useState(''); // 사용자 역할

    const handleCategoryChange = (newCategory) => {
        setCategory(newCategory);
        setCurrentPage(1);
        setActiveButton(newCategory);
    }
    
    useEffect(() => {
        console.log('환경 변수 REACT_APP_RESTAPI_IP:', process.env.REACT_APP_RESTAPI_IP);
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
    
    const handleRowClick = (noticeCode) => {
        navigate(`/board/notice/${noticeCode}`, {state : {category}});    // 게시글 상세 페이지로 이동 ( 카테고리전달)
    }


    return (
        <>
                <h2 onClick={() => handleCategoryChange('All')}>공지게시판</h2>
            <div className='categoryDiv'>
                <button 
                    className='categoryBtn' 
                    onClick={() => handleCategoryChange('공지사항')}
                    style={activeButton === '공지사항' ? activeStyle : null}
                >
                    공지사항
                </button>
                <button 
                    className='categoryBtn' 
                    onClick={() => handleCategoryChange('이벤트')}
                    style={activeButton === '이벤트' ? activeStyle : null}
                >
                    이벤트
                    </button>
                <button 
                    className='categoryBtn' 
                    onClick={() => handleCategoryChange('자주묻는질문')}
                    style={activeButton === '자주묻는질문' ? activeStyle : null}
                >
                    자주묻는질문
                    </button>
                {decoded === "ROLE_ADMIN" && (
                        <button 
                            onClick={handleCreateNotice}
                            className='categoryBtn boardRegisterBtn'
                        >
                            게시글 등록
                        </button>
                )}
            </div>
            <hr></hr>
                <div className='formTotal noticeForm'>
                    <table>
                        <colgroup>
                            <col width="25%" />
                            <col width="40%" />
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
                                    <tr key={notice.noticeCode} onClick={() => handleRowClick(notice.noticeCode)}>
                                        <td>{notice.noticeCategory}</td>
                                        <td>{notice.noticeTitle}</td>
                                        <td>{notice.createDate}</td>
                                        <td>{notice.memberNickname}</td>
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
            <div className='pagingBtnDiv' style={{ listStyleType: "none", display: "flex" }}>
                {pageNumber.length > 0 && (
                    <>
                        <button 
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className='pagingBtn'
                        >
                            &lt;
                        </button>
                        {pageNumber.map((num) => (
                            <li key={num} onClick={() => setCurrentPage(num)}>
                                <button
                                    style={ currentPage === num ? {backgroundColor : '#97A482', color : '#ecebe8' } : null}
                                    className='pagingBtn'
                                > {num} </button>
                            </li>
                        ))}
                        <button
                            className='pagingBtn' 
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
