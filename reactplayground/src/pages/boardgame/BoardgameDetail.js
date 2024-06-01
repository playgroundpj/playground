import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function BoardgameDetail() {
    const { id } = useParams();
    const [boardgame, setBoardgame] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/v1/boardgames/${id}`)
        .then(response => {
            setBoardgame(response.data);
        })
        .catch(error => {
            console.error("보드게임 정보를 가져오는 중 오류가 발생했습니다!", error);
        });
    }, [id]);

    if (!boardgame) {
        return <div>로딩 중...</div>;
    }

    return (
        <div>
        <h2>{boardgame.boardgameName}</h2>
        <p>{boardgame.description}</p>
        <p>난이도: {boardgame.difficulty}</p>
        <p>출시일: {boardgame.releaseDate}</p>
        <p>최소 인원: {boardgame.minPlayer}</p>
        <p>최대 인원: {boardgame.maxPlayer}</p>
        <p>플레이 시간: {boardgame.playtime}분</p>
        <p>룰: {boardgame.boardgameRule}</p>
        </div>
    );
    }

export default BoardgameDetail;
