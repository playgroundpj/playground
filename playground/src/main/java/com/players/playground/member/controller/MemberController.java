package com.players.playground.member.controller;

import com.players.playground.common.ResponseDTO;
import com.players.playground.member.dto.MemberDTO;
import com.players.playground.member.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

}
