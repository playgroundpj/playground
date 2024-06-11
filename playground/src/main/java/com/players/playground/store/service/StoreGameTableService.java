package com.players.playground.store.service;

import com.players.playground.common.Criteria;
import com.players.playground.exception.DuplicatedStorNamelException;
import com.players.playground.member.repository.ManagerRepository;
import com.players.playground.store.dto.StoreDTO;
import com.players.playground.store.dto.StoreGametableDTO;
import com.players.playground.store.entity.Store;
import com.players.playground.store.entity.StoreGametable;
import com.players.playground.store.repository.StoreGametableRepository;
import com.players.playground.store.repository.StoreRepository;
import jakarta.transaction.Transactional;
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
public class StoreGameTableService {

    private static final Logger log = LoggerFactory.getLogger(com.players.playground.member.service.AuthService.class);

    private final StoreRepository storeRepository;

    private final StoreGametableRepository storeGametableRepository;

    private final ModelMapper modelMapper;

    @Autowired
    public StoreGameTableService(StoreRepository storeRepository, StoreGametableRepository storeGametableRepository, ModelMapper modelMapper) {
        this.storeRepository = storeRepository;
        this.storeGametableRepository = storeGametableRepository;
        this.modelMapper = modelMapper;
    }

    public List<StoreGametableDTO> selectGametableByStoreCode(String storeCode) {

        log.info("[StoreGametableService] selectGametableByStoreCode() Start");

        List<StoreGametable> storeGametableList = storeGametableRepository.findByStoreCode(Integer.valueOf(storeCode));

        return storeGametableList.stream().map(storeGametable -> modelMapper.map(storeGametable, StoreGametableDTO.class)).collect(Collectors.toList());

    }
}
