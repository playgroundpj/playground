package com.players.playground.member.controller;

import com.players.playground.common.ResponseDTO;
import com.players.playground.member.dto.ManagerDTO;
import com.players.playground.member.dto.MemberDTO;
import com.players.playground.member.service.MemberService;
import com.players.playground.store.dto.StoreDTO;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class MemberController {

    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @Operation(summary = "회원 조회 요청", description = "회원 한명이 조회됩니다.", tags = { "MemberController" })
    @GetMapping("/members/{memberId}")
    public ResponseEntity<ResponseDTO> selectMyMemberInfo(@PathVariable String memberId) {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회 성공", memberService.selectMyInfo(memberId)));
    }

    @Operation(summary = "회원 조회 요청", description = "회원 한명이 조회됩니다.", tags = { "MemberController" })
    @GetMapping("/members/memberdetails/{memberCode}")
    public ResponseEntity<ResponseDTO> selectMemberByCode(@PathVariable String memberCode) {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회 성공", memberService.selectInfoByCode(memberCode)));
    }

    @Operation(summary = "회원 전체 조회 요청", description = "회원 전체가 조회됩니다.", tags = { "MemberController" })
    @GetMapping("/members/")
    public ResponseEntity<ResponseDTO> selectMyMemberInfo() {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "전체 조회 성공", memberService.selectAll()));
    }

    @Operation(summary = "회원 수정 요청", description = "회원 한명 정보가 수정됩니다.", tags = { "MemberController" })
    @PutMapping(value = "/members")
    public ResponseEntity<ResponseDTO> updateMember(@ModelAttribute MemberDTO memberDTO, MultipartFile productImage) {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "회원 수정 성공",  memberService.updateMember(memberDTO, productImage)));
    }

    @Operation(summary = "회원 삭제 요청", description = "회원 한명이 탈퇴합니다.", tags = { "MemberController" })
    @DeleteMapping(value = "/members")
    public ResponseEntity<ResponseDTO> deleteMember(@ModelAttribute MemberDTO memberDTO) {
        System.out.println("memberDTO : " + memberDTO);
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "회원 삭제 성공",  memberService.deleteMember(memberDTO)));
    }

    @Operation(summary = "매니저 등록 요청", description = "매니저 등록이 진행됩니다.", tags = {"MemberController"})
    @PostMapping("/members/memberRegist")
    public ResponseEntity<ResponseDTO> mangerSignup(@RequestBody MemberDTO memberDTO) {	// 회원 가입 정보를 받아 냄
        return ResponseEntity
                .ok()
                .body(new ResponseDTO(HttpStatus.CREATED, "회원가입 성공", memberService.signup(memberDTO)));
    }

    @Operation(summary = "매니저별 매장 조회", description = "매니저가 관리하는 매장을 조회니다.", tags = {"MemberController"})
    @GetMapping("/members/managerStore/{memberCode}")
    public ResponseEntity<ResponseDTO> selectManagerStore(@PathVariable String memberCode) {
        return ResponseEntity
                .ok()
                .body(new ResponseDTO(HttpStatus.CREATED, "매니저별 매장 조회 성공", memberService.selectManagerStore(memberCode)));
    }


    @Operation(summary = "매니저별 매장 등록", description = "매니저에게 매장 관리 권한을 부여합니다.", tags = {"MemberController"})
    @PostMapping("/members/managerStore/register")
    public ResponseEntity<ResponseDTO> registManagerStore(@RequestBody ManagerDTO managerDTO) {
        return ResponseEntity
                .ok()
                .body(new ResponseDTO(HttpStatus.CREATED, "매니저 매장 관리 권한을 부여성공", memberService.registManagerStore(managerDTO)));
    }


    @Operation(summary = "매니저별 매장 수정", description = "매니저에게 매장 권리 권한을 수정합니다.", tags = {"MemberController"})
    @PutMapping("/members/managerStore/modify")
    public ResponseEntity<ResponseDTO> updateManagerStore(@RequestBody ManagerDTO managerDTO) {
        return ResponseEntity
                .ok()
                .body(new ResponseDTO(HttpStatus.CREATED, "매니저 매장 관리 권한을 부여성공", memberService.updateManagerStore(managerDTO)));
    }

    @Operation(summary = "매니저별 매장 삭제", description = "매니저에게 매장 권리 권한을 삭제합니다.", tags = {"MemberController"})
    @DeleteMapping("/members/managerStore/delete")
    public ResponseEntity<ResponseDTO> deleteManagerStore(@RequestBody ManagerDTO managerDTO) {
        return ResponseEntity
                .ok()
                .body(new ResponseDTO(HttpStatus.CREATED, "매니저 매장 관리 권한 삭제 성공", memberService.deleteManagerStore(managerDTO)));
    }


}
