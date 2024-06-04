package com.players.playground.store.service;

import com.players.playground.common.Criteria;
import com.players.playground.member.service.MemberService;
import com.players.playground.store.dto.StoreDTO;
import com.players.playground.store.entity.Store;
import com.players.playground.store.repository.StoreRepository;
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
public class StoreService {

    private static final Logger log = LoggerFactory.getLogger(com.players.playground.member.service.AuthService.class);

    private final StoreRepository storeRepository;

    private final ModelMapper modelMapper;

    @Autowired
    public StoreService(StoreRepository storeRepository, ModelMapper modelMapper) {
        this.storeRepository = storeRepository;
        this.modelMapper = modelMapper;
    }

    public Object findShopAll() {
        log.info("[StoreService] findShopAll() Start.");

        List<Store> StoreList = storeRepository.findAll();

        List<StoreDTO> storeDTOList = StoreList.stream()
                .map(store -> modelMapper.map(store, StoreDTO.class))
                .collect(Collectors.toList());

        log.info("[StoreService] findShopAll() End =========================");

        return storeDTOList;
    }

    public Object findShopByCode(String shopCode) {
        log.info("[StoreService] findShopByCode Start =======================");

        Store store = storeRepository.findByStoreCode(Integer.valueOf(shopCode));
        log.info("[StoreService] {}", store);
        log.info("[StoreService] findShopByCode End =========================");

        return modelMapper.map(store, StoreDTO.class);
    }

    public int selectStoreTotal() {
        log.info("[StoreService] selectStoreTotal() Start");

        List<Store> storeList = storeRepository.findAll();

        log.info("[StoreService] selectStoreTotal() End");

        return  storeList.size();

    }

    public Object selectStoreListWithPaging(Criteria cri) {

        log.info("[StoreServce] selectStoreListWithPaging() Start");

        int index = cri.getPageNum() -1;
        int count = cri.getAmount();
        Pageable paging = PageRequest.of(index, count, Sort.by("storeCode").descending());

        Page<Store> result = storeRepository.findAll(paging);
        List<Store> storeList = (List<Store>)result.getContent();

        log.info("[StoreServce] selectStoreListWithPaging() End");

        return storeList.stream().map(store -> modelMapper.map(store, StoreDTO.class)).collect(Collectors.toList());

    }
}
