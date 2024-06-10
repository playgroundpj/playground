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
            // 전체 게시글을 불러오고(required=false) 카테고리를 선택하면 카테고리별로 게시글 불러오기
            @RequestParam(name = "noticeCategory", required = false) String noticeCategory) {
        log.info("[NoticeController] selectNoticeListPaging : page={}, noticeCategory={}", page, noticeCategory);

        // 페이징 설정 (현재 페이지, 페이지당 항목 수)
        Criteria cri = new Criteria(page, 10);

        // noticeCategory가 지정되지 않았거나(null) "All"로 설정된 경우 전체 공지사항을. 특정 카테고리가 설정된 경우 해당 카테고리의 게시글을 가져올 수 있음
        List<NoticeDTO> data = (noticeCategory == null || noticeCategory.equals("All")) ?
                noticeService.selectNoticeListPaging(cri) : // 카테고리 없이 일반 조회
                noticeService.selectNoticesByCategory(cri, noticeCategory); // 카테고리별 조회

        // noticeService.getTotalNoticesCount(noticeCategory) 호출하여 특정 카테고리의 총 공지 수를 가져와 totalNotices 변수에 저장
        int totalNotices = noticeService.getTotalNoticesCount(noticeCategory);
        // totalNotices를 cri.getAmount()로 나누어 총 페이지 수를 계산함 (cri.getAmount()는 한페이지에 표시될 공지의 수를 반환)
        // 나눗셈 결과가 소수일 수 있으므로 Math.ceil을 사용하여 올림 처리를 함
        // 결과를 int로 캐스팅하여 pageEnd 변수에 저장
        int pageEnd = (int) Math.ceil((double) totalNotices / cri.getAmount());

        // 새로운 HashMap을 생성하여 페이지 정보와 총 공지수를 저장함 (pageEnd와 totalNotices 값을 맵에 넣음)
        Map<String, Object> pageInfo = new HashMap<>();
        pageInfo.put("pageEnd", pageEnd);
        pageInfo.put("totalNotices", totalNotices);

        // 또 다른 HashMap을 생성하여 응답데이터를 구성함 (공지사항 목록 'data'과 페이지 정보 'pageinfo'를 맵에 넣음
        Map<String, Object> responseData = new HashMap<>();
        responseData.put("data", data);
        responseData.put("pageInfo", pageInfo);

        log.info("[NoticeController] selectNoticeListPaging: responseData={}", responseData);

        // 응답데이터 생성하여 반환함
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회성공", responseData));
    }

    // 공지게시글 등록 (관리자 로그인)
    @PostMapping("/notice")
    public Notice createNotice(@RequestBody NoticeDTO noticeDTO) {
        log.info("[NoticeController]createNotice : noticeDTO={}", noticeDTO);
        return noticeService.createNotice(noticeDTO);
    }

    // 공지게시판 상세조회
    @GetMapping("/notice/{noticeCode}")
    public ResponseEntity<ResponseDTO> selectNoticeDetail(@PathVariable int noticeCode) {
        log.info("[NoticeController] selectNoticeDetail : noticeCode={}", noticeCode);

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회 성공", noticeService.selectNoticeDetail(noticeCode)));
    }

//    @PutMapping(value = "/notice/{noticeCode}")
//    @PreAuthorize("hasRole('ADMIN')")
//    public ResponseEntity<ResponseDTO> updateNotice(@PathVariable("noticeCode") int noticeCode, @RequestBody NoticeDTO noticeDTO) {
//        log.info("[controller]noticeCode : ", noticeCode);
//        log.info("[controller]noticeDTO : ", noticeDTO);
//        Notice notice = noticeService.updateNotice(noticeCode, noticeDTO);
//        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "수정 성공", notice));
//    }
    // 공지게시판 수정
    @PutMapping(value = "/notice/modify/{noticeCode}")
    public ResponseEntity<ResponseDTO> updateNotice(@RequestBody NoticeDTO noticeDTO) {

        log.info("[NoticeController] updateNotice : noticeDTO={}", noticeDTO);

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "수정 성공", noticeService.updateNotice(noticeDTO)));
    }

    @DeleteMapping("/notice/{noticeCode}")
//    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ResponseDTO> deleteNotice(@RequestBody NoticeDTO noticeDTO) {

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "삭제 성공", noticeService.deleteNotice(noticeDTO)));
    }
}