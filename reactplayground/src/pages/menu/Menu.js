import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { decodeJwt } from '../../utils/tokenUtils';

function Menu() {
    const [menuItems, setMenuItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = window.localStorage.getItem('accessToken');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const decoded = decodeJwt(token);
            if (decoded.auth && (decoded.auth.includes('ROLE_ADMIN') || decoded.auth.includes('ROLE_MANAGER'))) {
                setIsAdmin(true);
            }
        }

        axios.get('http://localhost:8080/api/v1/menus')
            .then(response => {
                setMenuItems(response.data);
            })
            .catch(error => {
                console.error("메뉴 목록을 가져오는 중 오류가 발생했습니다!", error);
            });
    }, []);

    const handleAllMenusClick = () => {
        axios.get('http://localhost:8080/api/v1/menus')
            .then(response => {
                setMenuItems(response.data);
            })
            .catch(error => {
                console.error("메뉴 목록을 가져오는 중 오류가 발생했습니다!", error);
            });
    };

    const handleSearchClick = () => {
        axios.get(`http://localhost:8080/api/v1/menus/search?name=${searchQuery}`)
            .then(response => {
                setMenuItems(response.data);
            })
            .catch(error => {
                console.error("메뉴 검색 중 오류가 발생했습니다!", error);
            });
    };

    const handleRegisterClick = () => {
        navigate('/menu/register');
    };

    const handleOrderClick = (menu_code) => {
        axios.post('http://localhost:8080/api/v1/orders', { menu_code })
            .then(response => {
                alert('주문이 성공적으로 완료되었습니다!');
            })
            .catch(error => {
                console.error("주문 중 오류가 발생했습니다!", error);
            });
    };

    return (
        <>
            <h2>메뉴 목록</h2>
            <div>
                <button onClick={handleAllMenusClick}>전체 메뉴</button>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="메뉴 이름"
                />
                <button onClick={handleSearchClick}>메뉴 검색</button>
                {isAdmin && <button onClick={handleRegisterClick}>메뉴 등록</button>}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {menuItems.map(item => (
                    <div 
                        key={item.menuCode} 
                        style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', width: '200px', cursor: 'pointer' }}
                    >
                        <h3>{item.menuName}</h3>
                        <p>카테고리: {item.category}</p>
                        <p>설명: {item.menuContent}</p>
                        <p>가격: {item.menuPrice}원</p>
                        <p>주문 가능 상태: {item.orderableStatus ? '가능' : '불가능'}</p>
                        {item.orderableStatus && <button onClick={() => handleOrderClick(item.menuCode)}>주문</button>}
                    </div>
                ))}
            </div>
        </>
    );
}

export default Menu;
