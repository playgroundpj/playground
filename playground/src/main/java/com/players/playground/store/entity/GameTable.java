package com.players.playground.store.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tbl_gametable")
public class GameTable {

    @Id
    @Column(name = "table_code")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int tableCode;

    @Column(name = "table_name")
    private String tableName;

    @Column(name = "max_people")
    private int maxPeople;

    @Column(name = "table_price")
    private int tablePrice;



    public GameTable() {
    }

    public GameTable(int tableCode, String tableName, int maxPeople, int tablePrice) {
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
        return "GameTable{" +
                "tableCode=" + tableCode +
                ", tableName='" + tableName + '\'' +
                ", maxPeople=" + maxPeople +
                ", tablePrice=" + tablePrice +
                '}';
    }
}
