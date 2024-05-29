package com.players.playground.member.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "tbl_member")
public class Member {

    @Id
    @Column(name = "member_code")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int memberCode;

    @Column(name = "member_id")
    private String memberId;

    @Column(name = "member_password")
    private String memberPassword;

    @Column(name = "member_nickname")
    private String memberNickname;

    @Column(name = "member_birth")
    private String memberBirth;

    @Column(name = "member_phone_number")
    private String memberPhonenumber;

    @Column(name = "member_address")
    private String memberAddress;

    @Column(name = "member_email")
    private String memberEmail;

    @OneToMany
    @JoinColumn(name = "member_code")
    private List<MemberRole> memberRole;

    public Member() {
    }

    public Member(int memberCode, String memberId, String memberPassword, String memberNickname, String memberBirth, String memberPhonenumber, String memberAddress, String memberEmail, List<MemberRole> memberRole) {
        this.memberCode = memberCode;
        this.memberId = memberId;
        this.memberPassword = memberPassword;
        this.memberNickname = memberNickname;
        this.memberBirth = memberBirth;
        this.memberPhonenumber = memberPhonenumber;
        this.memberAddress = memberAddress;
        this.memberEmail = memberEmail;
        this.memberRole = memberRole;
    }

    public int getMemberCode() {
        return memberCode;
    }

    public void setMemberCode(int memberCode) {
        this.memberCode = memberCode;
    }

    public String getMemberId() {
        return memberId;
    }

    public void setMemberId(String memberId) {
        this.memberId = memberId;
    }

    public String getMemberPassword() {
        return memberPassword;
    }

    public void setMemberPassword(String memberPassword) {
        this.memberPassword = memberPassword;
    }

    public String getMemberNickname() {
        return memberNickname;
    }

    public void setMemberNickname(String memberNickname) {
        this.memberNickname = memberNickname;
    }

    public String getMemberBirth() {
        return memberBirth;
    }

    public void setMemberBirth(String memberBirth) {
        this.memberBirth = memberBirth;
    }

    public String getMemberPhonenumber() {
        return memberPhonenumber;
    }

    public void setMemberPhonenumber(String memberPhonenumber) {
        this.memberPhonenumber = memberPhonenumber;
    }

    public String getMemberAddress() {
        return memberAddress;
    }

    public void setMemberAddress(String memberAddress) {
        this.memberAddress = memberAddress;
    }

    public String getMemberEmail() {
        return memberEmail;
    }

    public void setMemberEmail(String memberEmail) {
        this.memberEmail = memberEmail;
    }

    public List<MemberRole> getMemberRole() {
        return memberRole;
    }

    public void setMemberRole(List<MemberRole> memberRole) {
        this.memberRole = memberRole;
    }

    @Override
    public String toString() {
        return "Member{" +
                "memberCode=" + memberCode +
                ", memberId='" + memberId + '\'' +
                ", memberPassword='" + memberPassword + '\'' +
                ", memberNickname='" + memberNickname + '\'' +
                ", memberBirth='" + memberBirth + '\'' +
                ", memberPhonenumber='" + memberPhonenumber + '\'' +
                ", memberAddress='" + memberAddress + '\'' +
                ", memberEmail='" + memberEmail + '\'' +
                ", memberRole=" + memberRole +
                '}';
    }
}
