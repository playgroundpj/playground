package com.players.playground.store.controller;

import com.players.playground.common.ResponseDTO;
import com.players.playground.store.service.StoreAuthService;
import io.swagger.v3.oas.annotations.Operation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class StoreAuthController {

    private final StoreAuthService authService;

    private static final Logger log = LoggerFactory.getLogger(com.players.playground.member.service.AuthService.class);

    @Autowired
    public StoreAuthController(StoreAuthService authService) {
        this.authService = authService;
    }

    @Operation(summary = "전체 매장 조회", description = "전체 매장을 조회합니다.", tags = { "AuthController" })
    @GetMapping("/shop")
    public ResponseEntity<ResponseDTO> findShopAll() {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "전체 매장 조회 성공.", authService.findShopAll()));
    }

    @Operation(summary = "상세 매장 조회", description = "매장 1개를 조회합니다.", tags = { "AuthController" })
    @GetMapping("/shop/{shopCode}")
    public ResponseEntity<ResponseDTO> findShopByCode(@PathVariable String shopCode) {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "상세 매장 조회 성공.", authService.findShopByCode(shopCode)));
    }


}
