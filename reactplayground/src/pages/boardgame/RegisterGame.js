import React, { useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

function RegisterGame() {
    const [boardgame, setBoardgame] = useState({
        boardgameName: '',
        description: '',
        difficulty: '',
        releaseDate: '',
        minPlayer: '',
        maxPlayer: '',
        playtime: '',
        boardgameRule: '',
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
        console.log(boardgame);
        axios.post('http://localhost:8080/api/v1/boardgames', boardgame)
            .then(response => {
                alert('게임 등록이 완료되었습니다.');
                window.location.href = '/boardgame';
            })
            .catch(error => {
                console.error("게임 등록 중 오류가 발생했습니다!", error);
            });
    };

    const onClickRegisterHandler = (e) => {
        e.preventDefault();
        handleSubmit(e);
    };

    const onClickBackHandler = (e) => {
        e.preventDefault();
        window.history.back();
    };

    return (
        <div>
            <div className='registerCSS'>
                <NavLink to='/'>
                    <span>
                        <img src='../../../images/common/logo-playground.png' alt="Playground Logo"/>
                    </span>
                </NavLink>
                <h2>게임등록</h2>
                <h4>매장 관리자님, 등록할 게임을 입력해주세요</h4>   
                <hr></hr>
                <div className='formTotal'>
                    <form onSubmit={handleSubmit}>
                        <table>
                            <colgroup>
                                <col style={{width:'15%'}}></col>
                                <col style={{width:'65%'}}></col>
                                <col style={{width:'20%'}}></col>
                            </colgroup>
                            <tbody>
                                <tr>
                                    <td><label>게임이름</label></td>
                                    <td>
                                        <input 
                                            type="text" 
                                            name="boardgameName" 
                                            placeholder="게임 이름" 
                                            value={boardgame.boardgameName} 
                                            onChange={handleChange} required 
                                        />
                                    </td>
                                </tr>
                
                                <tr>
                                    <td><label>게임설명 </label></td>
                                    <td>
                                        <input 
                                            type="text" 
                                            name="description" 
                                            placeholder="게임 설명" 
                                            value={boardgame.description} 
                                            onChange={handleChange} required 
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td><label>난이도 </label></td>
                                    <td>
                                        <input 
                                            type="text" 
                                            name="difficulty" 
                                            placeholder="난이도" 
                                            value={boardgame.difficulty} 
                                            onChange={handleChange} required 
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td><label>출시일</label></td>
                                    <td>
                                        <input 
                                            type="date" 
                                            name="releaseDate" 
                                            placeholder="출시일" 
                                            value={boardgame.releaseDate} 
                                            onChange={handleChange} required 
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td><label>최소 인원</label></td>
                                    <td>
                                        <input 
                                            type="number" 
                                            name="minPlayer" 
                                            placeholder="최소 인원" 
                                            value={boardgame.minPlayer} 
                                            onChange={handleChange} required 
                                        />
                                    </td>
                                </tr>
                                
                                <tr>
                                    <td><label>최대 인원</label></td>
                                    <td>
                                        <input 
                                            type="number" 
                                            name="maxPlayer" 
                                            placeholder="최대 인원" 
                                            value={boardgame.maxPlayer} 
                                            onChange={handleChange} required 
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td><label>플레이 시간</label></td>
                                    <td>
                                    <input 
                                        type="number" 
                                        name="playtime" 
                                        placeholder="플레이 시간" 
                                        value={boardgame.playtime} 
                                        onChange={handleChange} required 
                                    /> 
                                    </td>
                                </tr>
                                <tr>
                                    <td><label>이미지 첨부</label></td>
                                    <td>
                                        <input 
                                            type="file" 
                                            name="imageUrl" 
                                            placeholder="이미지 URL" 
                                            onChange={handleChange} required 
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={3}>
                                        <span id="nameCaution" className='nameCaution'></span>                
                                        <span id="pwdCaution" className='pwdCaution'></span>
                                        <span id="nicknameCaution" className='nameCaution'></span>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={3}>
                                        <div className='bottomBtn'>
                                            <button className='registerBtn'
                                                onClick={onClickRegisterHandler}
                                            >   
                                                등록
                                            </button>
                                            <button className='backBtn'
                                                onClick={onClickBackHandler}
                                            >
                                                돌아가기
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegisterGame;
