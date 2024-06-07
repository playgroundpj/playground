package com.players.playground.store.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tbl_StoreReservation")
public class StoreReservation {

    @Id
    @Column(name = "storeReservation_no")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int storeReservationNo;

    @Column(name = "reservation_code")
    private String reservationCode;

    @Column(name = "member_code")
    private String memberCode;

    @Column(name = "store_code")
    private String storeCode;

    @Column(name = "table_code")
    private String tableCode;

    public StoreReservation() {
    }

    public StoreReservation(int storeGameTableNo, String storeCode, String tableCode, String tableCount) {
        this.storeGameTableNo = storeGameTableNo;
        this.storeCode = storeCode;
        this.tableCode = tableCode;
        this.tableCount = tableCount;
    }

    public int getStoreGameTableNo() {
        return storeGameTableNo;
    }

    public void setStoreGameTableNo(int storeGameTableNo) {
        this.storeGameTableNo = storeGameTableNo;
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

    public String getTableCount() {
        return tableCount;
    }

    public void setTableCount(String tableCount) {
        this.tableCount = tableCount;
    }

    @Override
    public String toString() {
        return "StoreGametable{" +
                "storeGameTableNo=" + storeGameTableNo +
                ", storeCode='" + storeCode + '\'' +
                ", tableCode='" + tableCode + '\'' +
                ", tableCount='" + tableCount + '\'' +
                '}';
    }
}
