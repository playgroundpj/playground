package com.players.playground.product.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tbl_boardgameimage")
public class BoardGameImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "boardgame_code")
    private Long boardgameCode;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Long getBoardgameCode() {
        return boardgameCode;
    }

    public void setBoardgameCode(Long boardgameCode) {
        this.boardgameCode = boardgameCode;
    }
}
