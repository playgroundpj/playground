package com.players.playground.Board_Notice.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tbl_noticeimage")
public class NoticeImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "image_no")
    private int imageNo;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "notice_code")
    private int noticeCode;

    @Column(name = "member_code")
    private int memberCode;

    public NoticeImage() {
    }

    public NoticeImage(int imageNo, String imageUrl, int noticeCode, int memberCode) {
        this.imageNo = imageNo;
        this.imageUrl = imageUrl;
        this.noticeCode = noticeCode;
        this.memberCode = memberCode;
    }

    // Getters and Setters
    public int getImageNo() {
        return imageNo;
    }

    public void setImageNo(int imageNo) {
        this.imageNo = imageNo;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public int getNoticeCode() {
        return noticeCode;
    }

    public void setNoticeCode(int noticeCode) {
        this.noticeCode = noticeCode;
    }

    public int getMemberCode() {
        return memberCode;
    }

    public void setMemberCode(int memberCode) {
        this.memberCode = memberCode;
    }

    @Override
    public String toString() {
        return "NoticeimageDTO{" +
                "imageNo=" + imageNo +
                ", imageUrl='" + imageUrl + '\'' +
                ", noticeCode=" + noticeCode +
                ", memberCode=" + memberCode +
                '}';
    }

}
