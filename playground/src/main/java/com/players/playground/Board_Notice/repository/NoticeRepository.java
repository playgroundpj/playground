package com.players.playground.Board_Notice;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoticeRepository extends JpaRepository<Notice, Integer> {
    // 카테고리별로 게시글 조회
    Page<Notice> findByNoticeCategory(String noticeCategory, Pageable pageable);
}
