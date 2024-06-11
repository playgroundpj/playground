import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import { decodeJwt } from '../../utils/tokenUtils';
import ReactDatePicker from "react-datepicker";
import { ko } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from "sweetalert2";
import { callGetShopByStoreNameAPI, callRegistShopAPI } from '../../apis/ShopAPICalls';


function Reservation(){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLogin = window.localStorage.getItem('accessToken');    // Local Storage 에 token 정보 확인
    const token = decodeJwt(window.localStorage.getItem("accessToken")); 
    const datepickerRef = useRef(null);
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

    // 설정할 최소 시간과 최대 시간
    const minTime = new Date();
    minTime.setHours(9);
    minTime.setMinutes(0);

    const maxTime = new Date();
    maxTime.setHours(22);
    maxTime.setMinutes(0);

    const onChangeHandler = (e) => {
        // console.log('e.target.name : ', e.target.name);
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };


    const onChangeDateHandler = (e) => {
        const date = String(e.getFullYear() + '-' + e.getMonth() + '-' + e.getDate());
        console.log('date : ', date);

    }

    const onChangeDatetimeHandler = (e) => {
        const date = String(e.getFullYear() + '-' + e.getMonth() + '-' + e.getDate());
        console.log('date : ', date);
        console.log('e : ', e);

    }

    const onClickBackHandler = () => {

        /* 돌아가기 클릭시 메인 페이지로 이동 */
        navigate(-1, { replace: true })
    }

    const onClickReservationHandler = () => {

        /* 돌아가기 클릭시 메인 페이지로 이동 */
        navigate(-1, { replace: true })
    }

    return (
        <>
            <div className='registerCSS reservationCSS'>
                <h2>보드게임 카페 예약</h2>
                <hr></hr>
                <div className='formTotal reservationDiv'>
                    <table>
                        <colgroup>
                            <col style={{width:'15%'}}></col>
                            <col style={{width:'35%'}}></col>
                            <col style={{width:'15%'}}></col>
                            <col style={{width:'35%'}}></col>
                        </colgroup>
                        <tbody>
                            <tr>
                                <td><label>매장명</label></td>
                                <td></td>
                            </tr>
                            <tr>
                                
                                <td><label>방문예정일</label></td>
                                <td>
                                    <div className="datepicker" >
                                        <div className="datepicker" >
                                            <ReactDatePicker
                                                ref={datepickerRef}
                                                shouldCloseOnSelect
                                                dateFormat="yyyy-MM-dd"
                                                placeholderText="날짜를 선택하세요"
                                                id="datepicker1"
                                                name="reservationDate"
                                                selected={form.reservationDate} // 선택된 날짜를 ReactDatePicker에 전달
                                                onChange={ onChangeDateHandler }
                                                minDate={new Date()} // 오늘 이전의 날짜 선택 불가능하게 설정
                                                maxDate={(new Date().setDate(new Date().getDate()+7))} // 한 달 후의 날짜 선택 불가능하게 설정
                                                locale={ko}
                                            />
                                        </div>
                                    </div>
                                </td>                                
                            </tr>
                            <tr>
                                <td><label>시작시간</label></td>
                                <td>
                                    <div className="row-half">
                                        <div className="datepicker" >
                                            <ReactDatePicker
                                                ref={datepickerRef}
                                                shouldCloseOnSelect
                                                placeholderText="선택하세요"
                                                id="datepicker2"
                                                showTimeSelect
                                                showTimeSelectOnly
                                                timeIntervals={60}
                                                timeCaption="Time"
                                                dateFormat="HH:mm"
                                                minTime={minTime}// 09:00부터 선택 가능하도록 설정
                                                maxTime={maxTime} // 24:00까지 선택 가능하도록 설정
                                                onChange={ onChangeDatetimeHandler }
                                            />
                                        </div>
                                    </div>
                                </td>
                                <td><label>종료시간</label></td>
                                <td>
                                    <div className="row-half">
                                        <div className="datepicker" >
                                            <ReactDatePicker
                                                ref={datepickerRef}
                                                shouldCloseOnSelect
                                                placeholderText="선택하세요"
                                                id="datepicker2"
                                                showTimeSelect
                                                showTimeSelectOnly
                                                timeIntervals={60}
                                                timeCaption="Time"
                                                dateFormat="HH:mm"
                                                minTime={minTime}// 09:00부터 선택 가능하도록 설정
                                                maxTime={maxTime} // 24:00까지 선택 가능하도록 설정
                                                onChange={ onChangeDatetimeHandler }
                                            />
                                        </div>
                                    </div>
                                </td>                                      
                            </tr>
                            <tr>
                                <td><label>테이블 선택</label></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colSpan={4}>
                                    <div className='bottomBtn'>
                                        <button className='registerBtn'
                                            onClick = { onClickReservationHandler }
                                        >   
                                            예약하기
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
