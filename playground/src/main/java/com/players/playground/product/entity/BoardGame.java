package com.players.playground.product.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tbl_boardgame")
public class BoardGame {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardgameCode; // 수정: String -> Long, @GeneratedValue 추가

    private String boardgameName;
    private String difficulty;
    private String releaseDate;
    private int minPlayer;
    private int maxPlayer;
    private int playtime;
    private String boardgameRule;

    // Getters and Setters
    public Long getBoardgameCode() {
        return boardgameCode;
    }

    public void setBoardgameCode(Long boardgameCode) {
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
}
