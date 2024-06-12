import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { decodeJwt } from '../../utils/tokenUtils';
import { callGetMenuAPI, callDeleteMenuAPI } from '../../apis/MenuAPICalls';
import { Carousel } from 'react-bootstrap';
import Swal from "sweetalert2";

function MenuDetail() {
    const { menuCode } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const menu = useSelector(state => state.menuReducer);  
    const token = decodeJwt(window.localStorage.getItem("accessToken")); 
    const isLogin = window.localStorage.getItem('accessToken');    
    const [isAuth, setAuth] = useState('');
    const menuDetail = menu.data;
    
    const onClickBackHandler = () => {
        navigate(-1);
    }

    const onClickModifyHandler = (menuCode) => {
        navigate(`/menu/update/${menuCode}`);
    }

    const onClickDeleteHandler = (menuCode) => {
        Swal.fire({
            title: '삭제하시겠습니까?',
            text: "삭제 후에는 복구가 불가능합니다.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '삭제'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(callDeleteMenuAPI({ menuCode }));
                Swal.fire(
                    '삭제되었습니다!',
                    '메뉴가 삭제되었습니다.',
                    'success'
                ).then(() => {
                    navigate('/menu');
                });
            }
        })
    }
    
    useEffect(() => {
        dispatch(callGetMenuAPI({menuCode}));
    }, [dispatch, menuCode]);

    useEffect(() => {
        if(isLogin !== undefined && isLogin !== null) {
            setAuth(token.auth[0]);
        }   
    }, [token, isLogin]);

    const canModifyOrDelete = token && token.auth && (token.auth.includes('ROLE_ADMIN') || token.auth.includes('ROLE_MANAGER'));

    return (
        <div className='profileDiv'>
            <h2> 상세 정보 - {menuDetail.menuName}</h2>
            <div className='formTotal MenuDetailForm'>
                <table>
                    <colgroup>
                        <col style={{width:'50%'}}></col>
                        <col style={{width:'20%'}}></col>
                        <col style={{width:'30%'}}></col>
                    </colgroup>
                    <tbody>
                        <tr>
                            <td className='menuImg' rowSpan={7}> 
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
                        <tr>
                                <td colSpan={3}>
                                    <div className='bottomBtn'>
                                        {canModifyOrDelete && 
                                            <button className='registerBtn' onClick={() => onClickModifyHandler(menuCode)}>   
                                                메뉴 정보 수정
                                            </button>
                                        }
                                        <button className='backBtn' onClick={onClickBackHandler}>
                                            돌아가기
                                        </button>
                                        {canModifyOrDelete && 
                                            <button className='deleteBtn' onClick={() => onClickDeleteHandler(menuCode)}>
                                                메뉴 삭제
                                            </button>
                                        }
                                        
    
                                        
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
