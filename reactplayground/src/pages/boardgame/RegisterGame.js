import React, { useState } from 'react';
import axios from 'axios';

function RegisterGame() {
    const [boardgame, setBoardgame] = useState({
        name: '',
        description: '',
        difficulty: '',
        releaseDate: '',
        minPlayer: '',
        maxPlayer: '',
        playtime: '',
        rule: '',
        imageUrl: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBoardgame({
            ...boardgame,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/v1/boardgames', boardgame)
            .then(response => {
                alert('게임 등록이 완료되었습니다.');
                window.location.href = '/boardgame';  // 수정: 경로 수정
            })
            .catch(error => {
                console.error("게임 등록 중 오류가 발생했습니다!", error);
            });
    };

    return (
        <div>
            <h2>게임 등록</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="게임 이름" value={boardgame.name} onChange={handleChange} required />
                <input type="text" name="description" placeholder="게임 설명" value={boardgame.description} onChange={handleChange} required />
                <input type="text" name="difficulty" placeholder="난이도" value={boardgame.difficulty} onChange={handleChange} required />
                <input type="date" name="releaseDate" placeholder="출시일" value={boardgame.releaseDate} onChange={handleChange} required />
                <input type="number" name="minPlayer" placeholder="최소 인원" value={boardgame.minPlayer} onChange={handleChange} required />
                <input type="number" name="maxPlayer" placeholder="최대 인원" value={boardgame.maxPlayer} onChange={handleChange} required />
                <input type="number" name="playtime" placeholder="플레이 시간" value={boardgame.playtime} onChange={handleChange} required />
                <textarea name="rule" placeholder="게임 규칙" value={boardgame.rule} onChange={handleChange} required></textarea>
                <input type="text" name="imageUrl" placeholder="이미지 URL" value={boardgame.imageUrl} onChange={handleChange} required />
                <button type="submit">등록</button>
            </form>
        </div>
    );
}

export default RegisterGame;
