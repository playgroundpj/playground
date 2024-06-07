package com.players.playground.store.dto;

public class StoreMenuDTO {

    private int storeMenuNo;
    private String storeCode;
    private String menuCode;
    private String menuCount;

    public StoreMenuDTO() {
    }

    public StoreMenuDTO(int storeMenuNo, String storeCode, String menuCode, String menuCount) {
        this.storeMenuNo = storeMenuNo;
        this.storeCode = storeCode;
        this.menuCode = menuCode;
        this.menuCount = menuCount;
    }

    public int getStoreMenuNo() {
        return storeMenuNo;
    }

    public void setStoreMenuNo(int storeMenuNo) {
        this.storeMenuNo = storeMenuNo;
    }

    public String getStoreCode() {
        return storeCode;
    }

    public void setStoreCode(String storeCode) {
        this.storeCode = storeCode;
    }

    public String getMenuCode() {
        return menuCode;
    }

    public void setMenuCode(String menuCode) {
        this.menuCode = menuCode;
    }

    public String getMenuCount() {
        return menuCount;
    }

    public void setMenuCount(String menuCount) {
        this.menuCount = menuCount;
    }

    @Override
    public String toString() {
        return "StoreMenuDTO{" +
                "storeMenuNo=" + storeMenuNo +
                ", storeCode='" + storeCode + '\'' +
                ", menuCode='" + menuCode + '\'' +
                ", menuCount='" + menuCount + '\'' +
                '}';
    }
}


