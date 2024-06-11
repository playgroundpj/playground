package com.players.playground.store.dto;

public class StoreMenuDTO {

    private int storeMenuNo;
    private int storeCode;
    private int menuCode;
    private int menuCount;

    public StoreMenuDTO() {
    }

    public StoreMenuDTO(int storeMenuNo, int storeCode, int menuCode, int menuCount) {
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

    public int getStoreCode() {
        return storeCode;
    }

    public void setStoreCode(int storeCode) {
        this.storeCode = storeCode;
    }

    public int getMenuCode() {
        return menuCode;
    }

    public void setMenuCode(int menuCode) {
        this.menuCode = menuCode;
    }

    public int getMenuCount() {
        return menuCount;
    }

    public void setMenuCount(int menuCount) {
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


