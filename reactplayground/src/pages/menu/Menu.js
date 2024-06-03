import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Menu() {
    const [menus, setMenus] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/menus')
            .then(response => {
                setMenus(response.data);
            })
            .catch(error => {
                console.error("메뉴 목록을 가져오는 중 오류가 발생했습니다!", error);
            });
    }, []);

    const handleSearchClick = () => {
        axios.get(`http://localhost:8080/api/v1/menus/search?name=${searchQuery}`)
            .then(response => {
                setMenus(response.data);
            })
            .catch(error => {
                console.error("메뉴 검색 중 오류가 발생했습니다!", error);
            });
    };

    return (
        <>
            <h2>메뉴 목록</h2>
            <div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="메뉴 이름"
                />
                <button onClick={handleSearchClick}>메뉴 검색</button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {menus.map(menu => (
                    <div key={menu.menu_code} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', width: '200px' }}>
                        <h3>{menu.menu_name}</h3>
                        <p>{menu.category}</p>
                        <p>{menu.menu_content}</p>
                        <p>{menu.menu_price} 원</p>
                        <p>주문 가능: {menu.orderable_status ? '예' : '아니오'}</p>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Menu;
