import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { callGetBoardGameAPI } from '../../apis/BoardGameAPICalls';

function BoardGameDetail() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const boardGame = useSelector(state => state.boardGameReducer.boardGame);

    useEffect(() => {
        dispatch(callGetBoardGameAPI(id));
    }, [dispatch, id]);

    if (!boardGame) {
        return <div>Loading...</div>;
    }

    const handleImageError = (e, gameCode) => {
        const newSrc = e.target.src.endsWith('.png') 
            ? `http://localhost:8080/api/v1/boardgames/images/${gameCode}.jpg` 
            : `http://localhost:8080/api/v1/boardgames/images/${gameCode}.png`;
        e.target.src = newSrc;
    };

    return (
        <div>
            <img 
                src={`http://localhost:8080/api/v1/boardgames/images/${boardGame.boardgameCode}.png`} 
                alt={boardGame.boardgameName} 
                style={{ width: '300px' }} 
                onError={(e) => handleImageError(e, boardGame.boardgameCode)}
            />
            <h2>{boardGame.boardgameName}</h2>
            <p>{boardGame.description}</p>
            <p>난이도: {boardGame.difficulty}</p>
            <p>출시일: {boardGame.releaseDate}</p>
            <p>최소 인원: {boardGame.minPlayer}</p>
            <p>최대 인원: {boardGame.maxPlayer}</p>
            <p>플레이 시간: {boardGame.playtime}분</p>
            <p>룰: {boardGame.boardgameRule}</p>
        </div>
    );
}

export default BoardGameDetail;
