package com.players.playground.reservation.service;

import com.players.playground.common.Criteria;
import com.players.playground.common.ResponseDTO;
import com.players.playground.reservation.dto.ReservationDTO;
import com.players.playground.reservation.entity.Reservation;
import com.players.playground.reservation.repository.ReservationRepository;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReservationService {

    private static final Logger log = LoggerFactory.getLogger(com.players.playground.member.service.AuthService.class);

    private final ModelMapper modelMapper;
    private final ReservationRepository reservationRepository;

    @Autowired
    public ReservationService(ModelMapper modelMapper, ReservationRepository reservationRepository) {
        this.modelMapper = modelMapper;
        this.reservationRepository = reservationRepository;
    }

    public int selectReservationTotal() {

        log.info("[ReservationService] selectReservationTotal Start =======================");

        List<Reservation> reservationList = reservationRepository.findAll();

        log.info("[ReservationService] selectReservationTotal End =======================");

        return reservationList.size();
        
    }

    public Object selectReservationListWithPaging(Criteria cri) {

        log.info("[ReservationService] selectStoreListWithPaging() Start");

        int index = cri.getPageNum() -1;
        int count = cri.getAmount();
        Pageable paging = PageRequest.of(index, count, Sort.by("reservationCode").descending());

        Page<Reservation> result = reservationRepository.findAll(paging);
        List<Reservation> reservationList = (List<Reservation>)result.getContent();


        log.info("[ReservationService] selectStoreListWithPaging() End");

        return reservationList.stream().map(reservation -> modelMapper.map(reservation, ReservationDTO.class)).collect(Collectors.toList());

    }

    public Object selectReservationBymemberCode(String memberCode) {

        log.info("[ReservationService] selectReservationBymemberCode() Start");

        List<Reservation> reservationList = reservationRepository.findByMemberCode(Integer.valueOf(memberCode));

        if(reservationList.isEmpty()){
            return "예약 내역이 없습니다";
        }else{
            log.info("[ReservationService] selectReservationBymemberCode() End");
            return reservationList.stream().map(reservation -> modelMapper.map(reservation,ReservationDTO.class )).collect(Collectors.toList());
        }
    }

    public ReservationDTO selectReservationById(int reservationCode) {

        log.info("[ReservationService] selectReservationById() Start");

        Reservation reservation = reservationRepository.findById(reservationCode).get();

        return modelMapper.map(reservation, ReservationDTO.class);

    }

    public List<ReservationDTO> selectReservationAll() {

        log.info("[ReservationService] selectReservationAll() Start");

        List<Reservation> reservationList = reservationRepository.findAll();

        return reservationList.stream().map(reservation -> modelMapper.map(reservation, ReservationDTO.class)).collect(Collectors.toList());

    }
}
