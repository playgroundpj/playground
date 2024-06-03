import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom';
import { decodeJwt } from '../../utils/tokenUtils';

function DeleteMenu() {
    const [menuId, setMenuId] = useState('');
    const [isAdminOrManager, setIsAdminOrManager] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = window.localStorage.getItem('accessToken');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
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
        setMenuId(e.target.value);
    };

    const handleDelete = (e) => {
        e.preventDefault();
        axios.delete(`http://localhost:8080/api/v1/menus/${menuId}`)
            .then(response => {
                alert('메뉴가 성공적으로 삭제되었습니다!');
                navigate('/menu'); // 메뉴 목록 페이지로 이동
            })
            .catch(error => {
                console.error("메뉴 삭제 중 오류가 발생했습니다!", error);
            });
    };

    if (!isAdminOrManager) {
        return <div>접근 권한이 없습니다.</div>;
    }

    return (
        <div>
            <div className='deleteCSS'>
                <NavLink to='/'>
                    <span>
                        <img src='../../../images/common/logo-playground.png' alt="Playground Logo"/>
                    </span>
                </NavLink>
                <h2>메뉴 삭제</h2>
                <h4>매장 관리자님, 삭제할 메뉴 ID를 입력해주세요</h4>
                <hr></hr>
                <div className='formTotal'>
                    <form onSubmit={handleDelete}>
                        <table>
                            <colgroup>
                                <col style={{width:'15%'}}></col>
                                <col style={{width:'65%'}}></col>
                                <col style={{width:'20%'}}></col>
                            </colgroup>
                            <tbody>
                                <tr>
                                    <td><label>메뉴 ID</label></td>
                                    <td>
                                        <input 
                                            type="number" 
                                            name="menuId" 
                                            placeholder="메뉴 ID" 
                                            value={menuId} 
                                            onChange={handleChange} 
                                            required 
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={3}>
                                        <div className='bottomBtn'>
                                            <button type="submit" className='deleteBtn'>
                                                삭제
                                            </button>
                                            <button type="button" className='backBtn' onClick={() => navigate('/menu')}>
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

export default DeleteMenu;
