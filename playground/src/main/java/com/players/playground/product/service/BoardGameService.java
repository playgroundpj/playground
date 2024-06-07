package com.players.playground.product.service;

import com.players.playground.common.Criteria;
import com.players.playground.product.dto.BoardGameDTO;
import com.players.playground.product.entity.BoardGame;
import com.players.playground.product.entity.BoardGameImage;
import com.players.playground.product.repository.BoardGameImageRepository;
import com.players.playground.product.repository.BoardGameRepository;
import com.players.playground.store.dto.StoreDTO;
import com.players.playground.store.entity.Store;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BoardGameService {

    private static final Logger log = LoggerFactory.getLogger(com.players.playground.member.service.AuthService.class);

    private final BoardGameRepository boardGameRepository;
    private final BoardGameImageRepository boardGameImageRepository;
    private final ModelMapper modelMapper;

    @Value("${image.image-dir}")
    private String IMAGE_DIR;

    @Value("${image.image-url}")
    private String IMAGE_URL;

    @Value("${image.add-resource-locations}")
    private String ADD_RESOURCE_LOCATION;

    public BoardGameService(BoardGameRepository boardGameRepository, BoardGameImageRepository boardGameImageRepository, ModelMapper modelMapper) {
        this.boardGameRepository = boardGameRepository;
        this.boardGameImageRepository = boardGameImageRepository;
        this.modelMapper = modelMapper;
    }


//    public List<BoardGame> getAllBoardGames() {
//        return boardGameRepository.findAll();
//    }
//
//    public BoardGame getBoardGameById(Long id) {
//        return boardGameRepository.findById(id).orElse(null);
//    }
//
//    public List<BoardGame> searchBoardGamesByName(String name) {
//        return boardGameRepository.findByBoardgameNameContaining(name);
//    }
//
//    public BoardGame saveBoardGame(BoardGame boardGame) {
//        return boardGameRepository.save(boardGame);
//    }
//
//    public BoardGame updateBoardGame(Long id, BoardGame boardGameDetails) {
//        BoardGame boardGame = boardGameRepository.findById(id).orElseThrow(() -> new RuntimeException("Board game not found"));
//
//        boardGame.setBoardgameName(boardGameDetails.getBoardgameName());
//        boardGame.setDifficulty(boardGameDetails.getDifficulty());
//        boardGame.setReleaseDate(boardGameDetails.getReleaseDate());
//        boardGame.setMinPlayer(boardGameDetails.getMinPlayer());
//        boardGame.setMaxPlayer(boardGameDetails.getMaxPlayer());
//        boardGame.setPlaytime(boardGameDetails.getPlaytime());
//        boardGame.setBoardgameRule(boardGameDetails.getBoardgameRule());
//
//        return boardGameRepository.save(boardGame);
//    }
//
//    public void deleteBoardGame(Long id) {
//        boardGameRepository.deleteById(id);
//    }
//
//    public Resource getBoardGameImage(Long boardgameCode) {
//        try {
//            BoardGameImage boardGameImage = boardGameImageRepository.findByBoardgameCode(boardgameCode).orElse(null);
//            if (boardGameImage != null) {
//                return new ClassPathResource(boardGameImage.getImageUrl());
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        return null;
//    }

    public int selectBoardGameTotal() {

        log.info("[BoardGameService] selectBoardGameTotal Start =======================");

        List<BoardGame> boardGameList = boardGameRepository.findAll();

        log.info("[BoardGameService] selectBoardGameTotal End =======================");

        return boardGameList.size();
    }

    public Object selectStoreListWithPaging(Criteria cri) {
        log.info("[BoardGameService] selectStoreListWithPaging() Start");

        int index = cri.getPageNum() -1;
        int count = cri.getAmount();
        Pageable paging = PageRequest.of(index, count, Sort.by("boardgameCode").descending());

        Page<BoardGame> result = boardGameRepository.findAll(paging);
        List<BoardGame> boardGameList = (List<BoardGame>)result.getContent();

        for(int i = 0 ; i < boardGameList.size() ; i++) {
            boardGameList.get(i).setBoardgameImgURL1(IMAGE_URL + boardGameList.get(i).getBoardgameImgURL1());
            boardGameList.get(i).setBoardgameImgURL2(IMAGE_URL + boardGameList.get(i).getBoardgameImgURL2());
            boardGameList.get(i).setBoardgameImgURL3(IMAGE_URL + boardGameList.get(i).getBoardgameImgURL3());
        }

        log.info("[BoardGameService] selectStoreListWithPaging() End");

        return boardGameList.stream().map(boardGame -> modelMapper.map(boardGame, BoardGameDTO.class)).collect(Collectors.toList());

    }


    public Object selectBoardgameAll() {

        log.info("[BoardGameService] selectBoardgameAll() Start.");

        List<BoardGame> boardGameList = boardGameRepository.findAll();

        return boardGameList.stream()
                .map(boardGame -> modelMapper.map(boardGame, BoardGameDTO.class))
                .collect(Collectors.toList());

    }


    public Object findBoardgameByCode(String boardgameCode) {

        log.info("[BoardGameService] findBoardgameByCode Start =======================");

        BoardGame boardGame = boardGameRepository.findByBoardgameCode(Integer.valueOf(boardgameCode));
        log.info("[BoardGameService] {}", boardGame);
        log.info("[BoardGameService] findBoardgameByCode End =========================");

        return modelMapper.map(boardGame, BoardGameDTO.class);

    }

    public Object findBoardgameByBoardgameName(String boardgameName) {

        log.info("[BoardGameService] findBoardgameByBoardgameName Start =======================");

        /* 설명. 보드게임 중복 유효성 확인 */


        if(boardGameRepository.findByBoardgameName(boardgameName).isPresent()){
            BoardGame boardGame = boardGameRepository.findByBoardgameName(boardgameName).get();
            log.info("[BoardGameService] {}", boardGame);
            log.info("[BoardGameService] findBoardgameByBoardgameName End =========================");
            return modelMapper.map(boardGame, BoardGameDTO.class);
        }else{
            return "사용 가능한 보드게임명입니다";
        }

    }
}
