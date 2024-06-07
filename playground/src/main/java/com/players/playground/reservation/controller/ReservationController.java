package com.players.playground.reservation.controller;

import com.players.playground.common.Criteria;
import com.players.playground.common.PageDTO;
import com.players.playground.common.PagingResponseDTO;
import com.players.playground.common.ResponseDTO;
import com.players.playground.reservation.service.ReservationService;
import io.swagger.v3.oas.annotations.Operation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/reservation")
public class ReservationController {

    private static final Logger log = LoggerFactory.getLogger(com.players.playground.member.service.AuthService.class);
    
    private final ReservationService reservationService;

    @Autowired
    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }


    @Operation(summary = "전체 예약 조회", description = "전체 예약 조회 및 페이징 처리가 진행됩니다.", tags = { "ReservationController" })
    @GetMapping("")
    public ResponseEntity<ResponseDTO> selectReservationListWithPaging(
            @RequestParam(name = "offset", defaultValue = "1") String offset) {

        log.info("[ReservationController] selectReservationListWithPaging : " + offset);

        int total = reservationService.selectReservationTotal();

        Criteria cri = new Criteria(Integer.valueOf(offset), 10);
        PagingResponseDTO pagingResponseDTO = new PagingResponseDTO();

        pagingResponseDTO.setData(reservationService.selectReservationListWithPaging(cri));

        pagingResponseDTO.setPageInfo(new PageDTO(cri, total));

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "매장 페이징 조회 성공", pagingResponseDTO));

    }


}
