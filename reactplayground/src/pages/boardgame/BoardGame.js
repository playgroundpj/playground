import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Boardgame() {
    const [boardgames, setBoardgames] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        // 관리자인지 체크하는 부분은 일단 제외하고 보드게임 불러오기 테스트
        axios.get('http://localhost:8080/api/v1/boardgames')
            .then(response => {
                setBoardgames(response.data);
            })
            .catch(error => {
                console.error("보드게임 목록을 가져오는 중 오류가 발생했습니다!", error);
            });
    }, []);

    const handleAllGamesClick = () => {
        axios.get('http://localhost:8080/api/v1/boardgames')
            .then(response => {
                setBoardgames(response.data);
            })
            .catch(error => {
                console.error("보드게임 목록을 가져오는 중 오류가 발생했습니다!", error);
            });
    };

    const handleSearchClick = () => {
        axios.get(`http://localhost:8080/api/v1/boardgames/search?name=${searchQuery}`)
            .then(response => {
                setBoardgames(response.data);
            })
            .catch(error => {
                console.error("보드게임 검색 중 오류가 발생했습니다!", error);
            });
    };

    const handleRegisterClick = () => {
        window.location.href = '/register-game';
    };

    return (
        <>
            <h2>인기게임 Top10</h2>
            <div>
                <button onClick={handleAllGamesClick}>전체 게임</button>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="게임 이름"
                />
                <button onClick={handleSearchClick}>게임 검색</button>
                {isAdmin && <button onClick={handleRegisterClick}>게임 등록</button>}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {boardgames.map(game => (
                    <div key={game.boardgameCode} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', width: '200px' }}>
                        <img src={`http://localhost:8080/api/v1/boardgames/images/${game.boardgameCode}`} alt={game.boardgameName} style={{ width: '100%' }} />
                        <h3>{game.boardgameName}</h3>
                        <p>{game.description}</p>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Boardgame;
