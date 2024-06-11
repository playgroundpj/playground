package com.players.playground.store.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tbl_storeboardgame")
public class StoreBoardGame {

    @Id
    @Column(name = "storeboardgame_no")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int storeBoardGameNo;

    @Column(name = "store_code")
    private int storeCode;

    @Column(name = "boardgame_code")
    private int boardgameCode;

    @Column(name = "boardgame_count")
    private int boardgameCount;

    @Column(name = "boardgame_location")
    private String boardgameLocation;

    public StoreBoardGame() {
    }

    public StoreBoardGame(int storeBoardGameNo, int storeCode, int boardgameCode, int boardgameCount, String boardgameLocation) {
        this.storeBoardGameNo = storeBoardGameNo;
        this.storeCode = storeCode;
        this.boardgameCode = boardgameCode;
        this.boardgameCount = boardgameCount;
        this.boardgameLocation = boardgameLocation;
    }

    public int getStoreBoardGameNo() {
        return storeBoardGameNo;
    }

    public void setStoreBoardGameNo(int storeBoardGameNo) {
        this.storeBoardGameNo = storeBoardGameNo;
    }

    public int getStoreCode() {
        return storeCode;
    }

    public void setStoreCode(int storeCode) {
        this.storeCode = storeCode;
    }

    public int getBoardgameCode() {
        return boardgameCode;
    }

    public void setBoardgameCode(int boardgameCode) {
        this.boardgameCode = boardgameCode;
    }

    public int getBoardgameCount() {
        return boardgameCount;
    }

    public void setBoardgameCount(int boardgameCount) {
        this.boardgameCount = boardgameCount;
    }

    public String getBoardgameLocation() {
        return boardgameLocation;
    }

    public void setBoardgameLocation(String boardgameLocation) {
        this.boardgameLocation = boardgameLocation;
    }

    @Override
    public String toString() {
        return "StoreBoardGame{" +
                "storeBoardGameNo=" + storeBoardGameNo +
                ", storeCode='" + storeCode + '\'' +
                ", boardgameCode='" + boardgameCode + '\'' +
                ", boardgameCount='" + boardgameCount + '\'' +
                ", boardgameLocation='" + boardgameLocation + '\'' +
                '}';
    }
}
