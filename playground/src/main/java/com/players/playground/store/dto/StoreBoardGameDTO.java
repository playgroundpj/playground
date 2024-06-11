package com.players.playground.store.dto;

public class StoreBoardGameDTO {

    private int storeBoardGameNo;
    private int storeCode;

    private int boardgameCode;
    private int boardgameCount;
    private String boardgameLocation;

    public StoreBoardGameDTO() {
    }

    public StoreBoardGameDTO(int storeBoardGameNo, int storeCode, int boardgameCode, int boardgameCount, String boardgameLocation) {
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
        return "StoreBoardGameDTO{" +
                "storeBoardGameNo=" + storeBoardGameNo +
                ", storeCode='" + storeCode + '\'' +
                ", boardgameCode='" + boardgameCode + '\'' +
                ", boardgameCount='" + boardgameCount + '\'' +
                ", boardgameLocation='" + boardgameLocation + '\'' +
                '}';
    }
}
