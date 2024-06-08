import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { decodeJwt } from '../../utils/tokenUtils';
import {
    callGetMemberAPI,
} from '../../apis/MemberAPICalls'
import { callGetReservationByMemberCodeAPI, callGetreservationAPI, callGetreservationListAPI } from '../../apis/ReservationAPICalls';
import { callGetShopAPI, callGetShopListAllAPI } from '../../apis/ShopAPICalls';
import { callGetGameTableListAPI } from '../../apis/StoreAPICalls';

function MyReservation(){


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const member = useSelector(state => state.memberReducer);  
    const shop = useSelector(state => state.checkReducer);  
    const gametable = useSelector(state => state.shopReducer);  
    const reservation = useSelector(state => state.reservationReducer);  
    const isLogin = window.localStorage.getItem('accessToken');    // Local Storage 에 token 정보 확인
    const token = decodeJwt(window.localStorage.getItem("accessToken")); 
    const memberDetail = member.data;
    const [shopList,setShopList] = useState([]);
    const [reservationListAll,setReservaionListAll] = useState([]);

    const reservationList = reservation.data;



    const onClickBackHandler = () => {
        
        navigate(-1);
    }

    const onClickModifyHandler = () => {
        navigate('./memberUpdate');
    }

    const onClickReservationHandler = (storeReservationCode) => {
        navigate(`./${storeReservationCode}`);
    }

    useEffect(
        ()=>{
            dispatch(callGetMemberAPI({
                memberId: token.sub
            }));  
            dispatch(callGetShopListAllAPI());
            dispatch(callGetGameTableListAPI());
            dispatch(callGetreservationListAPI());
        },[]
    )

    useEffect(
        () => {
            if(shop){
                console.log('shop : ', shop );
                setShopList(shop);
                console.log(shopList);
                setLoading(false);
            }

        },[shop]
    )

    useEffect(
        () => {
            if(gametable){
                console.log('gametable : ', gametable);
            }

        },[gametable]
    )

    useEffect(
        ()=>{
            console.log('memberDetail : ', memberDetail);
            if(memberDetail){
                dispatch(callGetReservationByMemberCodeAPI({
                    memberCode: memberDetail.memberCode
                }));

            }
        },[memberDetail]
    )
    
    useEffect(
        () => {
            if(reservation.message != '회원별 예약 조회 성공'){
                console.log('reservation : ', reservation);
                setReservaionListAll(reservation);
                console.log('전쳬 예약 리스트 : ', reservationListAll);
            }
        },[reservation]
    )


    const findStoreName = (storeCode) => {
        let storeName = null;
        if (!shop || shop.length === 0) {
            return "매장 정보 없음";
        }
        for (let i = 0; i < shop.length; i++) {
            if (shop[i].storeCode === storeCode) {
                storeName = shop[i].storeName;
                break; // exit loop once the store is found
            }
        }
        return storeName;
    }

    const findReservationDate = (reservationCode) => {
        let reservationDate = null;
        if (!reservationListAll || reservationListAll.length === 0) {
            return "예약 정보 없음";
        }
        for (let i = 0; i < reservationListAll.length; i++) {
            if (reservationListAll[i].reservationCode === reservationCode) {
                reservationDate = reservationListAll[i].reservationDate;
                break; // exit loop once the store is found
            }
        }
        return reservationDate;
    }


    const findReservationDatetime = (reservationCode) => {
        let reservationDatetime = null;
        if (!reservationListAll || reservationListAll.length === 0) {
            return "예약 정보 없음";
        }
        for (let i = 0; i < reservationListAll.length; i++) {
            if (reservationListAll[i].reservationCode === reservationCode) {
                reservationDatetime = reservationListAll[i].reservationDatetime;
                break; // exit loop once the store is found
            }
        }
        return reservationDatetime;
    }

    const findReservationModifyDatetime = (reservationCode) => {
        let reservationModifyDatetime = null;
        if (!reservationListAll || reservationListAll.length === 0) {
            return "";
        }
        for (let i = 0; i < reservationListAll.length; i++) {
            if (reservationListAll[i].reservationCode === reservationCode) {
                reservationModifyDatetime = reservationListAll[i].reservationModifyDatetime;
                break; // exit loop once the store is found
            }
        }
        return reservationModifyDatetime;
    }

    const findReservationState = (reservationCode) => {
        let reservationState = null;
        if (!reservationListAll || reservationListAll.length === 0) {
            return "예약 정보 없음";
        }
        for (let i = 0; i < reservationListAll.length; i++) {
            if (reservationListAll[i].reservationCode === reservationCode) {
                reservationState = reservationListAll[i].reservationState;
                break; // exit loop once the store is found
                
            }
        }

        if(reservationState == 'Confirmed'){
            reservationState = '결제완료';
        }else if (reservationState == 'Pending'){
            reservationState = '예약 대기';
        }else if (reservationState == 'Cancelled'){
            reservationState = '예약 취소';
        }
        
        return reservationState;
    }

    const findGameTableName = (tableCode) => {
        let tableName = null;
        if (!gametable || gametable.length === 0) {
            return "테이블 정보 없음";
        }
        for (let i = 0; i < gametable.length; i++) {
            if (gametable[i].tableCode === tableCode) {
                tableName = gametable[i].tableName;
                break; // exit loop once the store is found
            }
        }
        return tableName;
    }

    return(
        <div className='profileDiv'  >
            {loading ? ( // 로딩 중일 때 표시할 내용
                    <p>Loading...</p>
                ) : (
            <>
                <h2>전체 예약 목록</h2>
                { reservationList &&
                <div className='formTotal ReservationList'>
                    <table>
                        <colgroup>
                            <col style={{width:'7%'}}></col>
                            <col style={{width:'10%'}}></col>
                            <col style={{width:'13%'}}></col>
                            <col style={{width:'20%'}}></col>
                            <col style={{width:'20%'}}></col>
                            <col style={{width:'20%'}}></col>
                            <col style={{width:'10%'}}></col>
                        </colgroup>
                        <thead>
                            <tr>
                                <td>No.</td>
                                <td>예약매장</td>
                                <td>게임테이블</td>
                                <td>예약일</td>
                                <td>예약날짜</td>
                                <td>수정날짜</td>
                                <td>예약상태</td>
                            </tr>
                        </thead>
                        <tbody>
                            {reservationList.map((reservation, index) => (
                                <tr 
                                    key={reservation.storeReservationNo}
                                    onClick={()=> { onClickReservationHandler(reservation.storeReservationNo) }}
                                >
                                    <td>{index+1}</td>
                                    <td>{findStoreName(reservation.storeCode)}</td>
                                    <td>{findGameTableName(reservation.tableCode)}</td>
                                    <td>{findReservationDate(reservation.reservationCode)}</td>
                                    <td>{findReservationDatetime(reservation.reservationCode)}</td>
                                    <td>{findReservationModifyDatetime(reservation.reservationCode)}</td>
                                    <td>{findReservationState(reservation.reservationCode)}</td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan={7}>
                                    <div className='bottomBtn'>
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

                }
            </>)}
        </div>
    )


}


export default MyReservation;
