package com.players.playground.Board_Review.dto;

import java.time.LocalDate;

public class ReviewDTO {

    private int reviewCode;
    private int memberCode;
    private int storeCode;
    private String reviewTitle;
    private String reviewContent;
    private LocalDate createDate;
    private LocalDate modifyedDate;
    private int reviewStar;
    private String memberNickname;  // 필드만 추가
    private String storeName;   // 필드만 추가

    public ReviewDTO() {
    }

    public ReviewDTO(int reviewCode, int memberCode, int storeCode, String reviewTitle, String reviewContent, LocalDate createDate, LocalDate modifyedDate, int reviewStar, String memberNickname, String storeName) {
        this.reviewCode = reviewCode;
        this.memberCode = memberCode;
        this.storeCode = storeCode;
        this.reviewTitle = reviewTitle;
        this.reviewContent = reviewContent;
        this.createDate = createDate;
        this.modifyedDate = modifyedDate;
        this.reviewStar = reviewStar;
        this.memberNickname = memberNickname;
        this.storeName = storeName;
    }

    public int getReviewCode() {
        return reviewCode;
    }

    public void setReviewCode(int reviewCode) {
        this.reviewCode = reviewCode;
    }

    public int getMemberCode() {
        return memberCode;
    }

    public void setMemberCode(int memberCode) {
        this.memberCode = memberCode;
    }

    public int getStoreCode() {
        return storeCode;
    }

    public void setStoreCode(int storeCode) {
        this.storeCode = storeCode;
    }

    public String getReviewTitle() {
        return reviewTitle;
    }

    public void setReviewTitle(String reviewTitle) {
        this.reviewTitle = reviewTitle;
    }

    public String getReviewContent() {
        return reviewContent;
    }

    public void setReviewContent(String reviewContent) {
        this.reviewContent = reviewContent;
    }

    public LocalDate getCreateDate() {
        return createDate;
    }

    public void setCreateDate(LocalDate createDate) {
        this.createDate = createDate;
    }

    public LocalDate getModifyedDate() {
        return modifyedDate;
    }

    public void setModifyedDate(LocalDate modifyedDate) {
        this.modifyedDate = modifyedDate;
    }

    public int getReviewStar() {
        return reviewStar;
    }

    public void setReviewStar(int reviewStar) {
        this.reviewStar = reviewStar;
    }

    public String getMemberNickname() {
        return memberNickname;
    }

    public void setMemberNickname(String memberNickname) {
        this.memberNickname = memberNickname;
    }

    public String getStoreName() {
        return storeName;
    }

    public void setStoreName(String storeName) {
        this.storeName = storeName;
    }

    @Override
    public String toString() {
        return "ReviewDTO{" +
                "reviewCode=" + reviewCode +
                ", memberCode=" + memberCode +
                ", storeCode=" + storeCode +
                ", reviewTitle='" + reviewTitle + '\'' +
                ", reviewContent='" + reviewContent + '\'' +
                ", createDate=" + createDate +
                ", modifyedDate=" + modifyedDate +
                ", reviewStar=" + reviewStar +
                ", memberNickname='" + memberNickname + '\'' +
                ", storeName='" + storeName + '\'' +
                '}';
    }
}
