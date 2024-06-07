package com.players.playground.store.controller;

import com.players.playground.common.ResponseDTO;
import com.players.playground.product.service.BoardGameService;
import com.players.playground.store.entity.StoreBoardGame;
import com.players.playground.store.service.StoreBoardGameService;
import com.players.playground.store.service.StoreService;
import io.swagger.v3.oas.annotations.Operation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class StoreBoardGameController {

    private static final Logger log = LoggerFactory.getLogger(com.players.playground.member.service.AuthService.class);

    private final StoreBoardGameService storeBoardGameService;
    private final StoreService storeService;
    private final BoardGameService boardGameService;

    @Autowired
    public StoreBoardGameController(StoreBoardGameService storeBoardGameService, StoreService storeService, BoardGameService boardGameService) {
        this.storeBoardGameService = storeBoardGameService;
        this.storeService = storeService;
        this.boardGameService = boardGameService;
    }

//    @Operation(summary = "매장별 보드게임 전체 조회", description = "매장별 보드게임 전체 조회진행됩니다.", tags = { "StoreController" })
//    @GetMapping("/storeBoardgame/{storeCode}")
//    public ResponseEntity<ResponseDTO> selectStoreBoardGameAll(@PathVariable String storeCode) {
//
//
//
//    }




}
