package com.players.playground.store.repository;

import com.players.playground.store.entity.StoreGametable;
import com.players.playground.store.entity.StoreMenu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StoreMenuRepository extends JpaRepository<StoreMenu, Integer> {

    List<StoreMenu> findByStoreCode(Integer integer);
}
