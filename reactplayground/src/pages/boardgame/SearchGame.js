import React, { useState } from 'react';
import axios from 'axios';

function SearchGame() {
    const [searchQuery, setSearchQuery] = useState('');
    const [boardgames, setBoardgames] = useState([]);

    const handleSearch = () => {
        axios.get(`/api/v1/boardgames/search?name=${searchQuery}`)
            .then(response => {
                setBoardgames(response.data);
            })
            .catch(error => {
                console.error("게임 검색 중 오류가 발생했습니다!", error);
            });
    };

    return (
        <div>
            <h2>게임 검색</h2>
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="게임 이름"
            />
            <button onClick={handleSearch}>검색</button>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {boardgames.map(game => (
                    <div key={game.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', width: '200px' }}>
                        <img src={game.imageUrl} alt={game.name} style={{ width: '100%' }} />
                        <h3>{game.name}</h3>
                        <p>{game.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchGame;
