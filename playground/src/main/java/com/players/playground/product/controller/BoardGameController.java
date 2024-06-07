package com.players.playground.product.controller;

import com.players.playground.common.Criteria;
import com.players.playground.common.PageDTO;
import com.players.playground.common.PagingResponseDTO;
import com.players.playground.common.ResponseDTO;
import com.players.playground.product.entity.BoardGame;
import com.players.playground.product.service.BoardGameService;
import io.swagger.v3.oas.annotations.Operation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/boardgame")
public class BoardGameController {


    private final BoardGameService boardGameService;

    private static final Logger log = LoggerFactory.getLogger(com.players.playground.member.service.AuthService.class);


    public BoardGameController(BoardGameService boardGameService) {
        this.boardGameService = boardGameService;
    }

    @Operation(summary = "전체 보드게임 조회", description = "전체 보드게임 조회 및 페이징 처리가 진행됩니다.", tags = { "StoreController" })
    @GetMapping("")
    public ResponseEntity<ResponseDTO> selectBoardGameListWithPaging(
            @RequestParam(name = "offset", defaultValue = "1") String offset) {

        log.info("[StoreController] selectStoreListWithPaging : " + offset);

        int total = boardGameService.selectBoardGameTotal();

        Criteria cri = new Criteria(Integer.valueOf(offset), 10);
        PagingResponseDTO pagingResponseDTO = new PagingResponseDTO();

        pagingResponseDTO.setData(boardGameService.selectStoreListWithPaging(cri));

        pagingResponseDTO.setPageInfo(new PageDTO(cri, total));

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "매장 페이징 조회 성공", pagingResponseDTO));

    }

    @Operation(summary = "전체 보드게임 조회", description = "전체 보드게임 조회됩니다.", tags = { "StoreController" })
    @GetMapping("/all")
    public ResponseEntity<ResponseDTO> selectBoardgameAll() {

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "전체 보드게임 조회 성공", boardGameService.selectBoardgameAll()));

    }

    @Operation(summary = "상세 보드게임 조회", description = "상세 보드게임 조회됩니다.", tags = { "StoreController" })
    @GetMapping("/{boardgameCode}")
    public ResponseEntity<ResponseDTO> findBoardgameByCode(@PathVariable String boardgameCode) {

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "상세 매장 조회 성공", boardGameService.findBoardgameByCode(boardgameCode)));

    }

    @Operation(summary = "상세 보드게임 이름 조회", description = "상세 보드게임 이름 조회됩니다.", tags = { "StoreController" })
    @GetMapping("/boardgameName/{boardgameName}")
    public ResponseEntity<ResponseDTO> findBoardgameByBoardgameName(@PathVariable String boardgameName) {

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "상세 매장 조회 성공", boardGameService.findBoardgameByBoardgameName(boardgameName)));

    }



}
