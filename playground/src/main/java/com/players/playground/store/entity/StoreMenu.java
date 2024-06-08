package com.players.playground.store.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tbl_storemenu")
public class StoreMenu {

    @Id
    @Column(name = "storemenu_no")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int storeMenuNo;

    @Column(name = "store_code")
    private int storeCode;

    @Column(name = "menu_code")
    private int menuCode;

    @Column(name = "menu_count")
    private int menuCount;


    public StoreMenu() {
    }

    public StoreMenu(int storeMenuNo, int storeCode, int menuCode, int menuCount) {
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
        return "StoreMenu{" +
                "storeMenuNo=" + storeMenuNo +
                ", storeCode='" + storeCode + '\'' +
                ", menuCode='" + menuCode + '\'' +
                ", menuCount='" + menuCount + '\'' +
                '}';
    }
}
