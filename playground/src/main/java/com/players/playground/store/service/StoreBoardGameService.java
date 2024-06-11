package com.players.playground.store.service;

import com.players.playground.common.Criteria;
import com.players.playground.exception.DuplicatedStorNamelException;
import com.players.playground.member.repository.ManagerRepository;
import com.players.playground.store.dto.StoreBoardGameDTO;
import com.players.playground.store.dto.StoreDTO;
import com.players.playground.store.entity.Store;
import com.players.playground.store.entity.StoreBoardGame;
import com.players.playground.store.repository.StoreBoardGameRepository;
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
public class StoreBoardGameService {

    private static final Logger log = LoggerFactory.getLogger(com.players.playground.member.service.AuthService.class);

    private final StoreBoardGameRepository storeBoardGameRepository;


    private final ModelMapper modelMapper;

    public StoreBoardGameService(StoreBoardGameRepository storeBoardGameRepository, ModelMapper modelMapper) {
        this.storeBoardGameRepository = storeBoardGameRepository;
        this.modelMapper = modelMapper;
    }


    public Object findBoardGameByStoreCode(String storeCode) {

        log.info("[StoreBoardGameService] findBoardGameByStoreCode Start =======================");

        List<StoreBoardGame> storeBoardGameList = storeBoardGameRepository.findByStoreCode(Integer.valueOf(storeCode));

        if(storeBoardGameList.isEmpty()){

            return null;

        }else{
            return storeBoardGameList.stream().map(
                    storeBoardGame -> modelMapper.map(storeBoardGame, StoreBoardGameDTO.class))
                    .collect(Collectors.toList());

        }

    }
}
