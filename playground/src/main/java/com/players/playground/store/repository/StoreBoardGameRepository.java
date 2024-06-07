package com.players.playground.store.repository;

import com.players.playground.store.entity.Store;
import com.players.playground.store.entity.StoreBoardGame;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StoreBoardGameRepository extends JpaRepository<StoreBoardGame, Integer> {

}
