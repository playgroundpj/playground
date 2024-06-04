package com.players.playground.store.dto;

import java.time.LocalTime;

public class StoreDTO {

    private int storeCode;
    private String storeName;
    private String storeLocation;
    private String openTime;
    private String closeTime;
    private String closedDay;

    public StoreDTO() {
    }

    public StoreDTO(int storeCode, String storeName, String storeLocation, String openTime, String closeTime, String closedDay) {
        this.storeCode = storeCode;
        this.storeName = storeName;
        this.storeLocation = storeLocation;
        this.openTime = openTime;
        this.closeTime = closeTime;
        this.closedDay = closedDay;
    }

    public int getStoreCode() {
        return storeCode;
    }

    public void setStoreCode(int storeCode) {
        this.storeCode = storeCode;
    }

    public String getStoreName() {
        return storeName;
    }

    public void setStoreName(String storeName) {
        this.storeName = storeName;
    }

    public String getStoreLocation() {
        return storeLocation;
    }

    public void setStoreLocation(String storeLocation) {
        this.storeLocation = storeLocation;
    }

    public String getOpenTime() {
        return openTime;
    }

    public void setOpenTime(String openTime) {
        this.openTime = openTime;
    }

    public String getCloseTime() {
        return closeTime;
    }

    public void setCloseTime(String closeTime) {
        this.closeTime = closeTime;
    }

    public String getClosedDay() {
        return closedDay;
    }

    public void setClosedDay(String closedDay) {
        this.closedDay = closedDay;
    }

    @Override
    public String toString() {
        return "StoreDTO{" +
                "storeCode=" + storeCode +
                ", storeName='" + storeName + '\'' +
                ", storeLocation='" + storeLocation + '\'' +
                ", openTime='" + openTime + '\'' +
                ", closeTime='" + closeTime + '\'' +
                ", closedDay='" + closedDay + '\'' +
                '}';
    }
}
