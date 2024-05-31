package com.players.playground.Board.service;
package com.players.playground.Board_Notice.service;

import com.players.playground.Board.dto.NoticeDTO;
import com.players.playground.Board.entity.Notice;
import com.players.playground.Board.repository.NoticeRepository;
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
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class NoticeService {
    private static final Logger log = LoggerFactory.getLogger(NoticeService.class);

    private final NoticeRepository noticeRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public NoticeService(NoticeRepository noticeRepository, ModelMapper modelMapper) {
        this.noticeRepository = noticeRepository;
        this.modelMapper = modelMapper;
    }

    // 게시글 목록 조회 (페이징처리)
    public List<NoticeDTO> selectNoticeListPaging(Criteria cri) {
        log.info("[NoticeService][selectNoticeListPaging] Start");
        log.info("[NoticeService][selectNoticeListPaging] Start with Criteria: pageNum={}, amount={}", cri.getPageNum(), cri.getAmount());
        int index = cri.getPageNum() - 1;
        int count = cri.getAmount();
        Pageable paging = PageRequest.of(index, count, Sort.by("createDate").descending());
        Page<Notice> result = noticeRepository.findAll(paging);
        List<NoticeDTO> noticeList = result.getContent().stream()
                .map(notice -> modelMapper.map(notice, NoticeDTO.class))
                .collect(Collectors.toList());
        log.info("[NoticeService][selectNoticeListPaging] End");
        log.info("[NoticeService][selectNoticeListPaging] Retrieved {} notices", noticeList.size());
        return noticeList;
    }

    // 카테고리별 게시글 목록 조회 (페이징처리)
    public List<NoticeDTO> selectNoticesByCategory(Criteria cri, String category) {
        log.info("[NoticeService][selectNoticesByCategory] Start with Criteria: pageNum={}, amount={}, category={}", cri.getPageNum(), cri.getAmount(), category);
        int index = cri.getPageNum() - 1;
        int count = cri.getAmount();
        Pageable paging = PageRequest.of(index, count, Sort.by("createDate").descending());

        Page<Notice> result = noticeRepository.findByNoticeCategory(category, paging);
        return result.getContent().stream()
        List<NoticeDTO> noticeList = result.getContent().stream()
                .map(notice -> modelMapper.map(notice, NoticeDTO.class))
                .collect(Collectors.toList());
        log.info("[NoticeService][selectNoticesByCategory] Retrieved {} notices", noticeList.size());
        return noticeList;
    }

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
}
