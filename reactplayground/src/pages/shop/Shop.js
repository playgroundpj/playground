import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { decodeJwt } from '../../utils/tokenUtils'; 
import { callGetShopListAPI } from '../../apis/ShopAPICalls';

function Shop() {

    const shopList = useSelector(state => state.shopReducer.data) || [];
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    

    useEffect(
        ()=>{
            dispatch(callGetShopListAPI()).finally(()=> setLoading(false));
        },[]
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

    return (
        <div>
            {loading ? ( // 로딩 중일 때 표시할 내용
                    <p>Loading...</p>
                ) : (
            <>
                <h2>전체 매장 목록</h2>
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
            </>
            )}
        </div>
    );
}

export default Shop;
