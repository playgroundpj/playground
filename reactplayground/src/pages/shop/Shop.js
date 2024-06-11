import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { decodeJwt } from '../../utils/tokenUtils'; 
import { callGetShopListAPI } from '../../apis/ShopAPICalls';

function Shop() {

    const shops = useSelector(state => state.shopReducer) || [];
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLogin = window.localStorage.getItem('accessToken');    // Local Storage 에 token 정보 확인
    const token = decodeJwt(window.localStorage.getItem("accessToken")); 
    const [loading, setLoading] = useState(true);

    const shopList = shops.data;

    const pageInfo = shops.pageInfo;
    
    const [currentPage, setCurrentPage] = useState(1);

    const pageNumber = [];
    if(pageInfo){
        for(let i = 1; i <= pageInfo.pageEnd ; i++){
            pageNumber.push(i);
        }
    }    


    useEffect(
        ()=>{
            dispatch(callGetShopListAPI({
                currentPage: currentPage
            })).finally(()=> setLoading(false));
        },[currentPage]
    )

    useEffect(
        ()=>{
            if(shopList){
                console.log('shopList : ', shopList);
            }
        },[shopList]
    )


    const onClickShopHandler = (shopCode) => {
        navigate(`/shop/shopDetails/${shopCode}`);
    }

    
    const onClickResgisterHandler = () => {
        navigate(`/shop/regist`);
    }

    return (
        <div className='listDiv'> 
            {loading ? ( // 로딩 중일 때 표시할 내용
                    <p>Loading...</p>
                ) : (
            <>
                <h2>전체 매장 목록</h2>
                { (token !== null) ? ((token.auth[0] == 'ROLE_ADMIN') && <button className='mangerRegisterBtn' onClick={ onClickResgisterHandler }>매장 등록</button>) : null}
                <div className='ListBox'>
                    {shopList.map(shop => (
                        <div
                            key={shop.storeCode}
                            onClick = {()=> { onClickShopHandler(shop.storeCode) }}
                            className='TotalItem'
                        >
                            <table>
                                <tbody>
                                    <tr className='ItemName'>
                                        <td colSpan={2}><h3>{shop.storeName}</h3></td>
                                    </tr>
                                    <tr>
                                        <td><span>지점주소</span>|</td>
                                        <td>{shop.storeLocation}</td>
                                    </tr>
                                    <tr>
                                        <td><span>영업시작</span>|</td>
                                        <td>{shop.openTime}</td>
                                    </tr>
                                    <tr>
                                        <td><span>영업마감</span>|</td>
                                        <td>{shop.closeTime}</td>
                                    </tr>
                                    <tr>
                                        <td><span>휴무일자</span>|</td>
                                        <td>{shop.closedDay}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    ))
                    }
                </div>
                <div className='pagingBtnDiv' style={{ listStyleType: "none", display: "flex" }}>
                { Array.isArray(shopList) &&
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
                { Array.isArray(shopList) &&
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

export default Shop;
