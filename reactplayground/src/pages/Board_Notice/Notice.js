import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { callNoticeAPI } from '../../apis/NoticeAPICalls';

function Notice() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const notices = useSelector(state => state.noticeReducer);
    const noticeList = notices?.data || [];
    const pageInfo = notices?.pageInfo || {};

    const [currentPage, setCurrentPage] = useState(1);
    const [category, setCategory] = useState('All');
    const [pageNumber, setPageNumber] = useState([]);
    
    
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

    return (
        <>
            <div>
                <h2 onClick={() => handleCategoryChange('All')}>공지게시판</h2>
                <button onClick={() => handleCategoryChange('공지사항')}>공지사항</button>
                <button onClick={() => handleCategoryChange('이벤트')}>이벤트</button>
                <button onClick={() => handleCategoryChange('자주묻는질문')}>자주묻는질문</button>
            </div>
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
