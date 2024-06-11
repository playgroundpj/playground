package com.players.playground.store.service;

import com.players.playground.product.entity.Menu;
import com.players.playground.product.repository.MenuRepository;
import com.players.playground.store.dto.StoreMenuDTO;
import com.players.playground.store.entity.StoreMenu;
import com.players.playground.store.repository.StoreMenuRepository;
import com.players.playground.store.repository.StoreRepository;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StoreMenuService {

    private static final Logger log = LoggerFactory.getLogger(com.players.playground.member.service.AuthService.class);

    private final StoreRepository storeRepository;
    private final StoreMenuRepository storeMenuRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public StoreMenuService(StoreRepository storeRepository, StoreMenuRepository storeMenuRepository, ModelMapper modelMapper) {
        this.storeRepository = storeRepository;
        this.storeMenuRepository = storeMenuRepository;
        this.modelMapper = modelMapper;
    }

    public List<StoreMenuDTO> selectMenuByStoreCode(String storeCode) {

        log.info("[StoreMenuService] selectMenuByStoreCode() Start");
        List<StoreMenu> menuList = storeMenuRepository.findByStoreCode(Integer.valueOf(storeCode));

        return menuList.stream().map(storeMenu -> modelMapper.map(storeMenu, StoreMenuDTO.class)).collect(Collectors.toList());



    }
}
