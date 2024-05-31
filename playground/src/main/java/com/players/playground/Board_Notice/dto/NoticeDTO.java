package com.players.playground.Board_Notice;

public class NoticeDTO {

    private int noticeCode;
    private int memberCode;
    private String noticeTitle;
    private String noticeContent;
    private String createDate;
    private String modifyedDate;
    private String noticeCategory;

    public NoticeDTO() {
    }

    public NoticeDTO(int noticeCode, int memberCode, String noticeTitle, String noticeContent, String createDate, String modifyedDate, String noticeCategory) {
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
        return createDate;
    }

    public void setCreateDate(String createDate) {
        this.createDate = createDate;
    }

    public String getModifyedDate() {
        return modifyedDate;
    }

    public void setModifyedDate(String modifyedDate) {
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
                ", noticeCategory='" + noticeCategory + '\'' +
                '}';
    }
}