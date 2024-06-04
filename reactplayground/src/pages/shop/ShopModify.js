import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import { decodeJwt } from '../../utils/tokenUtils';
import { FaCircleCheck } from "react-icons/fa6";
import Swal from "sweetalert2";
import { callGetShopByStoreNameAPI, callRegistShopAPI } from '../../apis/ShopAPICalls';



function ShopModify() {

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const isLogin = window.localStorage.getItem('accessToken');    // Local Storage 에 token 정보 확인
    const token = decodeJwt(window.localStorage.getItem("accessToken")); 
    const shop = useSelector(state => state.shopReducer);
    const [isShopNameChecked, setShopNameChecked] = useState(false);
    const [form, setForm] = useState({
        storeCode: '',
        storeName: '',
        storeLocation: '',
        openTime: '10:00',
        closeTime: '22:00',
        closedDay: '연중무휴'
    })

    useEffect(
        () => {
            // 관리자가 아니면 못 들어오게 막음
            if(isLogin !== undefined && isLogin !== null) {
                if(token.auth[0] !== 'ROLE_ADMIN'){
                    navigate("/shop");
                }
            }else{
                navigate("/shop");
            }        

        },[token]
    )

    useEffect(
        ()=>{
            if(shop){
                console.log("shop : ", shop);
            }

            if(shop.data === '사용 가능한 매장명입니다'){
                setShopNameChecked(true);
            }

        },[shop]
    )

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

        console.log('form : ',form);
    };    


    const onClickBackHandler = () => {

        /* 돌아가기 클릭시 메인 페이지로 이동 */
        navigate(-1, { replace: true })
    }

    const onClickRegisterHandler = () => {
        if(!isShopNameChecked){
            Swal.fire({
                icon: "warning",
                title: `매장명 중복체크를 해주세요`,
                showConfirmButton: true,
                confirmButtonColor: "#97A482",
                customClass: {
                    title: 'swal2-title'
                }
            }).then(() => {
                setShopNameChecked(false);
            })
        }else if(form.storeLocation.trim() == ''){
            Swal.fire({
                icon: "warning",
                title: `매장 주소 입력은 필수입니다.`,
                showConfirmButton: true,
                confirmButtonColor: "#97A482",
                customClass: {
                    title: 'swal2-title'
                }
            });
        }else{
            dispatch(callRegistShopAPI({
                form: form
            }));
            Swal.fire({
                icon: "sucess",
                title: `매장 등록이 완료되었습니다`,
                showConfirmButton: true,
                confirmButtonColor: "#97A482",
                customClass: {
                    title: 'swal2-title'
                }
            })
            navigate("/shop");
        }
        
    }

    const onClickDuplicateStoreNameHandler = () => {

        dispatch(callGetShopByStoreNameAPI({storeName: form.storeName}));


    }


    

    
    return (
        <div>
            <div className='registerCSS'>
                <h2>매장 등록</h2>
                <hr></hr>
                <div className='formTotal'>
                    <table>
                        <colgroup>
                            <col style={{width:'15%'}}></col>
                            <col style={{width:'63%'}}></col>
                            <col style={{width:'22%'}}></col>
                        </colgroup>
                        <tbody>
                            <tr>
                                <td><label>매장명 </label></td>
                                <td>
                                    <div style={{ position: 'relative' }}>
                                        <input 
                                            style={{ position: 'relative' }}
                                            type="text" 
                                            name="storeName"
                                            id='storeName'
                                            placeholder="매장명을 입력해주세요" 
                                            autoComplete='off'
                                            onChange={ onChangeHandler }
                                        />
                                        {(!!isShopNameChecked) && (
                                        <span 
                                            style={{
                                                position: 'absolute',
                                                right: '10px',
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                            }}
                                        >
                                            <FaCircleCheck />
                                        </span>
                                        )}
                                    </div>
                                </td>
                                    {(!isShopNameChecked) && (
                                    <button className='checkBtn'
                                            onClick = { onClickDuplicateStoreNameHandler }
                                    >
                                        중복확인
                                    </button>
                                    )}
                            </tr>
                            <tr>
                                <td><label>매장주소</label></td>
                                <td>
                                <input 
                                    type="text" 
                                    name="storeLocation"
                                    placeholder="매장 주소를 입력해주세요" 
                                    autoComplete='off'
                                    onChange={ onChangeHandler }
                                /> 
                                </td>
                                <td>
                                    <button className='checkBtn'>
                                        주소찾기
                                    </button>
                                </td>                                
                            </tr>
                            <tr>
                                <td><label>시작시간</label></td>
                                <td>
                                <input 
                                    type="time"
                                    name="openTime"
                                    step="3600"
                                    autoComplete='off'
                                    value={"10:00"}
                                    onChange={ onChangeHandler }
                                /> 
                                </td>                                
                            </tr>
                            <tr>
                                <td><label>마감시간</label></td>
                                <td>
                                <input 
                                    type="time"
                                    name="closeTime"
                                    step="3600"
                                    value={"20:00"}
                                    autoComplete='off'
                                    onChange={ onChangeHandler }
                                /> 
                                </td>                                
                            </tr>
                            <tr>
                                <td><label>휴무일</label></td>
                                <td>
                                <input 
                                    type="text"
                                    name="closedDay"
                                    value={"연중무휴"}
                                    autoComplete='off'
                                    onChange={ onChangeHandler }
                                /> 
                                </td>                                
                            </tr>                            
                            <tr>
                                <td colSpan={3}>
                                    <div className='bottomBtn'>
                                        <button className='registerBtn'
                                            onClick = { onClickRegisterHandler }
                                        >   
                                            매장 등록
                                        </button>
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
        </div>
    );
}

export default ShopModify;
