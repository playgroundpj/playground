package com.players.playground.product.repository;

import com.players.playground.product.entity.BoardGameImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BoardGameImageRepository extends JpaRepository<BoardGameImage, Long> {
    Optional<BoardGameImage> findByBoardgameCode(Long boardgameCode);
}
