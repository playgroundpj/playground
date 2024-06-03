package com.players.playground.product.repository;

import com.players.playground.product.entity.BoardGame;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoardGameRepository extends JpaRepository<BoardGame, Long> {
    List<BoardGame> findByBoardgameNameContaining(String name);
}
