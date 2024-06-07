package com.players.playground.store.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tbl_StoreGameTable")
public class StoreGametable {

    @Id
    @Column(name = "storeGameTable_no")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int storeGameTableNo;

    @Column(name = "store_code")
    private String storeCode;

    @Column(name = "table_code")
    private String tableCode;


    public StoreGametable() {
    }

    public StoreGametable(int storeGameTableNo, String storeCode, String tableCode) {
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
        return "StoreGametable{" +
                "storeGameTableNo=" + storeGameTableNo +
                ", storeCode='" + storeCode + '\'' +
                ", tableCode='" + tableCode + '\'' +
                '}';
    }
}
