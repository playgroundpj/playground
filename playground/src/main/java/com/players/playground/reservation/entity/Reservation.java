package com.players.playground.reservation.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tbl_reservation")
public class Reservation {

    @Id
    @Column(name = "reservation_code")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int reservationCode;

    @Column(name = "reservation_date")
    private String reservationDate;
    @Column(name = "reservation_datetime")
    private String reservationDatetime;
    @Column(name = "reservation_state")
    private String reservationState;
    @Column(name = "reservation_modify_date")
    private String reservationModifydate;
    @Column(name = "reservation_modify_datetime")
    private String reservationModifydatetime;
    @Column(name = "start_time")
    private String startTime;
    @Column(name = "end_time")
    private String endTime;

    public Reservation() {
    }

    public Reservation(int reservationCode, String reservationDate, String reservationDatetime, String reservationState, String reservationModifydate, String reservationModifydatetime, String startTime, String endTime) {
        this.reservationCode = reservationCode;
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
        return "Reservation{" +
                "reservationCode=" + reservationCode +
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
