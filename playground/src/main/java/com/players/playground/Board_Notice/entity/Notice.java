package com.players.playground.Board_Notice.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table ( name = "tbl_notice")
public class Notice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notice_code")
    private int noticeCode;

    @Column(name = "member_code")
    private int memberCode;

    @Column(name = "notice_title")
    private String noticeTitle;

    @Column(name = "notice_content")
    private String noticeContent;


    @Column(name = "create_date")
    private LocalDate createDate;

    @Column(name = "modifyed_date")
    private LocalDate modifyedDate;


    @Column(name = "notice_category")
    private String noticeCategory;

    public Notice() {
    }


    public Notice(int noticeCode, int memberCode, String noticeTitle, String noticeContent, LocalDate createDate, LocalDate modifyedDate, String noticeCategory) {
        this.noticeCode = noticeCode;
        this.memberCode = memberCode;
        this.noticeTitle = noticeTitle;
        this.noticeContent = noticeContent;
        this.createDate = createDate;
        this.modifyedDate = modifyedDate;
        this.noticeCategory = noticeCategory;
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

    public String getNoticeTitle() {
        return noticeTitle;
    }

    public void setNoticeTitle(String noticeTitle) {
        this.noticeTitle = noticeTitle;
    }

    public String getNoticeContent() {
        return noticeContent;
    }

    public void setNoticeContent(String noticeContent) {
        this.noticeContent = noticeContent;
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

    public String getNoticeCategory() {
        return noticeCategory;
    }

    public void setNoticeCategory(String noticeCategory) {
        this.noticeCategory = noticeCategory;
    }

    @Override
    public String toString() {
        return "Notice{" +
                "noticeCode=" + noticeCode +
                ", memberCode=" + memberCode +
                ", noticeTitle='" + noticeTitle + '\'' +
                ", noticeContent='" + noticeContent + '\'' +
                ", createDate=" + createDate +
                ", modifyedDate=" + modifyedDate +
                ", noticeCategory='" + noticeCategory + '\'' +
                '}';
    }
}
