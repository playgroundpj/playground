import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { callAddBoardGameAPI, callUpdateBoardGameAPI, callGetBoardGameAPI } from '../../apis/BoardGameAPICalls';

function BoardGameForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const boardGame = useSelector(state => state.boardGameReducer.boardGame);
    const [form, setForm] = useState({
        boardgameName: '',
        description: '',
        difficulty: '',
        releaseDate: '',
        minPlayer: '',
        maxPlayer: '',
        playtime: '',
        boardgameRule: '',
    });

    useEffect(() => {
        if (id) {
            dispatch(callGetBoardGameAPI(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (boardGame) {
            setForm(boardGame);
        }
    }, [boardGame]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            dispatch(callUpdateBoardGameAPI(id, form));
        } else {
            dispatch(callAddBoardGameAPI(form));
        }
        navigate('/boardgame');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="boardgameName" value={form.boardgameName} onChange={handleChange} placeholder="게임 이름" />
            <input type="text" name="description" value={form.description} onChange={handleChange} placeholder="게임 설명" />
            <input type="text" name="difficulty" value={form.difficulty} onChange={handleChange} placeholder="난이도" />
            <input type="date" name="releaseDate" value={form.releaseDate} onChange={handleChange} placeholder="출시일" />
            <input type="number" name="minPlayer" value={form.minPlayer} onChange={handleChange} placeholder="최소 인원" />
            <input type="number" name="maxPlayer" value={form.maxPlayer} onChange={handleChange} placeholder="최대 인원" />
            <input type="number" name="playtime" value={form.playtime} onChange={handleChange} placeholder="플레이 시간" />
            <input type="text" name="boardgameRule" value={form.boardgameRule} onChange={handleChange} placeholder="룰" />
            <button type="submit">저장</button>
        </form>
    );
}

export default BoardGameForm;
