import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { decodeJwt } from '../../utils/tokenUtils';
import { callRegisterMenuAPI } from '../../apis/MenuAPICalls';

function RegisterMenu() {
    const [menu, setMenu] = useState({
        menuName: '',
        category: '음료',
        menuContent: '',
        menuPrice: '',
        orderableStatus: true,
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = decodeJwt(window.localStorage.getItem("accessToken"));
    
    useEffect(() => {
        if (!token || !(token.auth.includes('ROLE_ADMIN') || token.auth.includes('ROLE_MANAGER'))) {
            alert('접근 권한이 없습니다.');
            navigate('/');
        }
    }, [token, navigate]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setMenu((prevMenu) => ({
            ...prevMenu,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(callRegisterMenuAPI({ form: menu }));
        alert('메뉴가 성공적으로 등록되었습니다!');
        navigate('/menu');
    };

    return (
        <div>
            <div className='registerCSS'>
                <h2>메뉴 등록</h2>
                <h4>매장 관리자님, 등록할 메뉴를 입력해주세요</h4>
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
                                    <td><label>메뉴 이름</label></td>
                                    <td>
                                        <input 
                                            type="text" 
                                            name="menuName" 
                                            placeholder="메뉴 이름" 
                                            value={menu.menuName} 
                                            onChange={handleChange} 
                                            required 
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td><label>카테고리</label></td>
                                    <td>
                                        <select 
                                            name="category" 
                                            value={menu.category} 
                                            onChange={handleChange} 
                                            required
                                        >
                                            <option value="음료">음료</option>
                                            <option value="음식">음식</option>
                                            <option value="간식">간식</option>
                                            <option value="디저트">디저트</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td><label>내용</label></td>
                                    <td>
                                        <input 
                                            type="text" 
                                            name="menuContent" 
                                            placeholder="내용" 
                                            value={menu.menuContent} 
                                            onChange={handleChange} 
                                            required 
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td><label>가격</label></td>
                                    <td>
                                        <input 
                                            type="number" 
                                            name="menuPrice" 
                                            placeholder="가격" 
                                            value={menu.menuPrice} 
                                            onChange={handleChange} 
                                            required 
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td><label>주문 가능 상태</label></td>
                                    <td>
                                        <input 
                                            type="checkbox" 
                                            name="orderableStatus" 
                                            checked={menu.orderableStatus} 
                                            onChange={handleChange} 
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={3}>
                                        <div className='bottomBtn'>
                                            <button type="submit" className='registerBtn'>
                                                등록
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

export default RegisterMenu;
