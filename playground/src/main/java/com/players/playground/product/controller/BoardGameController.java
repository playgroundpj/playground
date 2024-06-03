package com.players.playground.product.controller;

import com.players.playground.product.entity.BoardGame;
import com.players.playground.product.service.BoardGameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/v1/boardgames")
@CrossOrigin(origins = "http://localhost:3000")  // CORS 설정 추가
public class BoardGameController {

    @Autowired
    private BoardGameService boardGameService;

    @GetMapping
    public ResponseEntity<List<BoardGame>> getAllBoardGames() {
        List<BoardGame> boardGames = boardGameService.getAllBoardGames();
        return ResponseEntity.ok(boardGames);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BoardGame> getBoardGameById(@PathVariable Long id) {
        BoardGame boardGame = boardGameService.getBoardGameById(id);
        return ResponseEntity.ok(boardGame);
    }

    @GetMapping("/search")
    public ResponseEntity<List<BoardGame>> searchBoardGamesByName(@RequestParam String name) {
        List<BoardGame> boardGames = boardGameService.searchBoardGamesByName(name);
        return ResponseEntity.ok(boardGames);
    }

    @PostMapping
    public ResponseEntity<BoardGame> createBoardGame(@RequestBody BoardGame boardGame) {
        BoardGame savedBoardGame = boardGameService.saveBoardGame(boardGame);
        return ResponseEntity.ok(savedBoardGame);
    }

    @GetMapping("/images/{filename:.+}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) {
        try {
            Path imagePath = Paths.get("src/main/resources/static/boardgameimgs").resolve(filename).normalize();
            Resource resource = new UrlResource(imagePath.toUri());

            if (resource.exists() && resource.isReadable()) {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (MalformedURLException ex) {
            return ResponseEntity.badRequest().build();
        }
    }
}
