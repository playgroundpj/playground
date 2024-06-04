import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { decodeJwt } from '../../utils/tokenUtils';
import { callGetShopAPI } from '../../apis/ShopAPICalls';


function ShopDetail() {

    const { shopCode } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const shop = useSelector(state => state.shopReducer);  
    const token = decodeJwt(window.localStorage.getItem("accessToken")); 
    const isLogin = window.localStorage.getItem('accessToken');    // Local Storage 에 token 정보 확인
    const [isAuth, setAuth] = useState('');
    const shopDetail = shop.data;
    const storeCode = shopCode;

    const onClickBackHandler = () => {
        
        /* 돌아가기 클릭시 메인 페이지로 이동 */
        navigate(-1);
    }

    const onClickModifyHandler = (getStoreCode) => {
        navigate(`/shop/update/${getStoreCode}`);
    }
    
    useEffect(
        () => {

            dispatch(callGetShopAPI({storeCode}));

        },[]
    )

    useEffect(
        () => {
            if(isLogin !== undefined && isLogin !== null) {
                setAuth(token.auth[0]);
            }   

        },[token]
    )


    return (
        <div className='profileDiv'  >
            <h2>{shopDetail.storeName}  상세 정보</h2>
            <div className='formTotal'>
                <table>
                    <colgroup>
                        <col style={{width:'20%'}}></col>
                        <col style={{width:'80%'}}></col>
                    </colgroup>
                    <tbody>
                        <tr>
                            <td><span>지점주소</span>|</td>
                            <td>{shopDetail.storeLocation}</td>
                        </tr>
                        <tr>
                            <td><span>영업시작</span>|</td>
                            <td>{shopDetail.openTime}</td>
                        </tr>
                        <tr>
                            <td><span>영업마감</span>|</td>
                            <td>{shopDetail.closeTime}</td>
                        </tr>
                        <tr>
                            <td><span>휴무일자</span>|</td>
                            <td>{shopDetail.closedDay}</td>
                        </tr>
                        <tr>
                                <td colSpan={3}>
                                    <div className='bottomBtn'>
                                        {(isAuth == 'ROLE_ADMIN') && 
                                        <button className='registerBtn'
                                            onClick = { () => onClickModifyHandler(storeCode) }
                                        >   
                                            매장 정보 수정
                                        </button>
                                        }
                                        <button className='backBtn'
                                            onClick = { onClickBackHandler }
                                        >
                                            돌아가기
                                        </button>
                                    </div>
                                </td>
                            </tr>
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default ShopDetail;