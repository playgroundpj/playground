package com.players.playground.store.repository;

import com.players.playground.store.entity.StoreGametable;
import com.players.playground.store.entity.StoreMenu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StoreMenuRepository extends JpaRepository<StoreMenu, Integer> {

}
