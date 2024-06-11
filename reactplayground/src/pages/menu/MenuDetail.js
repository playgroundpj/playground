import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { decodeJwt } from '../../utils/tokenUtils';
<<<<<<< HEAD
import { callGetMenuAPI } from '../../apis/MenuAPICalls';
import { Carousel } from 'react-bootstrap';


function MenuDetail() {

=======
import { callGetMenuAPI, callDeleteMenuAPI } from '../../apis/MenuAPICalls';
import { Carousel } from 'react-bootstrap';
import Swal from "sweetalert2";

function MenuDetail() {
>>>>>>> boardgame/crud
    const { menuCode } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const menu = useSelector(state => state.menuReducer);  
    const token = decodeJwt(window.localStorage.getItem("accessToken")); 
<<<<<<< HEAD
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
=======
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
>>>>>>> boardgame/crud
                <table>
                    <colgroup>
                        <col style={{width:'50%'}}></col>
                        <col style={{width:'20%'}}></col>
                        <col style={{width:'30%'}}></col>
                    </colgroup>
                    <tbody>
                        <tr>
<<<<<<< HEAD
                            <td className='menuImg' rowSpan={11}> 
=======
                            <td className='menuImg' rowSpan={7}> 
>>>>>>> boardgame/crud
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
<<<<<<< HEAD
                        <tr></tr>
                        <tr></tr>
=======
>>>>>>> boardgame/crud
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
<<<<<<< HEAD
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
=======
                        <tr>
                                <td colSpan={3}>
                                    <div className='bottomBtn'>
                                        {canModifyOrDelete && 
                                        <>
                                            <button className='registerBtn' onClick={() => onClickModifyHandler(menuCode)}>   
                                                메뉴 정보 수정
                                            </button>
                                            <button className='deleteBtn' onClick={() => onClickDeleteHandler(menuCode)}>
                                                메뉴 삭제
                                            </button>
                                        </>
                                        }
                                        <button className='backBtn' onClick={onClickBackHandler}>
>>>>>>> boardgame/crud
                                            돌아가기
                                        </button>
                                    </div>
                                </td>
                            </tr>
                    </tbody>
                </table>
            </div>
<<<<<<< HEAD

=======
>>>>>>> boardgame/crud
        </div>
    );
}

<<<<<<< HEAD
export default MenuDetail;
=======
export default MenuDetail;
>>>>>>> boardgame/crud
