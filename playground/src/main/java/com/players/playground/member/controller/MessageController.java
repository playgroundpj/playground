package com.players.playground.member.controller;

import com.players.playground.common.ResponseDTO;
import jakarta.annotation.PostConstruct;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.MessageListRequest;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.MessageListResponse;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Random;

@RestController
@RequestMapping("/auth")
public class MessageController {

    private final DefaultMessageService messageService;


    public MessageController(@Value("${COOLSMS.API.KEY}") String apiKey,
                             @Value("${COOLSMS.API.SECRET.KEY}") String apiSecretKey) {
        this.messageService = NurigoApp.INSTANCE.initialize(apiKey, apiSecretKey, "https://api.coolsms.co.kr");
    }


    /* 설명. 회원 가입시 휴대폰 본인 인증 */

    @GetMapping("/sendMessage/{memberPhonenumber}")
    public ResponseEntity<ResponseDTO> sendOne(@PathVariable String memberPhonenumber ) {
        System.out.println("memberPhonenumber : " + memberPhonenumber);

        Random random = new Random();
        int number = 1000 + random.nextInt(9000);
        String checkNumber = String.valueOf(number);

        Message message = new Message();
        // 발신번호 및 수신번호는 반드시 01012345678 형태로 입력되어야 합니다.
        message.setFrom("01048151794");  // 발신자 번호
        message.setTo(memberPhonenumber);    // 수신자 번호
        message.setText("[인증번호 발송] 인증번호는 "+ checkNumber +"입니다.");


//        SingleMessageSentResponse response = this.messageService.sendOne(new SingleMessageSendingRequest(message));
//        System.out.println("response : " + response);

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "유효한 번호입니다.", checkNumber));



    }



}
