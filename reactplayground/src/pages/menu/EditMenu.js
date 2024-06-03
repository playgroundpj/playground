import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, NavLink } from 'react-router-dom';
import { decodeJwt } from '../../utils/tokenUtils';

function EditMenu() {
    const [menu, setMenu] = useState({
        menuName: '',
        category: '음료', // 기본값을 '음료'로 설정
        menuContent: '',
        menuPrice: '',
        orderableStatus: true,
    });
    const [isAdminOrManager, setIsAdminOrManager] = useState(false);
    const { menuId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = window.localStorage.getItem('accessToken');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const decoded = decodeJwt(token);
            if (decoded.auth && (decoded.auth.includes('ROLE_ADMIN') || decoded.auth.includes('ROLE_MANAGER'))) {
                setIsAdminOrManager(true);
                fetchMenuDetails();
            } else {
                alert('접근 권한이 없습니다.');
                navigate('/');
            }
        } else {
            alert('로그인이 필요합니다.');
            navigate('/login');
        }
    }, [navigate, menuId]);

    const fetchMenuDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/menus/${menuId}`);
            setMenu(response.data);
        } catch (error) {
            console.error("메뉴 정보를 불러오는 중 오류가 발생했습니다!", error);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setMenu((prevMenu) => ({
            ...prevMenu,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedMenu = {
            ...menu,
            menuPrice: parseInt(menu.menuPrice),
        };

        axios.put(`http://localhost:8080/api/v1/menus/${menuId}`, updatedMenu)
            .then(response => {
                alert('메뉴가 성공적으로 수정되었습니다!');
                navigate('/menu'); // 메뉴 목록 페이지로 이동
            })
            .catch(error => {
                console.error("메뉴 수정 중 오류가 발생했습니다!", error);
            });
    };

    const handleDelete = () => {
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
            <div className='editCSS'>
                <NavLink to='/'>
                    <span>
                        <img src='../../../images/common/logo-playground.png' alt="Playground Logo"/>
                    </span>
                </NavLink>
                <h2>메뉴 수정</h2>
                <h4>매장 관리자님, 수정할 메뉴 정보를 입력해주세요</h4>
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
                                            onChange={handleChange} required 
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
                                            onChange={handleChange} required 
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
                                            onChange={handleChange} required 
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
                                        <span id="nameCaution" className='nameCaution'></span>                
                                        <span id="pwdCaution" className='pwdCaution'></span>
                                        <span id="nicknameCaution" className='nameCaution'></span>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={3}>
                                        <div className='bottomBtn'>
                                            <button type="submit" className='editBtn'>
                                                수정
                                            </button>
                                            <button type="button" className='deleteBtn' onClick={handleDelete}>
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

export default EditMenu;
