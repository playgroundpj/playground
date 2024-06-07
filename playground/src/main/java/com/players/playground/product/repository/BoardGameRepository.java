package com.players.playground.product.repository;

import com.players.playground.product.entity.BoardGame;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BoardGameRepository extends JpaRepository<BoardGame, Integer> {
    List<BoardGame> findByBoardgameNameContaining(String name);

    BoardGame findByBoardgameCode(Integer integer);

    Optional<BoardGame> findByBoardgameName(String boardgameName);
}
