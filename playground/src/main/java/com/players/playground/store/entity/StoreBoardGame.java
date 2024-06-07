package com.players.playground.store.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tbl_StoreBoardGame")
public class StoreBoardGame {

    @Id
    @Column(name = "storeBoardGame_no")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int storeBoardGameNo;

    @Column(name = "store_code")
    private String storeCode;

    @Column(name = "boardgame_code")
    private String boardgameCode;

    @Column(name = "boardgame_count")
    private String boardgameCount;

    @Column(name = "boardgame_location")
    private String boardgameLocation;

    public StoreBoardGame() {
    }

    public StoreBoardGame(int storeBoardGameNo, String storeCode, String boardgameCode, String boardgameCount, String boardgameLocation) {
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

    public String getStoreCode() {
        return storeCode;
    }

    public void setStoreCode(String storeCode) {
        this.storeCode = storeCode;
    }

    public String getBoardgameCode() {
        return boardgameCode;
    }

    public void setBoardgameCode(String boardgameCode) {
        this.boardgameCode = boardgameCode;
    }

    public String getBoardgameCount() {
        return boardgameCount;
    }

    public void setBoardgameCount(String boardgameCount) {
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
