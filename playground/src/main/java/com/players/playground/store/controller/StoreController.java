package com.players.playground.store.controller;

import com.players.playground.common.Criteria;
import com.players.playground.common.PageDTO;
import com.players.playground.common.PagingResponseDTO;
import com.players.playground.common.ResponseDTO;
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


}
