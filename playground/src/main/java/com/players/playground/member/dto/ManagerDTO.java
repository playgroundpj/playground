package com.players.playground.member.dto;

public class ManagerDTO {

    private int managerNo;
    private int memberCode;
    private int storeCode;

    public ManagerDTO() {
    }

    public ManagerDTO(int managerNo, int memberCode, int storeCode) {
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
        return "ManagerDTO{" +
                "managerNo=" + managerNo +
                ", memberCode=" + memberCode +
                ", storeCode=" + storeCode +
                '}';
    }
}
