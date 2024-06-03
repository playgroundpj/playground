import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { callGetBoardGamesAPI, callDeleteBoardGameAPI } from '../../apis/BoardGameAPICalls';

function BoardGameList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const boardGames = useSelector(state => state.boardGameReducer.boardGames);
    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;
    if (isLogin !== undefined && isLogin !== null) {
        decoded = jwtDecode(window.localStorage.getItem("accessToken"));
    }

    const [filteredGames, setFilteredGames] = useState([]);
    const [filters, setFilters] = useState({
        difficulty: '',
        minPlayer: '',
        maxPlayer: '',
        name: ''
    });

    useEffect(() => {
        dispatch(callGetBoardGamesAPI());
    }, [dispatch]);

    useEffect(() => {
        setFilteredGames(boardGames);
    }, [boardGames]);

    useEffect(() => {
        let filtered = boardGames;

        if (filters.difficulty) {
            filtered = filtered.filter(game => game.difficulty.includes(filters.difficulty));
        }
        if (filters.minPlayer) {
            filtered = filtered.filter(game => game.minPlayer >= parseInt(filters.minPlayer));
        }
        if (filters.maxPlayer) {
            filtered = filtered.filter(game => game.maxPlayer <= parseInt(filters.maxPlayer));
        }
        if (filters.name) {
            filtered = filtered.filter(game => game.boardgameName.toLowerCase().includes(filters.name.toLowerCase()));
        }

        setFilteredGames(filtered);
    }, [filters, boardGames]);

    if (!boardGames || boardGames.length === 0) {
        return <div>Loading...</div>;
    }

    const handleGameClick = (id) => {
        if (decoded && decoded.auth && decoded.auth.includes("ROLE_ADMIN")) {
            navigate(`/boardgame/edit/${id}`);
        } else {
            navigate(`/boardgame/${id}`);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value
        });
    };

    const handleImageError = (e, gameCode) => {
        const newSrc = e.target.src.endsWith('.png') 
            ? `http://localhost:8080/api/v1/boardgames/images/${gameCode}.jpg` 
            : `http://localhost:8080/api/v1/boardgames/images/${gameCode}.png`;
        e.target.src = newSrc;
    };

    const handleAddGameClick = () => {
        navigate('/boardgame/add');
    };

    const handleEditGameClick = () => {
        alert("수정할 게임을 클릭하세요.");
    };

    const handleDeleteGameClick = (id) => {
        if (window.confirm("정말로 이 게임을 삭제하시겠습니까?")) {
            dispatch(callDeleteBoardGameAPI(id));
        }
    };

    return (
        <div>
            {decoded && decoded.auth && decoded.auth.includes("ROLE_ADMIN") && (
                <div>
                    <button onClick={handleAddGameClick}>게임 등록하기</button>
                    <button onClick={handleEditGameClick}>게임 수정하기</button>
                </div>
            )}
            <div>
                <div>
                    <label>난이도:</label>
                    <label>
                        <input type="radio" name="difficulty" value="쉬움" onChange={handleFilterChange} />
                        쉬움
                    </label>
                    <label>
                        <input type="radio" name="difficulty" value="중간" onChange={handleFilterChange} />
                        중간
                    </label>
                    <label>
                        <input type="radio" name="difficulty" value="어려움" onChange={handleFilterChange} />
                        어려움
                    </label>
                </div>
                <div>
                    <label>최소 인원:</label>
                    <label>
                        <input type="radio" name="minPlayer" value="1" onChange={handleFilterChange} />
                        1
                    </label>
                    <label>
                        <input type="radio" name="minPlayer" value="2" onChange={handleFilterChange} />
                        2
                    </label>
                    <label>
                        <input type="radio" name="minPlayer" value="3" onChange={handleFilterChange} />
                        3
                    </label>
                </div>
                <div>
                    <label>최대 인원:</label>
                    <label>
                        <input type="radio" name="maxPlayer" value="4" onChange={handleFilterChange} />
                        4
                    </label>
                    <label>
                        <input type="radio" name="maxPlayer" value="5" onChange={handleFilterChange} />
                        5
                    </label>
                    <label>
                        <input type="radio" name="maxPlayer" value="6" onChange={handleFilterChange} />
                        6
                    </label>
                </div>
                <div>
                    <label>게임 이름:</label>
                    <input type="text" name="name" value={filters.name} onChange={handleFilterChange} />
                </div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {filteredGames.map(game => (
                    <div 
                        key={game.boardgameCode} 
                        style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', width: '200px', cursor: 'pointer' }}
                        onClick={() => handleGameClick(game.boardgameCode)}
                    >
                        <img 
                            src={`http://localhost:8080/api/v1/boardgames/images/${game.boardgameCode}.png`} 
                            alt={game.boardgameName} 
                            style={{ width: '100%' }} 
                            onError={(e) => handleImageError(e, game.boardgameCode)}
                        />
                        <h3>{game.boardgameName}</h3>
                        <p>{game.description}</p>
                        {decoded && decoded.auth && decoded.auth.includes("ROLE_ADMIN") && (
                            <button onClick={() => handleDeleteGameClick(game.boardgameCode)}>게임 삭제하기</button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BoardGameList;
