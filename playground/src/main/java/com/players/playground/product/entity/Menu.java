package com.players.playground.product.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tbl_menu")
public class Menu {

    @Id
    @Column(name = "menu_code")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int menuCode;
    @Column(name = "menu_name")
    private String menuName;
    @Column(name = "category")
    private String category;
    @Column(name = "menu_content")
    private String menuContent;
    @Column(name = "menu_price")
    private int menuPrice;
    @Column(name = "orderable_status")
    private boolean orderableStatus;
    @Column(name = "menu_img")
    private String menuImg;

    public Menu() {
    }

    public Menu(int menuCode, String menuName, String category, String menuContent, int menuPrice, boolean orderableStatus, String menuImg) {
        this.menuCode = menuCode;
        this.menuName = menuName;
        this.category = category;
        this.menuContent = menuContent;
        this.menuPrice = menuPrice;
        this.orderableStatus = orderableStatus;
        this.menuImg = menuImg;
    }

    public int getMenuCode() {
        return menuCode;
    }

    public void setMenuCode(int menuCode) {
        this.menuCode = menuCode;
    }

    public String getMenuName() {
        return menuName;
    }

    public void setMenuName(String menuName) {
        this.menuName = menuName;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getMenuContent() {
        return menuContent;
    }

    public void setMenuContent(String menuContent) {
        this.menuContent = menuContent;
    }

    public int getMenuPrice() {
        return menuPrice;
    }

    public void setMenuPrice(int menuPrice) {
        this.menuPrice = menuPrice;
    }

    public boolean isOrderableStatus() {
        return orderableStatus;
    }

    public void setOrderableStatus(boolean orderableStatus) {
        this.orderableStatus = orderableStatus;
    }

    public String getMenuImg() {
        return menuImg;
    }

    public void setMenuImg(String menuImg) {
        this.menuImg = menuImg;
    }

    @Override
    public String toString() {
        return "Menu{" +
                "menuCode=" + menuCode +
                ", menuName='" + menuName + '\'' +
                ", category='" + category + '\'' +
                ", menuContent='" + menuContent + '\'' +
                ", menuPrice=" + menuPrice +
                ", orderableStatus=" + orderableStatus +
                ", menuImg='" + menuImg + '\'' +
                '}';
    }
}