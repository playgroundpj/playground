package com.players.playground.store.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tbl_StoreMenu")
public class StoreMenu {

    @Id
    @Column(name = "storeMenu_no")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int storeMenuNo;

    @Column(name = "store_code")
    private String storeCode;

    @Column(name = "menu_code")
    private String menuCode;

    @Column(name = "menu_count")
    private String menuCount;


    public StoreMenu() {
    }

    public StoreMenu(int storeMenuNo, String storeCode, String menuCode, String menuCount) {
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
        return "StoreMenu{" +
                "storeMenuNo=" + storeMenuNo +
                ", storeCode='" + storeCode + '\'' +
                ", menuCode='" + menuCode + '\'' +
                ", menuCount='" + menuCount + '\'' +
                '}';
    }
}
