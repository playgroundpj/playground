package com.players.playground.store.repository;

import com.players.playground.store.entity.StoreBoardGame;
import com.players.playground.store.entity.StoreGametable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StoreGametableRepository extends JpaRepository<StoreGametable, Integer> {

}
