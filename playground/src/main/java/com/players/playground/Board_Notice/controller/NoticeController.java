package com.players.playground.Board_Notice;

import com.players.playground.Board.service.NoticeService;
import com.players.playground.common.Criteria;
import com.players.playground.common.ResponseDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/Board")
public class NoticeController {

    // Logger : 콘솔메세지 출력
    private static final Logger log = LoggerFactory.getLogger(NoticeController.class);

    // 의존성 주입 (필드선언)
    private final NoticeService noticeService;

    @Autowired
    public NoticeController(NoticeService noticeService) {
        this.noticeService = noticeService;
    }

    @GetMapping("/notice")
    // 공지게시판 목록조회
    public ResponseEntity<ResponseDTO> selectNoticeListPaging(
            @RequestParam (name = "offset", defaultValue = "1") String offset,
            @RequestParam (name = "noticeCategory", required = false) String noticeCategory){
        log.info("[NoticeController] selectNoticeListPaging : " + offset + ", + noticeCategory = " + noticeCategory) ;

        // 페이징 설정 (현재 페이지, 페이지당 항목 수)
        Criteria cri = new Criteria(Integer.valueOf(offset), 10);

        List<NoticeDTO> data = (noticeCategory == null || noticeCategory.equals("All")) ?
                noticeService.selectNoticeListPaging(cri) : // 카테고리 없이 일반 조회
                noticeService.selectNoticesByCategory(cri, noticeCategory); // 카테고리별 조회


        // 응답데이터 생성하여 반환함
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회성공", data));
    }

}
