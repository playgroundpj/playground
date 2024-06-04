package com.players.playground.store.service;

import com.players.playground.common.Criteria;
import com.players.playground.exception.DuplicatedStorNamelException;
import com.players.playground.member.repository.ManagerRepository;
import com.players.playground.member.service.MemberService;
import com.players.playground.store.dto.StoreDTO;
import com.players.playground.store.entity.Store;
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
public class StoreService {

    private static final Logger log = LoggerFactory.getLogger(com.players.playground.member.service.AuthService.class);

    private final StoreRepository storeRepository;
    private final ManagerRepository managerRepository;

    private final ModelMapper modelMapper;

    @Autowired
    public StoreService(StoreRepository storeRepository, ManagerRepository managerRepository, ModelMapper modelMapper) {
        this.storeRepository = storeRepository;
        this.managerRepository = managerRepository;
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

        log.info("[StoreService] selectStoreListWithPaging() Start");

        int index = cri.getPageNum() -1;
        int count = cri.getAmount();
        Pageable paging = PageRequest.of(index, count, Sort.by("storeCode").descending());

        Page<Store> result = storeRepository.findAll(paging);
        List<Store> storeList = (List<Store>)result.getContent();

        log.info("[StoreService] selectStoreListWithPaging() End");

        return storeList.stream().map(store -> modelMapper.map(store, StoreDTO.class)).collect(Collectors.toList());

    }

    @Transactional
    public Object regist(StoreDTO storeDTO) {
        log.info("[StoreService] regist() Start.");
        log.info("[StoreService] StoreDTO {}", storeDTO);

        /* 설명. 매장명 중복 유효성 검사 */
        if(storeRepository.findByStoreName(storeDTO.getStoreName()).isPresent()){
            log.info("[StoreService] 매장명이 중복됩니다.");
            throw new DuplicatedStorNamelException("매장명이 중복됩니다.");
        }

        Store registStore = modelMapper.map(storeDTO, Store.class);

        /* 설명. 매장 등록 */
        Store result = storeRepository.save(registStore);

        log.info("[StoreService] Store Insert Result {}", (result != null) ? "매장 등록 성공" : "매장 등록 실패");

        log.info("[StoreService] regist() End.");

        return storeDTO;
    }



    @Transactional
    public Object updateStore(StoreDTO storeDTO) {

        log.info("[StoreService] updateStore() Start.");

        log.info("[StoreService] storeDTO : {}", storeDTO);
        
        int result = 0;
        
        try{

            Store store = storeRepository.findById(storeDTO.getStoreCode()).get();

            log.info("[StoreService] store : {}", store);

            store.setStoreName(storeDTO.getStoreName());
            store.setStoreLocation(storeDTO.getStoreLocation());
            store.setOpenTime(storeDTO.getOpenTime());
            store.setCloseTime(storeDTO.getCloseTime());
            store.setClosedDay(storeDTO.getClosedDay());

            result = 1;

            log.info("[StoreService] final store : {}", store);

        }catch (Exception e){
            log.info("[updateMember] Exception!!");

        }

        log.info("[StoreService] updateStore() End.");

        return (result > 0) ? "매장 정보 업데이트 성공" : "매장 정보 업데이트 실패";


        
    }


    @Transactional
    public Object deleteStore(StoreDTO storeDTO) {

        log.info("[StoreService] deleteStore() Start.");

        int result = 0;

        try{

            Store store = storeRepository.findByStoreName(storeDTO.getStoreName()).get();

            if(store != null){

                // 매장별 매니저 삭제
                managerRepository.deleteByStoreCode(store.getStoreCode());

                // 매장 삭제
                storeRepository.delete(store);

                result = 1;
            }


        }catch (Exception e){
            log.info("[deleteStore] Exception!! ");

        }


        log.info("[StoreService] deleteStore() End.");

        return (result > 0) ? "매장 삭제 성공" : "매장 삭제 실패";

    }


    public Object findShopByShopCode(String shopName) {

        log.info("[StoreService] findShopByShopCode Start =======================");

        /* 설명. 매장 중복 유효성 확인 */


        if(storeRepository.findByStoreName(shopName).isPresent()){
            Store store = storeRepository.findByStoreName(shopName).get();
            log.info("[StoreService] {}", store);
            log.info("[StoreService] findShopByShopCode End =========================");
            return modelMapper.map(store, StoreDTO.class);
        }else{
            return "사용 가능한 매장명입니다";
        }

    }
}
