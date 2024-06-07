package com.players.playground.store.dto;

public class StoreBoardGameDTO {

    private int storeBoardGameNo;
    private String storeCode;
    private String boardgameCode;
    private String boardgameCount;
    private String boardgameLocation;

    public StoreBoardGameDTO() {
    }

    public StoreBoardGameDTO(int storeBoardGameNo, String storeCode, String boardgameCode, String boardgameCount, String boardgameLocation) {
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
        return "StoreBoardGameDTO{" +
                "storeBoardGameNo=" + storeBoardGameNo +
                ", storeCode='" + storeCode + '\'' +
                ", boardgameCode='" + boardgameCode + '\'' +
                ", boardgameCount='" + boardgameCount + '\'' +
                ", boardgameLocation='" + boardgameLocation + '\'' +
                '}';
    }
}
