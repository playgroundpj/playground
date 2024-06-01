package com.players.playground.product.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbl_menu")
public class Menu {

    @Id
    private Long menuCode;
    private String menuName;
    private String category;
    private String menuContent;
    private int menuPrice;
    private boolean orderableStatus;

    // Getters and Setters
    public Long getMenuCode() {
        return menuCode;
    }

    public void setMenuCode(Long menuCode) {
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
}
