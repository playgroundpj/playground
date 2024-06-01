import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { decodeJwt } from '../../utils/tokenUtils'; 

function Boardgame() {
    const [boardgames, setBoardgames] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // 보드게임 목록 불러오기
        axios.get('http://localhost:8080/api/v1/boardgames')
            .then(response => {
                setBoardgames(response.data);
            })
            .catch(error => {
                console.error("보드게임 목록을 가져오는 중 오류가 발생했습니다!", error);
            });

        // 관리자인지 체크
        const token = window.localStorage.getItem('accessToken');
        if (token) {
            const decoded = decodeJwt(token);
            if (decoded.auth && (decoded.auth.includes('ROLE_ADMIN') || decoded.auth.includes('ROLE_MANAGER'))) {
                setIsAdmin(true);
            }
        }
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
        navigate('/register-game');
    };

    const handleGameClick = (id) => {
        navigate(`/boardgame/${id}`);
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
                    <div 
                        key={game.boardgameCode} 
                        style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', width: '200px', cursor: 'pointer' }}
                        onClick={() => handleGameClick(game.boardgameCode)}
                    >
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
