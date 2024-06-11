import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import { decodeJwt } from '../../utils/tokenUtils';


function Reservation(){

    const { shopCode } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLogin = window.localStorage.getItem('accessToken');    // Local Storage 에 token 정보 확인
    const token = decodeJwt(window.localStorage.getItem("accessToken")); 
    const store = useSelector(state => state.storeReducer);
    const reservation = useSelector(state => state.reservationReducer);
    const [isShopNameChecked, setShopNameChecked] = useState(false);
    const [form, setForm] = useState({
        reservationCode: '',
        memberCode: '',
        reservationDate: '',
        reservationDatetime: '',
        reservationState: '',
        reservationModifydate: '',
        reservationModifydatetime: '',
        startTime: '',
        endTime: '',
        memberCode: '',
        storeCode: '',
        tableCode: ''
    })

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

    const onClickModifyHandler = (reservationCode) => {

        navigate(`/store/update/${reservationCode}`);

    }

    const onClickDeleteHandler = (reservationCode) => {

        // navigate(`/store/update/${reservationCode}`);

    }

    return (
        <>
            <div className='registerCSS'>
                <h2>보드게임 카페 예약</h2>
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
                                <td><label>방문예정일</label></td>
                                <td>
                                <input 
                                    type="time"
                                    name="openTime"
                                    step="3600"
                                    autoComplete='off'
                                    value={form.reservationDate}
                                    onChange={ onChangeHandler }
                                /> 
                                </td>                                
                            </tr>
                            <tr>
                                <td><label>시작시간</label></td>
                                <td>
                                <input 
                                    type="text"
                                    name="closedDay"
                                    value={form.startTime}
                                    autoComplete='off'
                                    onChange={ onChangeHandler }
                                /> 
                                </td>                                
                            </tr>
                            <tr>
                                <td><label>종료시간</label></td>
                                <td>
                                <input 
                                    type="text"
                                    name="closedDay"
                                    value={form.endTime}
                                    autoComplete='off'
                                    onChange={ onChangeHandler }
                                /> 
                                </td>                                
                            </tr>                             
                            <tr>
                                <td colSpan={3}>
                                    <div className='bottomBtn'>
                                        <button className='registerBtn'
                                            onClick = { () => onClickModifyHandler(reservationCode) }
                                        >   
                                            예약 수정
                                        </button>
                                        <button className='deleteBtn'
                                            onClick = { () => onClickDeleteHandler(reservationCode) }
                                        >   
                                            예약 취소
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
        </>
    );


}

export default Reservation;
