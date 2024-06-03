package com.players.playground.Board_Review.entity;

import com.players.playground.member.entity.Member;
import com.players.playground.store.entity.Store;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "tbl_review")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_code")
    private int reviewCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_code", insertable = false, updatable = false)
    private Member member;

    @Column(name = "member_code")
    private int memberCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "store_code", insertable = false, updatable = false)
    private Store store;

    @Column(name = "store_code")
    private int storeCode;

    @Column(name = "review_title")
    private String reviewTitle;

    @Column(name = "review_content")
    private String reviewContent;

    @Column(name = "create_date")
    private LocalDate createDate;

    @Column(name = "modifyed_date")
    private LocalDate modifyedDate;

    @Column(name = "review_star")
    private int reviewStar;

    @PrePersist
    protected void onCreate() {
        createDate = LocalDate.now();
    }

    @PreUpdate
    protected void onUpdate() {
        modifyedDate = LocalDate.now();
    }

    public Review() {}

    public Review(int memberCode, int storeCode, String reviewTitle, String reviewContent, int reviewStar) {
        this.memberCode = memberCode;
        this.storeCode = storeCode;
        this.reviewTitle = reviewTitle;
        this.reviewContent = reviewContent;
        this.reviewStar = reviewStar;
    }

    // Getters and Setters

    public int getReviewCode() {
        return reviewCode;
    }

    public void setReviewCode(int reviewCode) {
        this.reviewCode = reviewCode;
    }

    public Member getMember() {
        return member;
    }

    public void setMember(Member member) {
        this.member = member;
    }

    public int getMemberCode() {
        return memberCode;
    }

    public void setMemberCode(int memberCode) {
        this.memberCode = memberCode;
    }

    public Store getStore() {
        return store;
    }

    public void setStore(Store store) {
        this.store = store;
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

    @Override
    public String toString() {
        return "Review{" +
                "reviewCode=" + reviewCode +
                ", member=" + member +
                ", memberCode=" + memberCode +
                ", store=" + store +
                ", storeCode=" + storeCode +
                ", reviewTitle='" + reviewTitle + '\'' +
                ", reviewContent='" + reviewContent + '\'' +
                ", createDate=" + createDate +
                ", modifyedDate=" + modifyedDate +
                ", reviewStar=" + reviewStar +
                '}';
    }
}
