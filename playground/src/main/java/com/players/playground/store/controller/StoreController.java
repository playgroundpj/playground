package com.players.playground.store.controller;

import com.players.playground.common.Criteria;
import com.players.playground.common.PageDTO;
import com.players.playground.common.PagingResponseDTO;
import com.players.playground.common.ResponseDTO;
import com.players.playground.product.dto.BoardGameDTO;
import com.players.playground.product.dto.MenuDTO;
import com.players.playground.product.service.BoardGameService;
import com.players.playground.product.service.MenuService;
import com.players.playground.reservation.service.ReservationService;
import com.players.playground.store.dto.*;
import com.players.playground.store.service.*;
import io.swagger.v3.oas.annotations.Operation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class StoreController {


    private static final Logger log = LoggerFactory.getLogger(com.players.playground.member.service.AuthService.class);

    private final StoreService storeService;
    private final StoreBoardGameService storeBoardGameService;
    private final BoardGameService boardGameService;
    private final StoreGameTableService storeGameTableService;
    private final GameTableService gameTableService;
    private final StoreMenuService storeMenuService;
    private final MenuService menuService;
    private final StoreReservationService storeReservationService;
    private final ReservationService reservationService;


    @Autowired
    public StoreController(StoreService storeService, StoreBoardGameService storeBoardGameService, BoardGameService boardGameService, StoreGameTableService storeGameTableService, GameTableService gameTableService, StoreMenuService storeMenuService, MenuService menuService, StoreReservationService storeReservationService, ReservationService reservationService) {
        this.storeService = storeService;
        this.storeBoardGameService = storeBoardGameService;
        this.boardGameService = boardGameService;
        this.storeGameTableService = storeGameTableService;
        this.gameTableService = gameTableService;
        this.storeMenuService = storeMenuService;
        this.menuService = menuService;
        this.storeReservationService = storeReservationService;
        this.reservationService = reservationService;
    }

    @Operation(summary = "전체 매장 조회", description = "전체 매장 조회 및 페이징 처리가 진행됩니다.", tags = { "StoreController" })
    @GetMapping("/shop")
    public ResponseEntity<ResponseDTO> selectStoreListWithPaging(
            @RequestParam(name = "offset", defaultValue = "1") String offset) {

        log.info("[StoreController] selectStoreListWithPaging : " + offset);

        int total = storeService.selectStoreTotal();

        Criteria cri = new Criteria(Integer.valueOf(offset), 8);
        PagingResponseDTO pagingResponseDTO = new PagingResponseDTO();

        pagingResponseDTO.setData(storeService.selectStoreListWithPaging(cri));

        pagingResponseDTO.setPageInfo(new PageDTO(cri, total));

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "매장 페이징 조회 성공", pagingResponseDTO));

    }

    @Operation(summary = "전체 매장 조회", description = "전체 매장 조회됩니다.", tags = { "StoreController" })
    @GetMapping("/shop/all")
    public ResponseEntity<ResponseDTO> selectStoreAll() {

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "매장 전체 조회 성공", storeService.selectStoreAll()));

    }

    @Operation(summary = "상세 매장 조회", description = "상세 매장 조회됩니다.", tags = { "StoreController" })
    @GetMapping("/shop/{shopCode}")
    public ResponseEntity<ResponseDTO> selectStore(@PathVariable String shopCode) {

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "상세 매장 조회 성공", storeService.findShopByCode(shopCode)));

    }

    @Operation(summary = "상세 매장 조회", description = "상세 매장 조회됩니다.", tags = { "StoreController" })
    @GetMapping("/shop/shopName/{shopName}")
    public ResponseEntity<ResponseDTO> selectStoreByStoreName(@PathVariable String shopName) {
        log.info("[StoreController] shopName ={}" + shopName);
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "상세 매장 조회 성공", storeService.findShopByShopCode(shopName)));

    }

    @Operation(summary = "매장 등록", description = "매장을 등록합니다.", tags = { "StoreController" })
    @PostMapping("/shop/regist")
    public ResponseEntity<ResponseDTO> registStore(@RequestBody StoreDTO storeDTO) {

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "매장 등록 성공", storeService.regist(storeDTO)));

    }


    @Operation(summary = "매장 수정", description = "매장 정보 을 수정합니다.", tags = { "StoreController" })
    @PutMapping("/shop/modify")
    public ResponseEntity<ResponseDTO> updateStore(@RequestBody StoreDTO storeDTO) {

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "매장 정보 수정 성공", storeService.updateStore(storeDTO)));

    }

    @Operation(summary = "매장 삭제", description = "매장을 삭제합니다.", tags = { "StoreController" })
    @DeleteMapping("/shop/delete")
    public ResponseEntity<ResponseDTO> deleteStore(@RequestBody StoreDTO storeDTO) {

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "매장 삭제 성공", storeService.deleteStore(storeDTO)));

    }

    @Operation(summary = "매장별 보드게임 전체 조회", description = "매장별 보드게임 전체 조회진행됩니다.", tags = { "StorBoardGameController" })
    @GetMapping("/storeBoardgame/{storeCode}")
    public ResponseEntity<ResponseDTO> selectStoreBoardGameAll(@PathVariable String storeCode) {

        log.info("[StorBoardGameController] storeCode ={}" + storeCode);
        List<StoreBoardGameDTO> storeBoardGameDTOList = (List<StoreBoardGameDTO>) storeBoardGameService.findBoardGameByStoreCode(storeCode);
        List<BoardGameDTO> boardGameDTOList = new ArrayList<>();

        for (int i = 0; i < storeBoardGameDTOList.size(); i++) {
            boardGameDTOList.add(i, boardGameService.findBoardgameByCode(String.valueOf(storeBoardGameDTOList.get(i).getBoardgameCode())));

        }

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "매장별 보드게임 전체 조회 성공", boardGameDTOList));

    }

    @Operation(summary = "매장별 게임테이블 전체 조회", description = "매장별 게임테이블 전체 조회진행됩니다.", tags = { "StorBoardGameController" })
    @GetMapping("/storeGametable/{storeCode}")
    public ResponseEntity<ResponseDTO> selectGametableByStoreCode(@PathVariable String storeCode) {

        log.info("[StorBoardGameController] storeCode ={}" + storeCode);
        List<StoreGametableDTO> storeGametableDTOList = storeGameTableService.selectGametableByStoreCode(storeCode);

        List<GametableDTO> gametableDTOList = new ArrayList<>();

        for (int i = 0; i < storeGametableDTOList.size(); i++) {
            gametableDTOList.add(i,gameTableService.selectGametableByTableCode(storeGametableDTOList.get(i).getTableCode()));
        }

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "매장별 게임테이블 전체 조회 성공", gametableDTOList));

    }

    @Operation(summary = "매장별 메뉴 전체 조회", description = "매장별 메뉴 전체 조회진행됩니다.", tags = { "StorBoardGameController" })
    @GetMapping("/storeMenu/{storeCode}")
    public ResponseEntity<ResponseDTO> selectMenuByStoreCode(@PathVariable String storeCode) {

        log.info("[StorBoardGameController] storeCode ={}" + storeCode);
        List<StoreMenuDTO> storeMenuDTOList = storeMenuService.selectMenuByStoreCode(storeCode);

        List<MenuDTO> menuDTOList = new ArrayList<>();

        for (int i = 0; i < storeMenuDTOList.size(); i++) {
            menuDTOList.add(i, menuService.findMenuByCode(String.valueOf(storeMenuDTOList.get(i).getMenuCode())));

        }

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "매장별 메뉴 전체 조회 성공", menuDTOList));
    }

    @Operation(summary = "게임테이블 전체 조회", description = "게임테이블 전체 조회됩니다.", tags = { "ReservationController" })
    @GetMapping("/gametable")
    public ResponseEntity<ResponseDTO> selectGametableAll() {

        List<GametableDTO> gametableDTOList = gameTableService.selectGametableAll();

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "게임테이블 전체 조회 조회 성공", gametableDTOList));

    }

    @Operation(summary = "매장별 예약 조회", description = "매장별 예약이 조회됩니다.", tags = { "ReservationController" })
    @GetMapping("/storeReservation/{storeCode}")
    public ResponseEntity<ResponseDTO> selectReservationBystoreCode(@PathVariable String storeCode) {

        /* 설명. 매장별 예약 코드 전체 조회 */
        List<StoreReservationDTO> storeReservationList = storeReservationService.selectReservationBystoreCode(storeCode);
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "매장별 예약 조회 성공", storeReservationList));

    }



    @Operation(summary = "게임테이블 상세 조회", description = "게임테이블 상세 조회됩니다.", tags = { "ReservationController" })
    @GetMapping("/gametable/{tableCode}")
    public ResponseEntity<ResponseDTO> selectGametableBytableCode(@PathVariable String tableCode) {

        GametableDTO gametableDTO = gameTableService.selectGametableByTableCode(Integer.valueOf(tableCode));

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "게임테이블 상세 조회 성공", gametableDTO));

    }


}
