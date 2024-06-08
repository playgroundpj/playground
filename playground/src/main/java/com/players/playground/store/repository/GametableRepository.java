package com.players.playground.store.repository;

import com.players.playground.store.entity.GameTable;
import com.players.playground.store.entity.StoreGametable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GametableRepository extends JpaRepository<GameTable, Integer> {

    GameTable findByTableCode(int tableCode);
}
