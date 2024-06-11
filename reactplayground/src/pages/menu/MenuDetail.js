import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { decodeJwt } from '../../utils/tokenUtils';
import { callGetMenuAPI } from '../../apis/MenuAPICalls';
import { Carousel } from 'react-bootstrap';


function MenuDetail() {

    const { menuCode } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const menu = useSelector(state => state.menuReducer);  
    const token = decodeJwt(window.localStorage.getItem("accessToken")); 
    const isLogin = window.localStorage.getItem('accessToken');    // Local Storage 에 token 정보 확인
    const [isAuth, setAuth] = useState('');
    const menuDetail = menu.data;
    const getMenuCode = menuCode;

    const onClickBackHandler = () => {
        
        /* 돌아가기 클릭시 메인 페이지로 이동 */
        navigate(-1);
    }

    const onClickModifyHandler = (getMenuCode) => {
        navigate(`/menu/update/${getMenuCode}`);
    }

    const onClicReservationHandler = (getMenuCode) => {
        navigate(`/menu/reservation/${getMenuCode}`);
    }
    
    useEffect(
        () => {

            dispatch(callGetMenuAPI({menuCode}));

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
            <h2> 상세 정보 - {menuDetail.menuName}</h2>
            <div className='formTotal MenuDetialForm'>
                <table>
                    <colgroup>
                        <col style={{width:'50%'}}></col>
                        <col style={{width:'20%'}}></col>
                        <col style={{width:'30%'}}></col>
                    </colgroup>
                    <tbody>
                        <tr>
                            <td className='menuImg' rowSpan={11}> 
                                <Carousel>
                                    <Carousel.Item>
                                    <img
                                        className="d-block w-100 custom-img"
                                        src={menuDetail.menuImg}
                                        alt="First slide"
                                    />
                                    </Carousel.Item>
                                    <Carousel.Item>
                                    <img
                                        className="d-block w-100 custom-img"
                                        src={menuDetail.menuImg}
                                        alt="Second slide"
                                    />
                                    </Carousel.Item>
                                    <Carousel.Item>
                                    <img
                                        className="d-block w-100 custom-img"
                                        src={menuDetail.menuImg}
                                        alt="Third slide"
                                    />
                                    </Carousel.Item>
                                </Carousel>
                            </td>
                        </tr>
                        <tr></tr>
                        <tr></tr>
                        <tr></tr>
                        <tr>
                            <td className='captionCSS'><span>카테고리</span>|</td>
                            <td>{menuDetail.category}</td>
                        </tr>
                        <tr>
                            <td className='captionCSS'><span>메뉴가격</span>|</td>
                            <td>{menuDetail.menuPrice}원</td>
                        </tr>
                        <tr>
                            <td className='captionCSS'><span>주문가능여부</span>|</td>
                            <td>{(menuDetail.orderableStatus) ? "가능" : "매진" }</td>
                        </tr>
                        <tr>
                            <td className='captionCSS'><span>메뉴설명</span>|</td>
                            <td>{menuDetail.menuContent}</td>
                        </tr>
                        <tr></tr>
                        <tr></tr>
                        <tr></tr>
                        <tr>
                                <td colSpan={3}>
                                    <div className='bottomBtn'>
                                        {(isAuth == 'ROLE_ADMIN') && 
                                        <button className='registerBtn'
                                            onClick = { () => onClickModifyHandler(menuCode) }
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

export default MenuDetail;