package com.players.playground.store.dto;

public class StoreGametableDTO {

    private int storeGameTableNo;
    private int storeCode;

    private int tableCode;


    public StoreGametableDTO() {
    }

    public StoreGametableDTO(int storeGameTableNo, int storeCode, int tableCode) {
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
        return "StoreGametableDTO{" +
                "storeGameTableNo=" + storeGameTableNo +
                ", storeCode='" + storeCode + '\'' +
                ", tableCode='" + tableCode + '\'' +
                '}';
    }
}


