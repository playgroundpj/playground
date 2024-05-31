package com.players.playground.Board_Notice.controller;

import com.players.playground.Board_Notice.dto.NoticeDTO;
import com.players.playground.Board_Notice.entity.Notice;
import com.players.playground.Board_Notice.service.NoticeService;
import com.players.playground.common.Criteria;
import com.players.playground.common.ResponseDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/board")
public class NoticeController {

    private static final Logger log = LoggerFactory.getLogger(NoticeController.class);

    private final NoticeService noticeService;

    @Autowired
    public NoticeController(NoticeService noticeService) {
        this.noticeService = noticeService;
    }

    @GetMapping("/notice")
    public ResponseEntity<ResponseDTO> selectNoticeListPaging(
            @RequestParam(name = "page", defaultValue = "1") int page,
            @RequestParam(name = "noticeCategory", required = false) String noticeCategory) {
        log.info("[NoticeController] selectNoticeListPaging : page={}, noticeCategory={}", page, noticeCategory);

        // 페이징 설정 (현재 페이지, 페이지당 항목 수)
        Criteria cri = new Criteria(page, 10);

        List<NoticeDTO> data = (noticeCategory == null || noticeCategory.equals("All")) ?
                noticeService.selectNoticeListPaging(cri) : // 카테고리 없이 일반 조회
                noticeService.selectNoticesByCategory(cri, noticeCategory); // 카테고리별 조회

        int totalNotices = noticeService.getTotalNoticesCount(noticeCategory); // 총 공지수
        int pageEnd = (int) Math.ceil((double) totalNotices / cri.getAmount());  // 총 페이지 수 계산

        Map<String, Object> pageInfo = new HashMap<>();
        pageInfo.put("pageEnd", pageEnd);
        pageInfo.put("totalNotices", totalNotices);

        Map<String, Object> responseData = new HashMap<>();
        responseData.put("data", data);
        responseData.put("pageInfo", pageInfo);

        log.info("[NoticeController] selectNoticeListPaging: responseData={}", responseData);

        // 응답데이터 생성하여 반환함
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회성공", responseData));
    }

    // 관리자 로그인 공지게시판 등록
    @PostMapping("/notice")
    @PreAuthorize("hasRole('ADMIN')")
    public Notice createNotice(@RequestBody NoticeDTO noticeDTO) {
        return noticeService.createNotice(noticeDTO);
    }
}