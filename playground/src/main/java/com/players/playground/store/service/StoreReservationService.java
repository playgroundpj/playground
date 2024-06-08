package com.players.playground.store.service;

import com.players.playground.store.dto.StoreReservationDTO;
import com.players.playground.store.entity.StoreReservation;
import com.players.playground.store.repository.StoreRepository;
import com.players.playground.store.repository.StoreReservationRepository;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StoreReservationService {

    private static final Logger log = LoggerFactory.getLogger(com.players.playground.member.service.AuthService.class);

    private final StoreRepository storeRepository;
    private final StoreReservationRepository storeReservationRepository;

    private final ModelMapper modelMapper;

    @Autowired
    public StoreReservationService(StoreRepository storeRepository, StoreReservationRepository storeReservationRepository, ModelMapper modelMapper) {
        this.storeRepository = storeRepository;
        this.storeReservationRepository = storeReservationRepository;
        this.modelMapper = modelMapper;
    }

    public List<StoreReservationDTO> selectReservationBystoreCode(String storeCode) {

        log.info("[StoreReservationService] selectReservationBystoreCode() Start");

        List<StoreReservation> reservationList = storeReservationRepository.findByStoreCode(Integer.valueOf(storeCode));

        return  reservationList.stream().map(storeReservation -> modelMapper.map(storeReservation, StoreReservationDTO.class)).collect(Collectors.toList());
    }

    public Object selectStoreReservationBymemberCode(String memberCode) {

        log.info("[StoreReservationService] selectStoreReservationBymemberCode() Start");

        List<StoreReservation> reservationList = storeReservationRepository.findByMemberCode(Integer.valueOf(memberCode));

        return  reservationList.stream().map(storeReservation -> modelMapper.map(storeReservation, StoreReservationDTO.class)).collect(Collectors.toList());

    }
}
