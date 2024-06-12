import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { decodeJwt } from '../../utils/tokenUtils';
import { callGetShopAPI } from '../../apis/ShopAPICalls';
import { callGetStoreBoardGameListAPI, callGetStoreGameTableListAPI, callGetStoreMenuListAPI } from '../../apis/StoreAPICalls';


function ShopDetail() {

    const { shopCode } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const shop = useSelector(state => state.shopReducer);  
    const store = useSelector(state => state.storeReducer);  
    const token = decodeJwt(window.localStorage.getItem("accessToken")); 
    const isLogin = window.localStorage.getItem('accessToken');    // Local Storage 에 token 정보 확인
    const [isAuth, setAuth] = useState('');
    const [storeBoardgame, setStoreBoardgame] = useState([]);
    const [storeGameTable, setStoreGameTable] = useState([]);
    const [storeMenu, setStoreMenu] = useState([]);
    const shopDetail = shop.data;
    const storeCode = shopCode;
    const [loading, setLoading] = useState(true);


    const onClickBackHandler = () => {
        
        /* 돌아가기 클릭시 메인 페이지로 이동 */
        navigate(-1);
    }

    const onClickModifyHandler = (getStoreCode) => {
        navigate(`/shop/update/${getStoreCode}`);
    }

    const onClicReservationHandler = (getStoreCode) => {
        navigate(`/shop/reservation/${getStoreCode}`);
    }
    
    useEffect(
        () => {

            dispatch(callGetShopAPI({storeCode}));
            dispatch(callGetStoreBoardGameListAPI({storeCode}));
            dispatch(callGetStoreGameTableListAPI({storeCode}));
            dispatch(callGetStoreMenuListAPI({storeCode}));
        },[]
    )

    useEffect(
        () => {
            if(isLogin !== undefined && isLogin !== null) {
                setAuth(token.auth[0]);
            }   

        },[token]
    )

    useEffect(
        () => {
            if(store){
                if(Array.isArray(store)){
                    console.log("store : ", store);
                    if(store[0] != null && store[0] != undefined)
                    {
                        if(store[0].boardgameName){
                            console.log("store[0].board : ", store[0].boardgameName);
                            setStoreBoardgame(store);
                            console.log('storeBoardgame', storeBoardgame);
                        }else if(store[0].tableName){
                            console.log("store[0].tableName : ", store[0].tableName);
                            setStoreGameTable(store);
                            console.log('storeGameTable', storeGameTable);
                        }else if(store[0].menuName){
                            console.log("store[0].menuName : ", store[0].menuName);
                            setStoreMenu(store);
                            console.log('storeMenu', storeMenu);
                        }
                    }
                    
                }
            }
        }, [store]
    )

    useEffect(
        ()=> {
            if(shopDetail){
                if(store){
                    setLoading(false);
                }
            }
        },[store, shopDetail]
    )

    return (
        <div className='profileDiv'  >
            {loading ? ( // 로딩 중일 때 표시할 내용
                    <p>Loading...</p>
                ) : (
            <>
                <h2>{shopDetail.storeName}  상세 정보</h2>
                <div className='formTotal'>
                    <div className='ShopDetialForm'>
                        <table>
                            <colgroup>
                                <col style={{width:'20%'}}></col>
                                <col style={{width:'80%'}}></col>
                            </colgroup>
                            <tbody>
                                <tr>
                                    <td className='captionCSS'><span>지점주소</span>|</td>
                                    <td>{shopDetail.storeLocation}</td>
                                </tr>
                                <tr>
                                    <td className='captionCSS'><span>영업시작</span>|</td>
                                    <td>{shopDetail.openTime}</td>
                                </tr>
                                <tr>
                                    <td className='captionCSS'><span>영업마감</span>|</td>
                                    <td>{shopDetail.closeTime}</td>
                                </tr>
                                <tr>
                                    <td className='captionCSS'><span>휴무일자</span>|</td>
                                    <td>{shopDetail.closedDay}</td>
                                </tr>
                                <tr>
                                    <td className='captionCSS'><span>보유 보드게임</span>|</td>
                                    <td>
                                        <div>
                                            {storeBoardgame.map(boardgame =>(
                                                <span onClick={() => navigate(`/boardgame/boardgameDetails/${boardgame.boardgameCode}`) } >&lt;{boardgame.boardgameName}&gt;</span>
                                            ))}                                        
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='captionCSS'><span>보유 메뉴</span>|</td>
                                    <td>
                                        <div>
                                            {storeMenu.map(menu =>(
                                                <span onClick={() => navigate(`/menu/menuDetails/${menu.menuCode}`) } >&lt;{menu.menuName}&gt;</span>
                                            ))}                                        
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='bottomBtn ShopBottomBtn'>
                        {(isAuth == 'ROLE_ADMIN') && 
                        <button className='registerBtn'
                            onClick = { () => onClickModifyHandler(storeCode) }
                        >   
                            매장 정보 수정
                        </button>
                        }
                        {((isAuth == 'ROLE_USER')) && 
                        <button className='registerBtn'
                            onClick = { () => onClicReservationHandler(storeCode) }
                        >   
                            매장 예약
                        </button>
                        }
                        <button className='backBtn'
                            style={(isAuth === 'ROLE_USER')? {} : ((isAuth === 'ROLE_ADMIN') ? {} : {width: '100%', margin: '20px 0 0 0'})}
                            onClick = { onClickBackHandler }
                        >
                            돌아가기
                        </button>
                    </div>
                </div>
            </>
            )}
        </div>
    );
}

export default ShopDetail;