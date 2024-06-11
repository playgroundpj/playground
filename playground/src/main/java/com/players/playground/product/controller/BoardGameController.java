package com.players.playground.product.controller;

import com.players.playground.common.Criteria;
import com.players.playground.common.PageDTO;
import com.players.playground.common.PagingResponseDTO;
import com.players.playground.common.ResponseDTO;
import com.players.playground.product.dto.BoardGameDTO;
import com.players.playground.product.service.BoardGameService;
import io.swagger.v3.oas.annotations.Operation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/boardgame")
public class BoardGameController {

    private final BoardGameService boardGameService;
    private static final Logger log = LoggerFactory.getLogger(BoardGameController.class);

    public BoardGameController(BoardGameService boardGameService) {
        this.boardGameService = boardGameService;
    }

    @Operation(summary = "전체 보드게임 조회", description = "전체 보드게임 조회 및 페이징 처리가 진행됩니다.", tags = { "BoardGameController" })
    @GetMapping("")
    public ResponseEntity<ResponseDTO> selectBoardGameListWithPaging(
            @RequestParam(name = "offset", defaultValue = "1") String offset) {

        log.info("[BoardGameController] selectBoardGameListWithPaging : " + offset);

        int total = boardGameService.selectBoardGameTotal();
        Criteria cri = new Criteria(Integer.valueOf(offset), 10);
        PagingResponseDTO pagingResponseDTO = new PagingResponseDTO();

        pagingResponseDTO.setData(boardGameService.selectStoreListWithPaging(cri));
        pagingResponseDTO.setPageInfo(new PageDTO(cri, total));

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "보드게임 페이징 조회 성공", pagingResponseDTO));
    }

    @Operation(summary = "전체 보드게임 조회", description = "전체 보드게임 조회됩니다.", tags = { "BoardGameController" })
    @GetMapping("/all")
    public ResponseEntity<ResponseDTO> selectBoardgameAll() {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "전체 보드게임 조회 성공", boardGameService.selectBoardgameAll()));
    }

    @Operation(summary = "상세 보드게임 조회", description = "상세 보드게임 조회됩니다.", tags = { "BoardGameController" })
    @GetMapping("/{boardgameCode}")
    public ResponseEntity<ResponseDTO> findBoardgameByCode(@PathVariable String boardgameCode) {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "상세 보드게임 조회 성공", boardGameService.findBoardgameByCode(boardgameCode)));
    }

    @Operation(summary = "상세 보드게임 이름 조회", description = "상세 보드게임 이름 조회됩니다.", tags = { "BoardGameController" })
    @GetMapping("/boardgameName/{boardgameName}")
    public ResponseEntity<ResponseDTO> findBoardgameByBoardgameName(@PathVariable String boardgameName) {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "상세 보드게임 조회 성공", boardGameService.findBoardgameByBoardgameName(boardgameName)));
    }


    @Operation(summary = "수정을 위한 상세 보드게임 이름 조회", description = "수정을 위한 상세 보드게임 이름 조회됩니다.", tags = { "BoardGameController" })
    @GetMapping("/boardgameCodeWithouUrl/{boardgameCode}")
    public ResponseEntity<ResponseDTO> findBoardgameByBoardgameCodeWithoutUrl(@PathVariable String boardgameCode) {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "수정을 위한 상세 보드게임 조회 성공", boardGameService.findBoardgameByBoardgameCodeWithoutUrl(boardgameCode)));
    }



    @Operation(summary = "보드게임 수정", description = "보드게임 정보를 수정합니다.", tags = { "BoardGameController" })
    @PutMapping("/modify")
    public ResponseEntity<ResponseDTO> modifyBoardGame(@RequestBody BoardGameDTO boardGameDTO) {
        boardGameService.modifyBoardGame(boardGameDTO);
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "보드게임 수정 성공", null));
    }

    @Operation(summary = "보드게임 등록", description = "새로운 보드게임을 등록합니다.", tags = { "BoardGameController" })
    @PostMapping("/register")
    public ResponseEntity<ResponseDTO> registerBoardGame(@RequestBody BoardGameDTO boardGameDTO) {
        boardGameService.registerBoardGame(boardGameDTO);
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "보드게임 등록 성공", null));
    }

    @Operation(summary = "보드게임 삭제", description = "보드게임을 삭제합니다.", tags = { "BoardGameController" })
    @DeleteMapping("/delete/{boardgameCode}")
    public ResponseEntity<ResponseDTO> deleteBoardGame(@PathVariable String boardgameCode) {
        boardGameService.deleteBoardGame(boardgameCode);
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "보드게임 삭제 성공", null));
    }



}
