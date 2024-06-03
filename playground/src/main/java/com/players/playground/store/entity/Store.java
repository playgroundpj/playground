package com.players.playground.store.entity;

import jakarta.persistence.*;

import java.time.LocalTime;

@Entity
@Table(name = "tbl_store")
public class Store {

    @Id
    @Column(name = "store_code")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int storeCode;

    @Column(name = "store_name")
    private String storeName;

    @Column(name = "store_location")
    private String storeLocation;

    @Column(name = "open_time")
    private LocalTime openTime;

    @Column(name = "close_time")
    private LocalTime closeTime;

    @Column(name = "closed_day")
    private String closedDay;

    public Store() {
    }

    public Store(int storeCode, String storeName, String storeLocation, LocalTime openTime, LocalTime closeTime, String closedDay) {
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

    public LocalTime getOpenTime() {
        return openTime;
    }

    public void setOpenTime(LocalTime openTime) {
        this.openTime = openTime;
    }

    public LocalTime getCloseTime() {
        return closeTime;
    }

    public void setCloseTime(LocalTime closeTime) {
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
        return "storeDTO{" +
                "storeCode=" + storeCode +
                ", storeName='" + storeName + '\'' +
                ", storeLocation='" + storeLocation + '\'' +
                ", openTime=" + openTime +
                ", closeTime=" + closeTime +
                ", closedDay='" + closedDay + '\'' +
                '}';
    }
}
