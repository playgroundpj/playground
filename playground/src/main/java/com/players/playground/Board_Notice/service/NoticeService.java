package com.players.playground.Board.service;

import com.players.playground.Board.dto.NoticeDTO;
import com.players.playground.Board.entity.Notice;
import com.players.playground.Board.repository.NoticeRepository;
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
        int index = cri.getPageNum() - 1;
        int count = cri.getAmount();
        Pageable paging = PageRequest.of(index, count, Sort.by("createDate").descending());
        Page<Notice> result = noticeRepository.findAll(paging);
        List<NoticeDTO> noticeList = result.getContent().stream()
                .map(notice -> modelMapper.map(notice, NoticeDTO.class))
                .collect(Collectors.toList());
        log.info("[NoticeService][selectNoticeListPaging] End");
        return noticeList;
    }

    // 카테고리별 게시글 목록 조회 (페이징처리)
    public List<NoticeDTO> selectNoticesByCategory(Criteria cri, String category) {
        int index = cri.getPageNum() - 1;
        int count = cri.getAmount();
        Pageable paging = PageRequest.of(index, count, Sort.by("createDate").descending());

        Page<Notice> result = noticeRepository.findByNoticeCategory(category, paging);
        return result.getContent().stream()
                .map(notice -> modelMapper.map(notice, NoticeDTO.class))
                .collect(Collectors.toList());
    }
}
