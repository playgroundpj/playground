package com.players.playground.product.service;

import com.players.playground.product.entity.BoardGame;
import com.players.playground.product.repository.BoardGameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BoardGameService {
    @Autowired
    private BoardGameRepository boardGameRepository;

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
}
