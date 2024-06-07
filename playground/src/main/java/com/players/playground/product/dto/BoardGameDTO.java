package com.players.playground.product.dto;

public class BoardGameDTO {

    private int boardgameCode;
    private String boardgameName;
    private String difficulty;
    private String releaseDate;
    private int minPlayer;
    private int maxPlayer;
    private int playtime;
    private String boardgameRule;
    private String boardgameImgURL1;
    private String boardgameImgURL2;
    private String boardgameImgURL3;

    public BoardGameDTO() {
    }

    public BoardGameDTO(int boardgameCode, String boardgameName, String difficulty, String releaseDate, int minPlayer, int maxPlayer, int playtime, String boardgameRule, String boardgameImgURL1, String boardgameImgURL2, String boardgameImgURL3) {
        this.boardgameCode = boardgameCode;
        this.boardgameName = boardgameName;
        this.difficulty = difficulty;
        this.releaseDate = releaseDate;
        this.minPlayer = minPlayer;
        this.maxPlayer = maxPlayer;
        this.playtime = playtime;
        this.boardgameRule = boardgameRule;
        this.boardgameImgURL1 = boardgameImgURL1;
        this.boardgameImgURL2 = boardgameImgURL2;
        this.boardgameImgURL3 = boardgameImgURL3;
    }

    public int getBoardgameCode() {
        return boardgameCode;
    }

    public void setBoardgameCode(int boardgameCode) {
        this.boardgameCode = boardgameCode;
    }

    public String getBoardgameName() {
        return boardgameName;
    }

    public void setBoardgameName(String boardgameName) {
        this.boardgameName = boardgameName;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public String getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(String releaseDate) {
        this.releaseDate = releaseDate;
    }

    public int getMinPlayer() {
        return minPlayer;
    }

    public void setMinPlayer(int minPlayer) {
        this.minPlayer = minPlayer;
    }

    public int getMaxPlayer() {
        return maxPlayer;
    }

    public void setMaxPlayer(int maxPlayer) {
        this.maxPlayer = maxPlayer;
    }

    public int getPlaytime() {
        return playtime;
    }

    public void setPlaytime(int playtime) {
        this.playtime = playtime;
    }

    public String getBoardgameRule() {
        return boardgameRule;
    }

    public void setBoardgameRule(String boardgameRule) {
        this.boardgameRule = boardgameRule;
    }

    public String getBoardgameImgURL1() {
        return boardgameImgURL1;
    }

    public void setBoardgameImgURL1(String boardgameImgURL1) {
        this.boardgameImgURL1 = boardgameImgURL1;
    }

    public String getBoardgameImgURL2() {
        return boardgameImgURL2;
    }

    public void setBoardgameImgURL2(String boardgameImgURL2) {
        this.boardgameImgURL2 = boardgameImgURL2;
    }

    public String getBoardgameImgURL3() {
        return boardgameImgURL3;
    }

    public void setBoardgameImgURL3(String boardgameImgURL3) {
        this.boardgameImgURL3 = boardgameImgURL3;
    }

    @Override
    public String toString() {
        return "BoardGameDTO{" +
                "boardgameCode=" + boardgameCode +
                ", boardgameName='" + boardgameName + '\'' +
                ", difficulty='" + difficulty + '\'' +
                ", releaseDate='" + releaseDate + '\'' +
                ", minPlayer=" + minPlayer +
                ", maxPlayer=" + maxPlayer +
                ", playtime=" + playtime +
                ", boardgameRule='" + boardgameRule + '\'' +
                ", boardgameImgURL1='" + boardgameImgURL1 + '\'' +
                ", boardgameImgURL2='" + boardgameImgURL2 + '\'' +
                ", boardgameImgURL3='" + boardgameImgURL3 + '\'' +
                '}';
    }
}
