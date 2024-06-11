import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { decodeJwt } from '../../utils/tokenUtils'; 
import { callGetBoardgameListAPI } from '../../apis/BoardgameAPICalls';

function BoardGame() {

    const boardgames = useSelector(state => state.boardgameReducer) || [];
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLogin = window.localStorage.getItem('accessToken');    // Local Storage 에 token 정보 확인
    const token = decodeJwt(window.localStorage.getItem("accessToken")); 
    const [loading, setLoading] = useState(true);

    const boardgameList = boardgames.data || [];
    const pageInfo = boardgames.pageInfo || {};

    const [currentPage, setCurrentPage] = useState(1);

    const pageNumber = [];
    if (pageInfo.pageEnd) {
        for (let i = 1; i <= pageInfo.pageEnd; i++) {
            pageNumber.push(i);
        }
    }    

    useEffect(() => {
        setLoading(true);
        dispatch(callGetBoardgameListAPI({ currentPage: currentPage }))
            .finally(() => setLoading(false));
    }, [currentPage, dispatch]);

    useEffect(() => {
        if (boardgameList.length > 0) {
            console.log('boardgameList : ', boardgameList);
        }
    }, [boardgameList]);

    const onClickBoardgameHandler = (boardgameCode) => {
        navigate(`/boardgame/boardgameDetails/${boardgameCode}`);
    }

    const onClickRegisterHandler = () => {
        navigate(`/boardgame/regist`);
    }

    return (
        <div className='listDiv'> 
            {loading ? ( // 로딩 중일 때 표시할 내용
                <p>Loading...</p>
            ) : (
            <>
                <h2>전체 보드게임 목록</h2>
                { (token !== null) ? ((token.auth.includes('ROLE_ADMIN') || token.auth.includes('ROLE_MANAGER')) && <button className='mangerRegisterBtn' onClick={ onClickRegisterHandler }>보드게임 등록</button>) : null}
                <div className='ListBox'>
                    {boardgameList.length > 0 ? (
                        boardgameList.map(boardgame => (
                            <div
                                key={boardgame.boardgameCode}
                                onClick={() => onClickBoardgameHandler(boardgame.boardgameCode)}
                                className='TotalItem'
                            >
                                <table>
                                    <tbody>
                                        <tr className='boardgameImg'>
                                            <td><img src={boardgame.boardgameImgURL1} alt={boardgame.boardgameName} /></td>
                                        </tr>
                                        <tr className='ItemName'>
                                            <td><h3 className='boardgameNameh3'>{boardgame.boardgameName}</h3></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        ))
                    ) : (
                        <p>No board games available</p>
                    )}
                </div>
                <div className='pagingBtnDiv' style={{ listStyleType: "none", display: "flex" }}>
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
                            >
                                {num}
                            </button>
                        </li>
                    ))}
                    <button 
                        className="pagingBtn"
                        onClick={() => setCurrentPage(currentPage + 1)} 
                        disabled={currentPage === pageInfo.pageEnd || pageInfo.total === 0}
                    >
                        &gt;
                    </button>
                </div>
            </>
            )}
        </div>
    );
}

export default BoardGame;
