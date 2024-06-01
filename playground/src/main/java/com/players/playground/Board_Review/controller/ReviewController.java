package com.players.playground.Board_Review.controller;

import com.players.playground.Board_Notice.dto.NoticeDTO;
import com.players.playground.Board_Notice.entity.Notice;
import com.players.playground.Board_Review.dto.ReviewDTO;
import com.players.playground.Board_Review.entity.Review;
import com.players.playground.Board_Review.service.ReviewService;
import com.players.playground.common.Criteria;
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
public class ReviewController {

    @Autowired
    private ReviewService reviewService;


    // 전체 리뷰 목록 조회 (페이징 포함)
    @GetMapping("/review")
    public ResponseEntity<Map<String, Object>> getReviews(
            @RequestParam(name = "page", defaultValue = "1") int page,
            @RequestParam(name = "storeName", required = false) String storeName) {

        Criteria cri = new Criteria(page, 10);

        List<ReviewDTO> data;
        int totalReviews;

        if (storeName == null || storeName.equals("All")) {
            data = reviewService.getAllReviews(cri);
            totalReviews = reviewService.getTotalReviewsCount();
        } else {
            data = reviewService.getReviewsByStoreName(storeName, cri);
            totalReviews = reviewService.getTotalReviewsCount(storeName);
        }

        int pageEnd = (int) Math.ceil((double) totalReviews / cri.getAmount());

        Map<String, Object> pageInfo = new HashMap<>();
        pageInfo.put("pageEnd", pageEnd);
        pageInfo.put("totalReviews", totalReviews);

        Map<String, Object> responseData = new HashMap<>();
        responseData.put("data", data);
        responseData.put("pageInfo", pageInfo);

        return ResponseEntity.ok().body(responseData);
    }

    // 관리자 로그인 공지게시판 등록
    @PostMapping("/review")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<ReviewDTO> createReview(@RequestBody ReviewDTO reviewDTO) {
        ReviewDTO createdReview = reviewService.createReview(reviewDTO);
        return new ResponseEntity<>(createdReview, HttpStatus.CREATED);
    }
}