package com.players.playground.Board_Notice.service;

import com.players.playground.Board_Notice.dto.NoticeDTO;
import com.players.playground.Board_Notice.entity.Notice;
import com.players.playground.Board_Notice.repository.NoticeImageRepository;
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
import java.util.stream.Collectors;

@Service
@Transactional
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
        int count = cri.getAmount();
        Pageable paging = PageRequest.of(index, count, Sort.by("createDate").descending());

        Page<Notice> result;
        if (category == null || category.equals("All")) {
            result = noticeRepository.findAll(paging);
        } else {
            result = noticeRepository.findByNoticeCategory(category, paging);
        }

        List<NoticeDTO> noticeList = result.getContent().stream()
                .map(notice -> {
                    NoticeDTO noticeDTO = modelMapper.map(notice, NoticeDTO.class);
                    noticeDTO.setMemberNickname(notice.getMember().getMemberNickname());
                    return noticeDTO;
                })
                .collect(Collectors.toList());
        log.info("[NoticeService][getPagedNotices] Retrieved {} notices", noticeList.size());
        return noticeList;
    }

    // 게시글 등록 (관리자 로그인)
    public Notice createNotice(NoticeDTO noticeDTO) {
        Notice notice = modelMapper.map(noticeDTO, Notice.class);
        return noticeRepository.save(notice);
    }
}
