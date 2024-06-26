package com.players.playground.Board_Notice.service;

import com.players.playground.Board_Notice.dto.NoticeDTO;
import com.players.playground.Board_Notice.entity.Notice;
import com.players.playground.Board_Notice.repository.NoticeRepository;
import com.players.playground.common.Criteria;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class NoticeService {
    private static final Logger log = LoggerFactory.getLogger(NoticeService.class);

    private final NoticeRepository noticeRepository;
    private final ModelMapper modelMapper;

    /* 설명. 이미지 파일 저장 경로와 응답용 URL (WebConfig 설정파일 추가하기) */


    @Autowired
    public NoticeService(NoticeRepository noticeRepository, ModelMapper modelMapper) {
        this.noticeRepository = noticeRepository;
        this.modelMapper = modelMapper;

    }

    // 게시글 목록 조회 (페이징처리)
    public List<NoticeDTO> selectNoticeListPaging(Criteria cri) {
        log.info("[NoticeService][selectNoticeListPaging] Start with Criteria: pageNum={}, amount={}", cri.getPageNum(), cri.getAmount());
        return getPagedNotices(cri, null);
    }

    // 카테고리별 게시글 목록 조회 (페이징처리)
    public List<NoticeDTO> selectNoticesByCategory(Criteria cri, String category) {
        log.info("[NoticeService][selectNoticesByCategory] Start with Criteria: pageNum={}, amount={}, category={}", cri.getPageNum(), cri.getAmount(), category);
        return getPagedNotices(cri, category);
    }

    // 전체 공지사항 수 조회
    public int getTotalNoticesCount(String noticeCategory) {
        int total;
        if (noticeCategory == null || noticeCategory.equals("All")) {
            total = (int) noticeRepository.count();
        } else {
            total = noticeRepository.countByNoticeCategory(noticeCategory);
        }
        log.info("[NoticeService][getTotalNoticesCount] Total notices count: {}", total);
        return total;
    }

    // 페이징된 공지사항 목록 조회
    private List<NoticeDTO> getPagedNotices(Criteria cri, String category) {
        int index = cri.getPageNum() - 1;
        int count = cri.getAmount(); // amount 페이지당 항목 수
        Pageable paging = PageRequest.of(index, count, Sort.by("noticeCode").descending());

        Page<Notice> result;
        if (category == null || category.equals("All")) {
            result = noticeRepository.findAll(paging);
        } else {
            result = noticeRepository.findByNoticeCategory(category, paging);
        }

        List<NoticeDTO> noticeList = result.getContent().stream()
                .map(notice -> {
                    NoticeDTO noticeDTO = modelMapper.map(notice, NoticeDTO.class);
                    noticeDTO.setMemberNickname("관리자");
                    return noticeDTO;
                })
                .collect(Collectors.toList());
        log.info("[NoticeService][getPagedNotices] Retrieved {} notices", noticeList.size());
        return noticeList;
    }

    // 게시글 등록 (관리자 로그인)
    @Transactional
    public Notice createNotice(NoticeDTO noticeDTO) {
        Notice notice = modelMapper.map(noticeDTO, Notice.class);
        return noticeRepository.save(notice);
    }

    // 게시글 상세페이지
    public NoticeDTO selectNoticeDetail(int noticeCode) {
        log.info("[NoticeService][selectNoticeDetail] Start with noticeCode={}", noticeCode);

        Notice notice = noticeRepository.findById(noticeCode).get();
        NoticeDTO noticeDTO = modelMapper.map(notice, NoticeDTO.class);
        noticeDTO.setMemberNickname("관리자");
        return noticeDTO;
    }

    // 게시글 수정
//    @Transactional
//    public Notice updateNotice(int noticeCode, NoticeDTO noticeDTO) {
//        log.info("[NoticeService][updateNotice] ", noticeDTO);
//        Notice notice = noticeRepository.findById(noticeCode).orElseThrow(() -> new RuntimeException("Notice not found"));
//        notice.setNoticeTitle(noticeDTO.getNoticeTitle());
//        notice.setNoticeContent(noticeDTO.getNoticeContent());
//        notice.setModifyedDate(LocalDate.now());
//        return noticeRepository.save(notice);
//    }
    // 게시글 수정
    @Transactional
    public Object updateNotice(NoticeDTO noticeDTO) {
        log.info("[NoticeService] updateNotice : noticeDTO={}", noticeDTO);

        int result = 0;

        try {
            Notice notice = noticeRepository.findById(noticeDTO.getNoticeCode()).get();

            log.info("[NoticeService] updateNotice : foundNoticeEntity={}", notice);

            notice.setNoticeTitle(noticeDTO.getNoticeTitle());
            notice.setNoticeContent(noticeDTO.getNoticeContent());
            notice.setModifyedDate(LocalDate.now());

            result = 1;

            log.info("[NoticeService] final notice : {}", notice);

        } catch (Exception e) {

            log.info("[NoticeService] updateNotice : error", e);
        }
        log.info("[NoticeService] updateNotice () End");

        return (result > 0) ? "게시글 정보 수정 성공" : "게시글 정보 수정 실패";
    }

    @Transactional
    public Object deleteNotice(String noticeCode){

        log.info("[NoticeService] deleteNotice() start");

        int result = 0;

        try{
            Notice notice = noticeRepository.findById(Integer.valueOf(noticeCode)).get();

            if (notice != null) {

                noticeRepository.delete(notice);

                result = 1;
            }
        } catch (Exception e) {
            log.info("[NoticeService] deleteNotice : error", e);
        }

        log.info("[NoticeService] deleteNotice () End");

        return (result > 0) ? "게시글 삭제 성공" : "게시글 삭제 실패";
    }
}
