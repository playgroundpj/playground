package com.players.playground.store.dto;

public class GametableDTO {

    private int tableCode;
    private String tableName;
    private int maxPeople;
    private int tablePrice;



    public GametableDTO() {
    }

    public GametableDTO(int tableCode, String tableName, int maxPeople, int tablePrice) {
        this.tableCode = tableCode;
        this.tableName = tableName;
        this.maxPeople = maxPeople;
        this.tablePrice = tablePrice;
    }

    public int getTableCode() {
        return tableCode;
    }

    public void setTableCode(int tableCode) {
        this.tableCode = tableCode;
    }

    public String getTableName() {
        return tableName;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    public int getMaxPeople() {
        return maxPeople;
    }

    public void setMaxPeople(int maxPeople) {
        this.maxPeople = maxPeople;
    }

    public int getTablePrice() {
        return tablePrice;
    }

    public void setTablePrice(int tablePrice) {
        this.tablePrice = tablePrice;
    }

    @Override
    public String toString() {
        return "GametableDTO{" +
                "tableCode=" + tableCode +
                ", tableName='" + tableName + '\'' +
                ", maxPeople=" + maxPeople +
                ", tablePrice=" + tablePrice +
                '}';
    }
}


