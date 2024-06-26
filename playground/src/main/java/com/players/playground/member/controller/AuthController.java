package com.players.playground.member.controller;

import com.players.playground.common.ResponseDTO;
import com.players.playground.member.dto.MemberDTO;
import com.players.playground.member.service.AuthService;
import com.players.playground.member.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/* 설명. 알아둬야 하는 개념들: @RestController, @ResponseBody, ResponseEntity, CORS */
/*
 * 설명. @RestController
 *  Spring에서 RESTful 웹 서비스를 개발하기 위해 @Controller와 @ResponseBody를 결합해놓은 어노테이션.
 *  해당 클래스의 모든 메소드는 HTTP 요청에 대한 View를 반환하지 않고, HTTP 응답 몸체(response body)에
 *  직접 데이터를 작성하게 된다.
 *  이 데이터는 Spring Boot에서 기본적으로 제공하는 MappingJackson2HttpMessageConverter가
 *  내부적으로 ObjectMapper를 활용하여 인코딩 타입(UTF-8) 및 MIME 타입(application/json)이 적용된 JSON 문자열로 반환한다.
 *  즉, 이 많은 작업들을 @RestControlle 어노테이션이 처리해준다.
 * */
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;
    private final MemberService memberService;

    private static final Logger log = LoggerFactory.getLogger(AuthService.class);

    @Autowired
    public AuthController(AuthService authService, MemberService memberService) {
        this.authService = authService;
        this.memberService = memberService;
    }

    /* 설명.
     *  @RequestBody를 통해 RequestBody로 넘어온 JSON 문자열을 파싱해 MemberDTO 속성으로 매핑해 객체로 받아낸다.
     *  (회원 아이디, 비밀번호)
     *  ========================================================================================================
     *  참고로 요청의 body에서 데이터를 뽑아내겠다는 것은 요청이 POST 요청이었다는 것을 알 수 있다.
     *  왜냐하면 GET 요청은 body가 아니라 header에 데이터가 담겨있기 때문이다.
     * */
    @Operation(summary = "로그인요청", description = "로그인 및 인증이 진행됩니다.", tags = {"AuthController"})
    @PostMapping("/login")
    public ResponseEntity<ResponseDTO> login(@RequestBody MemberDTO memberDTO) {

        log.info("[AuthController] login() START");

        /* 설명. ResponseEntity
         *  HTTP 응답 몸체와 헤더, 그리고 상태 코드를 제어할 수 있는 Spring Framework의 클래스다.
         * 	응답으로 변환될 정보가 담긴 모든 요소들을 해당 객체로 만들어서 반환해 준다.(body + header + status)
         *  (ResponseBody와 차별점이 있다면, ResponseEntity는 HTTP 상태 코드나 헤더도 다룰 수 있다.)
         *  필요한 정보들만 담아서 전달할 수 있기 때문에 REST API를 만들 때 유용하게 사용하는 클래스다.
         * 	또한 ResponseEntity를 사용할 때, 생성자 대신 Builder 사용을 권장한다.
         *  (숫자 타입인 상태 코드를 실수로 잘못 입력하지 않도록 메소드들이 제공 된다.)
         * */
        return ResponseEntity
                .ok()
                .body(new ResponseDTO(HttpStatus.OK, "로그인 성공", authService.login(memberDTO)));
        /* 설명. (React 및 Spring 연계 시, 가장 중요!!!!!!!!!!)
         *  ResponseEntity의 body() 메소드를 사용하면 Response객체의 body에 담기는 ResponseDTO는 JSON문자열이 되고
         *  화면단이 React인 곳으로 가면 결국 Store에 해당 리듀서가 관리하는 state 값이 된다.
         */
    }

    @Operation(summary = "회원 가입 요청", description = "회원 가입이 진행됩니다.", tags = {"AuthController"})
    @PostMapping("/signup")
    public ResponseEntity<ResponseDTO> signup(@RequestBody MemberDTO memberDTO) {	// 회원 가입 정보를 받아 냄
        return ResponseEntity
                .ok()
                .body(new ResponseDTO(HttpStatus.CREATED, "회원가입 성공", authService.signup(memberDTO)));
    }

    @Operation(summary = "아이디 중복 체크 요청", description = "아이디가 조회됩니다.", tags = { "AuthController" })
    @GetMapping("/memberId/{memberId}")
    public ResponseEntity<ResponseDTO> selectMyMemberInfo(@PathVariable String memberId) {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "중복된 아이디입니다.", memberService.selectMyInfo(memberId)));
    }


    @Operation(summary = "닉네임 중복 체크 요청", description = "닉네임이 조회됩니다.", tags = { "AuthController" })
    @GetMapping("/memberNickname/{memberNickname}")
    public ResponseEntity<ResponseDTO> selectNickname(@PathVariable String memberNickname) {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "중복된 닉네임입니다.", memberService.selectNickname(memberNickname)));
    }

    @Operation(summary = "아이디 찾기 요청", description = "전화번호로 아이디가 조회됩니다.", tags = { "AuthController" })
    @GetMapping("/memberPhonenumber/{memberPhonenumber}")
    public ResponseEntity<ResponseDTO> findIdByPhonenumber(@PathVariable String memberPhonenumber) {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "아이디 찾기 성공.", memberService.findIdByPhonenumber(memberPhonenumber)));
    }

    @Operation(summary = "비밀번호 찾기 요청", description = "아이디와 연락처를 조회하고 비밀번호를 초기화합니다.", tags = { "AuthController" })
    @PostMapping("/findPassword")
    public ResponseEntity<ResponseDTO> findPassword(@RequestBody MemberDTO memberDTO) {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "비밀번호 초기화 성공.", memberService.findPassword(memberDTO)));
    }






}