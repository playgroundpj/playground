package com.players.playground.Board_Notice.entity;

import com.players.playground.member.entity.Member;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table ( name = "tbl_notice")
public class Notice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notice_code")
    private int noticeCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_code", insertable = false, updatable = false)
    private Member member;

    @Column(name = "member_code")
    private int memberCode;

    @Column(name = "notice_title")
    private String noticeTitle;

    @Column(name = "notice_content")
    private String noticeContent;


    @Column(name = "create_date", nullable = false)
    private LocalDate createDate;

    @Column(name = "modifyed_date")
    private LocalDate modifyedDate;


    @Column(name = "notice_category")
    private String noticeCategory;

    @PrePersist
    protected  void  onCreate(){
        createDate = LocalDate.now();
    }

    @PreUpdate
    protected void onUpdate() {
        modifyedDate = LocalDate.now();
    }

    public Notice() {
    }


    public Notice(int noticeCode, Member member, String noticeTitle, String noticeContent, LocalDate createDate, LocalDate modifyedDate, String noticeCategory) {
        this.noticeCode = noticeCode;
        this.member = member;
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

    public Member getMember() {
        return member;
    }

    public void setMember(Member member) {
        this.member = member;
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
                ", member=" + member +
                ", noticeTitle='" + noticeTitle + '\'' +
                ", noticeContent='" + noticeContent + '\'' +
                ", createDate=" + createDate +
                ", modifyedDate=" + modifyedDate +
                ", noticeCategory='" + noticeCategory + '\'' +
                '}';
    }
}
