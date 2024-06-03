package com.players.playground.Board_Notice.dto;

public class NoticeImageDTO {
    
        private int imageNo;
        private String imageUrl;
        private int noticeCode;
        private int memberCode;

    public NoticeImageDTO() {
    }

    public NoticeImageDTO(int imageNo, String imageUrl, int noticeCode, int memberCode) {
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


