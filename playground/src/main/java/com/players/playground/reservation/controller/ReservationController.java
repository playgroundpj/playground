package com.players.playground.reservation.controller;

import com.players.playground.common.Criteria;
import com.players.playground.common.PageDTO;
import com.players.playground.common.PagingResponseDTO;
import com.players.playground.common.ResponseDTO;
import com.players.playground.reservation.dto.ReservationDTO;
import com.players.playground.reservation.entity.Reservation;
import com.players.playground.reservation.service.ReservationService;
import com.players.playground.store.dto.StoreReservationDTO;
import com.players.playground.store.entity.StoreReservation;
import com.players.playground.store.repository.StoreReservationRepository;
import com.players.playground.store.service.StoreReservationService;
import io.swagger.v3.oas.annotations.Operation;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/reservation")
public class ReservationController {

    private static final Logger log = LoggerFactory.getLogger(com.players.playground.member.service.AuthService.class);
    
    private final ReservationService reservationService;
    private final StoreReservationService storeReservationService;
    private final ModelMapper modelMapper;

    @Autowired
    public ReservationController(ReservationService reservationService, StoreReservationService storeReservationService, ModelMapper modelMapper) {
        this.reservationService = reservationService;
        this.storeReservationService = storeReservationService;
        this.modelMapper = modelMapper;
    }


    @Operation(summary = "전체 예약 조회", description = "전체 예약 조회가 진행됩니다.", tags = { "ReservationController" })
    @GetMapping("")
    public ResponseEntity<ResponseDTO> selectReservationList() {

        List<ReservationDTO> reservationDTOList = reservationService.selectReservationAll();

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "전체 예약 조회 성공", reservationDTOList));

    }

    @Operation(summary = "상세 예약 조회", description = "상세 예약이 조회됩니다.", tags = { "ReservationController" })
    @GetMapping("/{reservationCode}")
    public ResponseEntity<ResponseDTO> selectReservationByReservationCode(@PathVariable String reservationCode) {

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "상세 예약 조회 성공", reservationService.selectReservationById(Integer.valueOf(reservationCode))));

    }

    @Operation(summary = "회원별 예약 조회", description = "회원별 예약이 조회됩니다.", tags = { "ReservationController" })
    @GetMapping("/member/{memberCode}")
    public ResponseEntity<ResponseDTO> selectReservationBymemberCode(@PathVariable String memberCode) {

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "회원별 예약 조회 성공", storeReservationService.selectStoreReservationBymemberCode(memberCode)));

    }




}
