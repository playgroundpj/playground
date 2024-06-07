package com.players.playground.store.dto;

public class StoreGametableDTO {

    private int storeGameTableNo;
    private String storeCode;
    private String tableCode;

    public StoreGametableDTO() {
    }

    public StoreGametableDTO(int storeGameTableNo, String storeCode, String tableCode) {
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
        return "StoreGametableDTO{" +
                "storeGameTableNo=" + storeGameTableNo +
                ", storeCode='" + storeCode + '\'' +
                ", tableCode='" + tableCode + '\'' +
                '}';
    }
}


