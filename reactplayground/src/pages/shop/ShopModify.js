import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, NavLink, useParams } from 'react-router-dom';
import { decodeJwt } from '../../utils/tokenUtils';
import { FaCircleCheck } from "react-icons/fa6";
import Swal from "sweetalert2";
import { callDeleteShopAPI, callGetShopAPI, callGetShopByStoreNameAPI, callRegistShopAPI, callUpdateShopAPI } from '../../apis/ShopAPICalls';



function ShopModify() {

    const navigate = useNavigate();

    const { shopCode } = useParams();
    const dispatch = useDispatch();
    const isLogin = window.localStorage.getItem('accessToken');    // Local Storage 에 token 정보 확인
    const token = decodeJwt(window.localStorage.getItem("accessToken")); 
    const shop = useSelector(state => state.shopReducer);
    const shopDetail = shop.data;
    const [loading, setLoading] = useState(true);
    const [isShopNameChecked, setShopNameChecked] = useState(false);
    const [form, setForm] = useState({
        storeCode: '',
        storeName: '',
        storeLocation: '',
        openTime: '',
        closeTime: '',
        closedDay: ''
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

    useEffect(
        ()=> {
            if(token !== null) {
                dispatch(callGetShopAPI({	// 매장 정보 조회
                    storeCode: shopCode
                })).finally(() => setLoading(false));
            }  
        },[]
    )

    useEffect(
        ()=>{
            if(shopDetail){
                setForm({
                    storeCode: shopDetail.storeCode,
                    storeName: shopDetail.storeName,
                    storeLocation: shopDetail.storeLocation,
                    openTime: shopDetail.openTime,
                    closeTime: shopDetail.closeTime,
                    closedDay: shopDetail.closedDay
                })
            }

        },[shopDetail]
    )
    

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };    


    const onClickBackHandler = () => {

        /* 돌아가기 클릭시 메인 페이지로 이동 */
        navigate(-1, { replace: true })
    }

    const onClickModifyHandler = () => {
        if(form.storeLocation.trim() == ''){
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
            dispatch(callUpdateShopAPI({
                form: form
            }));
            Swal.fire({
                icon: "sucess",
                title: `매장 수정이 완료되었습니다`,
                showConfirmButton: true,
                confirmButtonColor: "#97A482",
                customClass: {
                    title: 'swal2-title'
                }
            })
            navigate("/shop");
            window.location.reload();
        }
        
    }

    const onClickDuplicateStoreNameHandler = () => {

        dispatch(callGetShopByStoreNameAPI({storeName: form.storeName}));


    }

    const onClickDeleteHandler = () => {
        Swal.fire({
			title: "매장을 삭제하겠습니까?",
			text: "삭제 후 되돌릴 수 없습니다.",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#97A482",
			cancelButtonColor: "#C45D4A",
			confirmButtonText: "삭제",
			cancelButtonText: "취소"
			}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire({
				title: "삭제 완료!",
				text: "매장이 삭제되었습니다",
				icon: "success",
				showConfirmButton: false,
				timer: 1000
				});
                // 매장 삭제
				dispatch(callDeleteShopAPI({storeName: form.storeName}));
                navigate("/shop", { replace: true });
                window.location.reload();
			}
		});
    }

    

    
    return (
        <div>
            {loading ? ( // 로딩 중일 때 표시할 내용
                <p>Loading...</p>
            ) : (
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
                                            readOnly={true}
                                            value={form.storeName}
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
                            </tr>
                            <tr>
                                <td><label>매장주소</label></td>
                                <td>
                                <input 
                                    type="text" 
                                    name="storeLocation"
                                    placeholder="매장 주소를 입력해주세요" 
                                    autoComplete='off'
                                    value={form.storeLocation || ''}
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
                                    value={form.openTime}
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
                                    value={form.closeTime}
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
                                    value={form.closedDay}
                                    autoComplete='off'
                                    onChange={ onChangeHandler }
                                /> 
                                </td>                                
                            </tr>                            
                            <tr>
                                <td colSpan={3}>
                                    <div className='bottomBtn'>
                                        <button className='registerBtn'
                                            onClick = { onClickModifyHandler }
                                        >   
                                            매장 정보 수정 완료
                                        </button>
                                        <button className='backBtn'
                                            onClick = { onClickBackHandler }
                                        >
                                            돌아가기
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                            <td colSpan={3}>
                            <button className='deleteBtn'
                                        onClick = { onClickDeleteHandler }
                                    >   
                                        매장 삭제
                                    </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            )}
        </div>
    );
}

export default ShopModify;
