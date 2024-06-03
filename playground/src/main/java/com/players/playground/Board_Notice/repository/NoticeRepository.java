package com.players.playground.Board_Notice.repository;


import com.players.playground.Board_Notice.entity.Notice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface NoticeRepository extends JpaRepository<Notice, Integer> {

    // 카테고리별로 게시글 조회 (Member 정보 포함)
//    @Query("SELECT n FROM Notice n JOIN FETCH n.member WHERE n.noticeCategory = :noticeCategory")
    @Query("SELECT n FROM Notice n WHERE n.noticeCategory = :noticeCategory")
    Page<Notice> findByNoticeCategory(@Param("noticeCategory") String noticeCategory, Pageable pageable);

    // 모든 게시글 조회 (Member 정보 포함)
//    @Query("SELECT n FROM Notice n JOIN FETCH n.member")
//    Page<Notice> findAll(Pageable pageable);

    // 카테고리별 게시글 수 조회
    int countByNoticeCategory(String noticeCategory);


}