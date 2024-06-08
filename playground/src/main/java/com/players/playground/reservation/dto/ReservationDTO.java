package com.players.playground.reservation.dto;

public class ReservationDTO {

    private int reservationCode;
    private int memberCode;

    private String reservationDate;
    private String reservationDatetime;
    private String reservationState;
    private String reservationModifydate;
    private String reservationModifydatetime;
    private String startTime;
    private String endTime;

    public ReservationDTO() {
    }

    public ReservationDTO(int reservationCode, int memberCode, String reservationDate, String reservationDatetime, String reservationState, String reservationModifydate, String reservationModifydatetime, String startTime, String endTime) {
        this.reservationCode = reservationCode;
        this.memberCode = memberCode;
        this.reservationDate = reservationDate;
        this.reservationDatetime = reservationDatetime;
        this.reservationState = reservationState;
        this.reservationModifydate = reservationModifydate;
        this.reservationModifydatetime = reservationModifydatetime;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    public int getReservationCode() {
        return reservationCode;
    }

    public int getMemberCode() {
        return memberCode;
    }

    public void setMemberCode(int memberCode) {
        this.memberCode = memberCode;
    }

    public void setReservationCode(int reservationCode) {
        this.reservationCode = reservationCode;
    }

    public String getReservationDate() {
        return reservationDate;
    }

    public void setReservationDate(String reservationDate) {
        this.reservationDate = reservationDate;
    }

    public String getReservationDatetime() {
        return reservationDatetime;
    }

    public void setReservationDatetime(String reservationDatetime) {
        this.reservationDatetime = reservationDatetime;
    }

    public String getReservationState() {
        return reservationState;
    }

    public void setReservationState(String reservationState) {
        this.reservationState = reservationState;
    }

    public String getReservationModifydate() {
        return reservationModifydate;
    }

    public void setReservationModifydate(String reservationModifydate) {
        this.reservationModifydate = reservationModifydate;
    }

    public String getReservationModifydatetime() {
        return reservationModifydatetime;
    }

    public void setReservationModifydatetime(String reservationModifydatetime) {
        this.reservationModifydatetime = reservationModifydatetime;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    @Override
    public String toString() {
        return "ReservationDTO{" +
                "reservationCode=" + reservationCode +
                ", memberCode=" + memberCode +
                ", reservationDate='" + reservationDate + '\'' +
                ", reservationDatetime='" + reservationDatetime + '\'' +
                ", reservationState='" + reservationState + '\'' +
                ", reservationModifydate='" + reservationModifydate + '\'' +
                ", reservationModifydatetime='" + reservationModifydatetime + '\'' +
                ", startTime='" + startTime + '\'' +
                ", endTime='" + endTime + '\'' +
                '}';
    }
}
