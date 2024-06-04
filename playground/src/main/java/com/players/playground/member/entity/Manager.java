package com.players.playground.member.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tbl_manager")
public class Manager {

    @Id
    @Column(name = "manager_no")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int managerNo;

    @Column(name = "member_code")
    private int memberCode;

    @Column(name = "store_code")
    private int storeCode;

    public Manager() {
    }

    public Manager(int managerNo, int memberCode, int storeCode) {
        this.managerNo = managerNo;
        this.memberCode = memberCode;
        this.storeCode = storeCode;
    }

    public int getManagerNo() {
        return managerNo;
    }

    public void setManagerNo(int managerNo) {
        this.managerNo = managerNo;
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

    @Override
    public String toString() {
        return "Manager{" +
                "managerNo=" + managerNo +
                ", memberCode=" + memberCode +
                ", storeCode=" + storeCode +
                '}';
    }
}

