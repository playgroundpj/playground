package com.players.playground.product.service;

import com.players.playground.product.entity.BoardGame;
import com.players.playground.product.entity.BoardGameImage;
import com.players.playground.product.repository.BoardGameImageRepository;
import com.players.playground.product.repository.BoardGameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BoardGameService {
    @Autowired
    private BoardGameRepository boardGameRepository;

    @Autowired
    private BoardGameImageRepository boardGameImageRepository;

    public List<BoardGame> getAllBoardGames() {
        return boardGameRepository.findAll();
    }

    public BoardGame getBoardGameById(Long id) {
        return boardGameRepository.findById(id).orElse(null);
    }

    public List<BoardGame> searchBoardGamesByName(String name) {
        return boardGameRepository.findByBoardgameNameContaining(name);
    }

    public BoardGame saveBoardGame(BoardGame boardGame) {
        return boardGameRepository.save(boardGame);
    }

    public BoardGame updateBoardGame(Long id, BoardGame boardGameDetails) {
        BoardGame boardGame = boardGameRepository.findById(id).orElseThrow(() -> new RuntimeException("Board game not found"));

        boardGame.setBoardgameName(boardGameDetails.getBoardgameName());
        boardGame.setDifficulty(boardGameDetails.getDifficulty());
        boardGame.setReleaseDate(boardGameDetails.getReleaseDate());
        boardGame.setMinPlayer(boardGameDetails.getMinPlayer());
        boardGame.setMaxPlayer(boardGameDetails.getMaxPlayer());
        boardGame.setPlaytime(boardGameDetails.getPlaytime());
        boardGame.setBoardgameRule(boardGameDetails.getBoardgameRule());

        return boardGameRepository.save(boardGame);
    }

    public void deleteBoardGame(Long id) {
        boardGameRepository.deleteById(id);
    }

    public Resource getBoardGameImage(Long boardgameCode) {
        try {
            BoardGameImage boardGameImage = boardGameImageRepository.findByBoardgameCode(boardgameCode).orElse(null);
            if (boardGameImage != null) {
                return new ClassPathResource(boardGameImage.getImageUrl());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
