package com.players.playground.product.service;

import com.players.playground.common.Criteria;
import com.players.playground.product.dto.BoardGameDTO;
import com.players.playground.product.entity.BoardGame;
import com.players.playground.product.repository.BoardGameRepository;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
    private final ModelMapper modelMapper;

    @Value("${image.image-dir}")
    private String IMAGE_DIR;

    @Value("${image.image-url}")
    private String IMAGE_URL;

    @Autowired
    public BoardGameService(BoardGameRepository boardGameRepository, ModelMapper modelMapper) {
        this.boardGameRepository = boardGameRepository;
        this.modelMapper = modelMapper;
    }

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

        for(int i = 0 ; i < boardGameList.size() ; i++) {
            boardGameList.get(i).setBoardgameImgURL1(IMAGE_URL + boardGameList.get(i).getBoardgameImgURL1());
            boardGameList.get(i).setBoardgameImgURL2(IMAGE_URL + boardGameList.get(i).getBoardgameImgURL2());
            boardGameList.get(i).setBoardgameImgURL3(IMAGE_URL + boardGameList.get(i).getBoardgameImgURL3());
        }

        return boardGameList.stream()
                .map(boardGame -> modelMapper.map(boardGame, BoardGameDTO.class))
                .collect(Collectors.toList());

    }


    public BoardGameDTO findBoardgameByCode(String boardgameCode) {

        log.info("[BoardGameService] findBoardgameByCode Start =======================");

        BoardGame boardGame = boardGameRepository.findByBoardgameCode(Integer.valueOf(boardgameCode));

        boardGame.setBoardgameImgURL1(IMAGE_URL + boardGame.getBoardgameImgURL1());
        boardGame.setBoardgameImgURL2(IMAGE_URL + boardGame.getBoardgameImgURL2());
        boardGame.setBoardgameImgURL3(IMAGE_URL + boardGame.getBoardgameImgURL3());

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

            boardGame.setBoardgameImgURL1(IMAGE_URL + boardGame.getBoardgameImgURL1());
            boardGame.setBoardgameImgURL2(IMAGE_URL + boardGame.getBoardgameImgURL2());
            boardGame.setBoardgameImgURL3(IMAGE_URL + boardGame.getBoardgameImgURL3());

            log.info("[BoardGameService] findBoardgameByBoardgameName End =========================");
            return modelMapper.map(boardGame, BoardGameDTO.class);
        }else{
            return "사용 가능한 보드게임명입니다";
        }

    }
}
