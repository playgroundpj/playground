package com.players.playground.store.service;

import com.players.playground.store.dto.GametableDTO;
import com.players.playground.store.dto.StoreGametableDTO;
import com.players.playground.store.entity.GameTable;
import com.players.playground.store.repository.GametableRepository;
import com.players.playground.store.repository.StoreRepository;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GameTableService {

    private static final Logger log = LoggerFactory.getLogger(com.players.playground.member.service.AuthService.class);

    private final StoreRepository storeRepository;
    private final GametableRepository gametableRepository;

    private final ModelMapper modelMapper;

    @Autowired
    public GameTableService(StoreRepository storeRepository, GametableRepository gametableRepository, ModelMapper modelMapper) {
        this.storeRepository = storeRepository;
        this.gametableRepository = gametableRepository;
        this.modelMapper = modelMapper;
    }

    public GametableDTO selectGametableByTableCode(int tableCode) {

        log.info("[GametableService] selectGametableByTableCode() Start");

        GameTable gameTable = gametableRepository.findByTableCode(tableCode);

        return modelMapper.map(gameTable, GametableDTO.class);

    }

    public List<GametableDTO> selectGametableAll() {

        log.info("[GametableService] selectGametableByTableCode() Start");

        List<GameTable> gameTableList = gametableRepository.findAll();

        return gameTableList.stream().map(gameTable -> modelMapper.map(gameTable, GametableDTO.class)).collect(Collectors.toList());

    }
}
