package com.players.playground.Board_Notice;
package com.players.playground.Board_Notice.dto;

import java.time.LocalDate;

public class NoticeDTO {

    private int noticeCode;
    private int memberCode;
    private String noticeTitle;
    private String noticeContent;
    private String createDate;
    private String modifyedDate;
    private LocalDate createDate;
    private LocalDate modifyedDate;
    private String noticeCategory;

    public NoticeDTO() {
    }

    public NoticeDTO(int noticeCode, int memberCode, String noticeTitle, String noticeContent, String createDate, String modifyedDate, String noticeCategory) {
    public NoticeDTO(int noticeCode, int memberCode, String noticeTitle, String noticeContent, LocalDate createDate, LocalDate modifyedDate, String noticeCategory) {
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

    public String getCreateDate() {
    public LocalDate getCreateDate() {
        return createDate;
    }

    public void setCreateDate(String createDate) {
    public void setCreateDate(LocalDate createDate) {
        this.createDate = createDate;
    }

    public String getModifyedDate() {
    public LocalDate getModifyedDate() {
        return modifyedDate;
    }

    public void setModifyedDate(String modifyedDate) {
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
        return "NoticeDTO{" +
                "noticeCode=" + noticeCode +
                ", memberCode=" + memberCode +
                ", noticeTitle='" + noticeTitle + '\'' +
                ", noticeContent='" + noticeContent + '\'' +
                ", createDate='" + createDate + '\'' +
                ", modifyedDate='" + modifyedDate + '\'' +
                ", createDate=" + createDate +
                ", modifyedDate=" + modifyedDate +
                ", noticeCategory='" + noticeCategory + '\'' +
                '}';
    }
}