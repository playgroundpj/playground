package com.players.playground.store.service;

import com.players.playground.store.dto.StoreDTO;
import com.players.playground.store.entity.Store;
import com.players.playground.store.repository.StoreRepository;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StoreAuthService {

    private static final Logger log = LoggerFactory.getLogger(com.players.playground.member.service.AuthService.class);

    private final StoreRepository storeRepository;

    private final ModelMapper modelMapper;

    @Autowired
    public StoreAuthService(StoreRepository storeRepository, ModelMapper modelMapper) {
        this.storeRepository = storeRepository;
        this.modelMapper = modelMapper;
    }

    public Object findShopAll() {
        log.info("[AuthService] findShopAll() Start.");

        List<Store> StoreList = storeRepository.findAll();

        List<StoreDTO> storeDTOList = StoreList.stream()
                .map(store -> modelMapper.map(store, StoreDTO.class))
                .collect(Collectors.toList());

        log.info("[AuthService] findShopAll() End =========================");

        return storeDTOList;
    }

    public Object findShopByCode(String shopCode) {
        log.info("[AuthService] findShopByCode Start =======================");

        Store store = storeRepository.findByStoreCode(Integer.valueOf(shopCode));
        log.info("[AuthService] {}", store);
        log.info("[AuthService] findShopByCode End =========================");

        return modelMapper.map(store, StoreDTO.class);
    }
}
