package com.players.playground.member.service;

import com.players.playground.member.dto.MemberDTO;
import com.players.playground.member.entity.Member;
import com.players.playground.member.entity.MemberRole;
import com.players.playground.member.repository.MemberRepository;
import com.players.playground.member.repository.MemberRoleRepository;
import com.players.playground.util.FileUploadUtils;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class MemberService {

    private static final Logger log = LoggerFactory.getLogger(MemberService.class);
    private final MemberRepository memberRepository;
    private final ModelMapper modelMapper;
    private final MemberRoleRepository memberRoleRepository;

    private final PasswordEncoder passwordEncoder;

    /* 설명. 이미지 파일 저장 경로와 응답용 URL (WebConfig 설정파일 추가하기) */
    @Value("${image.image-dir}")
    private String IMAGE_DIR;
    @Value("${image.image-url}")
    private String IMAGE_URL;

    @Autowired
    public MemberService(MemberRepository memberRepository, ModelMapper modelMapper, MemberRoleRepository memberRoleRepository, PasswordEncoder passwordEncoder) {
        this.memberRepository = memberRepository;
        this.modelMapper = modelMapper;
        this.memberRoleRepository = memberRoleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public MemberDTO selectMyInfo(String memberId) {
        log.info("[MemberService] getMyInfo Start =======================");

        Member member = memberRepository.findByMemberId(memberId);
        log.info("[MemberService] {}", member);
        log.info("[MemberService] getMyInfo End =========================");

        return modelMapper.map(member, MemberDTO.class);
    }

    public MemberDTO selectNickname(String memberNickname) {
        log.info("[MemberService] getMyInfo Start =======================");

        Member member = memberRepository.findByMemberNickname(memberNickname);
        log.info("[MemberService] {}", member);
        log.info("[MemberService] getMyInfo End =========================");

        return modelMapper.map(member, MemberDTO.class);
    }

    @Transactional
    public Object updateMember(MemberDTO memberDTO, MultipartFile productImage) {
        log.info("[MemberService] updateMember() Start");
        log.info("[MemberService] MemberDTO : {}", memberDTO);

        String replaceFileName = null;
        int result = 0;

        try{

            Member member = memberRepository.findByMemberId(memberDTO.getMemberId());

            log.info("[MemberService] member : {}", member);

            /* 설명. 비밀번호 암호화 */

            member.setMemberId(memberDTO.getMemberId());
            member.setMemberAddress(memberDTO.getMemberAddress());
            member.setMemberBirth(memberDTO.getMemberBirth());
            member.setMemberEmail(memberDTO.getMemberEmail());
            member.setMemberNickname(memberDTO.getMemberNickname());
            member.setMemberPassword(passwordEncoder.encode(memberDTO.getMemberPassword()));

            result = 1;

        }catch (Exception e) {
            log.info("[updateMember] Exception!!");
        }


        return (result > 0) ? "회원 정보 업데이트 성공" : "회원 정보 업데이트 실패";
    }

    @Transactional
    public Object deleteMember(MemberDTO memberDTO) {
        log.info("[MemberService] deleteMember() Start");
        log.info("[MemberService] memberDTO" + memberDTO);
        int result = 0;

        try{

            /* 설명. 회원테이블 뿐만 회원별 권한 테이블에서도 제거해야됨 */
            Member member = memberRepository.findByMemberId(memberDTO.getMemberId());
            if (member != null) {
                // MemberRole 엔티티 삭제
                memberRoleRepository.deleteByMemberNo(member.getMemberCode());

                // Member 엔티티 삭제
                memberRepository.delete(member);

                result = 1;
            }

        }catch(Exception e){
            log.info("[deleteMember] Exception!!");
        }


        return (result > 0) ? "회원 탈퇴 및 삭제 성공" : "회원 탈퇴 및 삭제 실패";
    }
}
