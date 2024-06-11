import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { callRegistBoardgameAPI } from '../../apis/BoardgameAPICalls';
import { decodeJwt } from '../../utils/tokenUtils';

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
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isAdminOrManager, setIsAdminOrManager] = useState(false);

    useEffect(() => {
        const token = window.localStorage.getItem('accessToken');
        if (token) {
            const decoded = decodeJwt(token);
            if (decoded.auth && (decoded.auth.includes('ROLE_ADMIN') || decoded.auth.includes('ROLE_MANAGER'))) {
                setIsAdminOrManager(true);
            } else {
                alert('접근 권한이 없습니다.');
                navigate('/');
            }
        } else {
            alert('로그인이 필요합니다.');
            navigate('/login');
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBoardgame({
            ...boardgame,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(callRegistBoardgameAPI({ form: boardgame }))
            .then(() => {
                Swal.fire('성공', '보드게임이 성공적으로 등록되었습니다.', 'success')
                    .then(() => navigate('/boardgames'));
            })
            .catch(error => {
                console.error('Failed to register boardgame:', error);
                Swal.fire('오류', '보드게임 등록에 실패했습니다.', 'error');
            });
    };

    if (!isAdminOrManager) {
        return <div>접근 권한이 없습니다.</div>;
    }

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
                                    <td><label>게임설명</label></td>
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
                                    <td><label>난이도</label></td>
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
                                    <td><label>게임 규칙</label></td>
                                    <td>
                                        <input 
                                            type="text" 
                                            name="boardgameRule" 
                                            placeholder="게임 규칙" 
                                            value={boardgame.boardgameRule} 
                                            onChange={handleChange} required 
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td><label>플레이타임</label></td>
                                    <td>
                                        <input 
                                            type="number" 
                                            name="playtime" 
                                            placeholder="플레이타임(분)" 
                                            value={boardgame.playtime} 
                                            onChange={handleChange} required 
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td><label>이미지 URL</label></td>
                                    <td>
                                        <input 
                                            type="text" 
                                            name="imageUrl" 
                                            placeholder="이미지 URL" 
                                            value={boardgame.imageUrl} 
                                            onChange={handleChange} 
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={3}>
                                        <div className='bottomBtn'>
                                            <button className='registerBtn' type="submit">
                                                게임 등록
                                            </button>
                                            <button className='backBtn' type="button" onClick={() => navigate(-1)}>
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
