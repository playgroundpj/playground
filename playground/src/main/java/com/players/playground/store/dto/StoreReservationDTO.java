package com.players.playground.store.dto;

public class StoreReservationDTO {

    private int storeReservationNo;
    private int reservationCode;
    private int memberCode;
    private int storeCode;
    private int tableCode;

    public StoreReservationDTO() {
    }

    public StoreReservationDTO(int storeReservationNo, int reservationCode, int memberCode, int storeCode, int tableCode) {
        this.storeReservationNo = storeReservationNo;
        this.reservationCode = reservationCode;
        this.memberCode = memberCode;
        this.storeCode = storeCode;
        this.tableCode = tableCode;
    }

    public int getStoreReservationNo() {
        return storeReservationNo;
    }

    public void setStoreReservationNo(int storeReservationNo) {
        this.storeReservationNo = storeReservationNo;
    }

    public int getReservationCode() {
        return reservationCode;
    }

    public void setReservationCode(int reservationCode) {
        this.reservationCode = reservationCode;
    }

    public int getMemberCode() {
        return memberCode;
    }

    public void setMemberCode(int memberCode) {
        this.memberCode = memberCode;
    }

    public int getStoreCode() {
        return storeCode;
    }

    public void setStoreCode(int storeCode) {
        this.storeCode = storeCode;
    }

    public int getTableCode() {
        return tableCode;
    }

    public void setTableCode(int tableCode) {
        this.tableCode = tableCode;
    }

    @Override
    public String toString() {
        return "StoreReservationDTO{" +
                "storeReservationNo=" + storeReservationNo +
                ", reservationCode='" + reservationCode + '\'' +
                ", memberCode='" + memberCode + '\'' +
                ", storeCode='" + storeCode + '\'' +
                ", tableCode='" + tableCode + '\'' +
                '}';
    }
}
