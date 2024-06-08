package com.players.playground.store.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tbl_storegametable")
public class StoreGametable {

    @Id
    @Column(name = "storegametable_no")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int storeGameTableNo;

    @Column(name = "store_code")
    private int storeCode;

    @Column(name = "table_code")
    private int tableCode;


    public StoreGametable() {
    }

    public StoreGametable(int storeGameTableNo, int storeCode, int tableCode) {
        this.storeGameTableNo = storeGameTableNo;
        this.storeCode = storeCode;
        this.tableCode = tableCode;
    }

    public int getStoreGameTableNo() {
        return storeGameTableNo;
    }

    public void setStoreGameTableNo(int storeGameTableNo) {
        this.storeGameTableNo = storeGameTableNo;
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
        return "StoreGametable{" +
                "storeGameTableNo=" + storeGameTableNo +
                ", storeCode='" + storeCode + '\'' +
                ", tableCode='" + tableCode + '\'' +
                '}';
    }
}
