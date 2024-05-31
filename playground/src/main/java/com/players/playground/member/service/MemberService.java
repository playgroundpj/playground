package com.players.playground.member.service;

import com.players.playground.common.ResponseDTO;
import com.players.playground.member.dto.MemberDTO;
import com.players.playground.member.entity.Member;
import com.players.playground.member.entity.MemberRole;
import com.players.playground.member.repository.MemberRepository;
import com.players.playground.member.repository.MemberRoleRepository;
import com.players.playground.util.FileUploadUtils;
import jakarta.transaction.Transactional;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class MemberService {

    private static final Logger log = LoggerFactory.getLogger(MemberService.class);
    private final MemberRepository memberRepository;
    private final ModelMapper modelMapper;
    private final MemberRoleRepository memberRoleRepository;

    private final DefaultMessageService messageService;
    private final PasswordEncoder passwordEncoder;

    /* 설명. 이미지 파일 저장 경로와 응답용 URL (WebConfig 설정파일 추가하기) */
    @Value("${image.image-dir}")
    private String IMAGE_DIR;
    @Value("${image.image-url}")
    private String IMAGE_URL;

    @Autowired
    public MemberService(MemberRepository memberRepository, ModelMapper modelMapper, MemberRoleRepository memberRoleRepository, @Value("${COOLSMS.API.KEY}") String apiKey,
                         @Value("${COOLSMS.API.SECRET.KEY}") String apiSecretKey, PasswordEncoder passwordEncoder) {
        this.memberRepository = memberRepository;
        this.modelMapper = modelMapper;
        this.memberRoleRepository = memberRoleRepository;
        this.messageService = NurigoApp.INSTANCE.initialize(apiKey, apiSecretKey, "https://api.coolsms.co.kr");
        this.passwordEncoder = passwordEncoder;
    }

    public MemberDTO selectMyInfo(String memberId) {
        log.info("[MemberService] getMyInfo Start =======================");

        Member member = memberRepository.findByMemberId(memberId);
        log.info("[MemberService] {}", member);
        log.info("[MemberService] getMyInfo End =========================");

        return modelMapper.map(member, MemberDTO.class);
    }

    public Object selectAll() {
        log.info("[MemberService] selectAll Start =======================");

        List<Member> memberList = memberRepository.findAll();
        log.info("[MemberService] {}", memberList);

        List<MemberDTO> memberDTOList = memberList.stream()
                .map(member -> modelMapper.map(member, MemberDTO.class))
                .collect(Collectors.toList());

        log.info("[MemberService] selectAll End =========================");

        return memberDTOList;
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

    public MemberDTO findIdByPhonenumber(String memberPhonenumber) {
        log.info("[MemberService] findIdByPhonenumber() Start");
        log.info("[MemberService] memberPhonenumber : " + memberPhonenumber);

            /* 설명. 연락처로 회원테이블 조회 */
        Member member = memberRepository.findByMemberPhonenumber(memberPhonenumber);

        return modelMapper.map(member, MemberDTO.class);

    }

    @Transactional
    public Object findPassword(MemberDTO memberDTO) {
        log.info("[MemberService] findPassword() Start");
        log.info("[MemberService] memberDTO : " + memberDTO);

        Member member = memberRepository.findByMemberId(memberDTO.getMemberId());

        if(member != null){
            if(member.getMemberPhonenumber().equals(memberDTO.getMemberPhonenumber())){
                
                /* 설명. 초기화될 비밀번호 생성 */
                String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                Random random = new Random();
                StringBuilder stringBuilder = new StringBuilder(8);

                for (int i = 0; i < 8; i++) {
                    int index = random.nextInt(characters.length());
                    stringBuilder.append(characters.charAt(index));
                }

                String initailPassword = stringBuilder.toString();

                /* 설명. 문자로 비밀번호 발송 */
                Message message = new Message();
                // 발신번호 및 수신번호는 반드시 01012345678 형태로 입력되어야 합니다.
                message.setFrom("01048151794");  // 발신자 번호
                message.setTo(memberDTO.getMemberPhonenumber());    // 수신자 번호
                message.setText("[비밀번호 발송] 초기화된 비밀번호는 "+ initailPassword +"입니다.");

//                SingleMessageSentResponse response = this.messageService.sendOne(new SingleMessageSendingRequest(message));
//                System.out.println("response : " + response);

                /* 설명. 초기화된 비밀번호 암호화 및 DB 수정 */
                member.setMemberPassword(passwordEncoder.encode(initailPassword));

                log.info("[MemberService] 비밀번호 초기화 성공");

                Object[] result = new Object[2];
                result[0] = modelMapper.map(member, MemberDTO.class);
                result[1] = initailPassword;

                return result;
            }else{

                log.info("[MemberService] 회원정보의 연락처 불일치");
                return "회원정보의 연락처 불일치";
            }

        }else{

            log.info("[MemberService] 존재하지 않는 아이디");
            return "존재하지 않는 아이디";
        }


    }


}
