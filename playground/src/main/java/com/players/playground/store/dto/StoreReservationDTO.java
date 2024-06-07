package com.players.playground.store.dto;

public class StoreReservationDTO {

    private int storeReservationNo;
    private String reservationCode;
    private String memberCode;
    private String storeCode;
    private String tableCode;

    public StoreReservationDTO() {
    }

    public StoreReservationDTO(int storeReservationNo, String reservationCode, String memberCode, String storeCode, String tableCode) {
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

    public String getReservationCode() {
        return reservationCode;
    }

    public void setReservationCode(String reservationCode) {
        this.reservationCode = reservationCode;
    }

    public String getMemberCode() {
        return memberCode;
    }

    public void setMemberCode(String memberCode) {
        this.memberCode = memberCode;
    }

    public String getStoreCode() {
        return storeCode;
    }

    public void setStoreCode(String storeCode) {
        this.storeCode = storeCode;
    }

    public String getTableCode() {
        return tableCode;
    }

    public void setTableCode(String tableCode) {
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
