package com.players.playground.store.controller;

import com.players.playground.common.Criteria;
import com.players.playground.common.PageDTO;
import com.players.playground.common.PagingResponseDTO;
import com.players.playground.common.ResponseDTO;
import com.players.playground.store.dto.StoreDTO;
import com.players.playground.store.service.StoreService;
import io.swagger.v3.oas.annotations.Operation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
public class StoreController {


    private static final Logger log = LoggerFactory.getLogger(com.players.playground.member.service.AuthService.class);

    private final StoreService storeService;

    @Autowired
    public StoreController(StoreService storeService) {
        this.storeService = storeService;
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

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회 성공", pagingResponseDTO));

    }

    @Operation(summary = "상세 매장 조회", description = "상세 매장 조회됩니다.", tags = { "StoreController" })
    @GetMapping("/shop/{shopCode}")
    public ResponseEntity<ResponseDTO> selectStore(@PathVariable String shopCode) {

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회 성공", storeService.findShopByCode(shopCode)));

    }

    @Operation(summary = "상세 매장 조회", description = "상세 매장 조회됩니다.", tags = { "StoreController" })
    @GetMapping("/shop/shopName/{shopName}")
    public ResponseEntity<ResponseDTO> selectStoreByStoreName(@PathVariable String shopName) {
        log.info("[StoreController] shopName ={}" + shopName);
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회 성공", storeService.findShopByShopCode(shopName)));

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





}
