package com.players.playground.store.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tbl_storereservation")
public class StoreReservation {

    @Id
    @Column(name = "storereservation_no")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int storeReservationNo;

    @Column(name = "reservation_code")
    private int reservationCode;

    @Column(name = "member_code")
    private int memberCode;

    @Column(name = "store_code")
    private int storeCode;

    @Column(name = "table_code")
    private int tableCode;

    public StoreReservation() {
    }

    public StoreReservation(int storeReservationNo, int reservationCode, int memberCode, int storeCode, int tableCode) {
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
        return "StoreReservation{" +
                "storeReservationNo=" + storeReservationNo +
                ", reservationCode=" + reservationCode +
                ", memberCode=" + memberCode +
                ", storeCode=" + storeCode +
                ", tableCode=" + tableCode +
                '}';
    }
}
