package com.players.playground.product.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tbl_boardgame")
public class BoardGame {

    @Id
    @Column(name = "boardgame_code")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int boardgameCode;

    @Column(name = "boardgame_name")
    private String boardgameName;

    @Column(name = "difficulty")
    private String difficulty;

    @Column(name = "release_date")
    private String releaseDate;

    @Column(name = "min_player")
    private int minPlayer;

    @Column(name = "max_player")
    private int maxPlayer;

    @Column(name = "playtime")
    private int playtime;

    @Column(name = "boardgame_rule")
    private String boardgameRule;

    @Column(name = "boardgame_img_url1")
    private String boardgameImgURL1;

    @Column(name = "boardgame_img_url2")
    private String boardgameImgURL2;

    @Column(name = "boardgame_img_url3")
    private String boardgameImgURL3;

    // Default constructor
    public BoardGame() {}

    // Parameterized constructor
    public BoardGame(int boardgameCode, String boardgameName, String difficulty, String releaseDate, int minPlayer, int maxPlayer, int playtime, String boardgameRule, String boardgameImgURL1, String boardgameImgURL2, String boardgameImgURL3) {
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

    // Getters and Setters
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
        return "BoardGame{" +
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
