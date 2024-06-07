import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { decodeJwt } from '../../utils/tokenUtils'; 
import { callGetMenuListAPI } from '../../apis/MenuAPICalls';

function Menu() {

    const menu = useSelector(state => state.menuReducer) || [];
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLogin = window.localStorage.getItem('accessToken');    // Local Storage 에 token 정보 확인
    const token = decodeJwt(window.localStorage.getItem("accessToken")); 
    const [loading, setLoading] = useState(true);
    const menuList = menu.data;
    const pageInfo = menu.pageInfo;
    
    const [currentPage, setCurrentPage] = useState(1);

    const pageNumber = [];
    if(pageInfo){
        for(let i = 1; i <= pageInfo.pageEnd ; i++){
            pageNumber.push(i);
        }
    }    


    useEffect(
        ()=>{
            dispatch(callGetMenuListAPI({
                currentPage: currentPage
            })).finally(()=> { setLoading(false)});
        },[currentPage]
    )

    useEffect(
        ()=>{
            if(menuList){
                console.log('menuList : ', menuList);
            }
        },[menuList]
    )


    const onClickMenuHandler = (menuCode) => {
        navigate(`/menu/menuDetails/${menuCode}`);
    }

    
    const onClickResgisterHandler = () => {
        navigate(`/menu/regist`);
    }

    return (
        <div className='listDiv'> 
            {loading ? ( // 로딩 중일 때 표시할 내용
                    <p>Loading...</p>
                ) : (
            <>
                <h2>전체 메뉴 목록</h2>
                { (token !== null) ? ((token.auth[0] == 'ROLE_ADMIN') && <button className='mangerRegisterBtn' onClick={ onClickResgisterHandler }>메뉴 등록</button>) : null}
                <div className='ListBox'>
                    {menuList.map(menu => (
                        <div
                            key={menu.menuCode}
                            onClick = {()=> { onClickMenuHandler(menu.menuCode) }}
                            className='TotalItem'
                        >
                            <table>
                                <tbody>
                                    <tr className='menuImg'>
                                        <td><img src={menu.menuImg}></img></td>
                                    </tr>
                                    <tr className='ItemName'>
                                        <td><h3 className='menuNameh3'>{menu.menuName}</h3></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    ))
                    }
                </div>
                <div className='pagingBtnDiv' style={{ listStyleType: "none", display: "flex" }}>
                { Array.isArray(menuList) &&
                <button 
                    onClick={() => setCurrentPage(currentPage - 1)} 
                    disabled={currentPage === 1}
                    className='pagingBtn'
                >
                    &lt;
                </button>
                }
                {pageNumber.map((num) => (
                <li key={num} onClick={() => setCurrentPage(num)}>
                    <button
                        style={ currentPage === num ? {backgroundColor : '#97A482', color : '#ecebe8' } : null}
                        className='pagingBtn'
                    >
                        {num}
                    </button>
                </li>
                ))}
                { Array.isArray(menuList) &&
                <button 
                    className="pagingBtn"
                    onClick={() => setCurrentPage(currentPage + 1)} 
                    disabled={currentPage === pageInfo.pageEnd  || pageInfo.total == 0}
                >
                    &gt;
                </button>
                }
            </div>
            </>
            )}
        </div>
    );
}

export default Menu;
