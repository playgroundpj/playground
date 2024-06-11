package com.players.playground.product.controller;

import com.players.playground.common.Criteria;
import com.players.playground.common.PageDTO;
import com.players.playground.common.PagingResponseDTO;
import com.players.playground.common.ResponseDTO;
import com.players.playground.product.entity.Menu;
import com.players.playground.product.service.MenuService;
import io.swagger.v3.oas.annotations.Operation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/menu")
public class MenuController {

    private static final Logger log = LoggerFactory.getLogger(com.players.playground.member.service.AuthService.class);

    private final MenuService menuService;


    public MenuController(MenuService menuService) {
        this.menuService = menuService;
    }

    @Operation(summary = "전체 메뉴 조회", description = "전체 메뉴 조회 및 페이징 처리가 진행됩니다.", tags = { "MenuController" })
    @GetMapping("")
    public ResponseEntity<ResponseDTO> selectMenuListWithPaging(
            @RequestParam(name = "offset", defaultValue = "1") String offset) {

        log.info("[MenuController] selectMenuListWithPaging : " + offset);

        int total = menuService.selectMenuTotal();

        Criteria cri = new Criteria(Integer.valueOf(offset), 10);
        PagingResponseDTO pagingResponseDTO = new PagingResponseDTO();

        pagingResponseDTO.setData(menuService.selectMenuListWithPaging(cri));

        pagingResponseDTO.setPageInfo(new PageDTO(cri, total));

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "메뉴 페이징 조회 성공", pagingResponseDTO));

    }

    @Operation(summary = "전체 메뉴 조회", description = "전체 메뉴 조회됩니다.", tags = { "MenuController" })
    @GetMapping("/all")
    public ResponseEntity<ResponseDTO> selectMenuAll() {

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "전체 메뉴 조회 성공", menuService.selectMenuAll()));

    }

    @Operation(summary = "상세 메뉴 조회", description = "상세 메뉴 조회됩니다.", tags = { "MenuController" })
    @GetMapping("/{menuCode}")
    public ResponseEntity<ResponseDTO> findMenuByCode(@PathVariable String menuCode) {

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "상세 메뉴 조회 성공", menuService.findMenuByCode(menuCode)));

    }

    @Operation(summary = "상세 메뉴 이름 조회", description = "상세 메뉴 이름 조회됩니다.", tags = { "MenuController" })
    @GetMapping("/menuName/{menuName}")
    public ResponseEntity<ResponseDTO> findMenuByMenuName(@PathVariable String menuName) {

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "상세 메뉴 조회 성공", menuService.findMenuByMenuName(menuName)));

    }



}
