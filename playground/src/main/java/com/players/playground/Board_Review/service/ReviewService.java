package com.players.playground.Board_Review.service;

import com.players.playground.Board_Review.dto.ReviewDTO;
import com.players.playground.Board_Review.entity.Review;
import com.players.playground.Board_Review.repository.ReviewRepository;
import com.players.playground.common.Criteria;
import com.players.playground.member.repository.MemberRepository;
import com.players.playground.store.entity.Store;
import com.players.playground.store.repository.StoreRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final MemberRepository memberRepository;
    private final StoreRepository storeRepository;

    @Autowired
    public ReviewService(ReviewRepository reviewRepository, MemberRepository memberRepository, StoreRepository storeRepository) {
        this.reviewRepository = reviewRepository;
        this.memberRepository = memberRepository;
        this.storeRepository = storeRepository;
    }

    // 카테고리(지점 이름)별 리뷰 목록 조회 (페이징 포함)
    public List<ReviewDTO> getReviewsByStoreName(String storeName, Criteria cri) {
        PageRequest pageRequest = PageRequest.of(cri.getPageNum() - 1, cri.getAmount());
        Page<Review> reviews = reviewRepository.findByStoreStoreName(storeName, pageRequest);

        return reviews.stream().map(review -> new ReviewDTO(
                review.getReviewCode(),
                review.getMemberCode(),
                review.getStoreCode(),
                review.getReviewTitle(),
                review.getReviewContent(),
                review.getCreateDate(),
                review.getModifyedDate(),
                review.getReviewStar(),
                review.getMember().getMemberNickname(),
                review.getStore().getStoreName()
        )).collect(Collectors.toList());
    }

    // 전체 리뷰 목록 조회 (페이징 포함)
    public List<ReviewDTO> getAllReviews(Criteria cri) {
        PageRequest pageRequest = PageRequest.of(cri.getPageNum() - 1, cri.getAmount());
        Page<Review> reviews = reviewRepository.findAll(pageRequest);

        return reviews.stream().map(review -> new ReviewDTO(
                review.getReviewCode(),
                review.getMemberCode(),
                review.getStoreCode(),
                review.getReviewTitle(),
                review.getReviewContent(),
                review.getCreateDate(),
                review.getModifyedDate(),
                review.getReviewStar(),
                review.getMember().getMemberNickname(),
                review.getStore().getStoreName()
        )).collect(Collectors.toList());
    }

    //  전체 리뷰 개수 조회
    public int getTotalReviewsCount() {
        return (int) reviewRepository.count();
    }

    // 카테고리(지점 이름)별 리뷰 개수 조회
    public int getTotalReviewsCount(String storeName) {
        return (int) reviewRepository.countByStoreStoreName(storeName);
    }

    // 리뷰등록 (회원 로그인)
    public ReviewDTO createReview(ReviewDTO reviewDTO) {
        // StoreCode는 storeName을 통해 가져옴
        Store store = storeRepository.findByStoreName(reviewDTO.getStoreName())
                .orElseThrow(() -> new IllegalArgumentException("Invalid store name: " + reviewDTO.getStoreName()));
        int storeCode = store.getStoreCode();

        // 리뷰 엔티티로 변환
        Review review = new Review(
                reviewDTO.getMemberCode(),
                storeCode,
                reviewDTO.getReviewTitle(),
                reviewDTO.getReviewContent(),
                reviewDTO.getReviewStar()
        );

        // 리뷰 저장
        Review savedReview = reviewRepository.save(review);

        // 저장된 리뷰를 DTO로 변환
        ReviewDTO savedReviewDTO = new ReviewDTO();
        savedReviewDTO.setReviewCode(savedReview.getReviewCode());
        savedReviewDTO.setMemberCode(savedReview.getMemberCode());
        savedReviewDTO.setStoreCode(savedReview.getStoreCode());
        savedReviewDTO.setReviewTitle(savedReview.getReviewTitle());
        savedReviewDTO.setReviewContent(savedReview.getReviewContent());
        savedReviewDTO.setCreateDate(savedReview.getCreateDate());
        savedReviewDTO.setModifyedDate(savedReview.getModifyedDate());
        savedReviewDTO.setReviewStar(savedReview.getReviewStar());

        // memberNickname 설정
        memberRepository.findById(savedReview.getMemberCode()).ifPresent(member -> {
            savedReviewDTO.setMemberNickname(member.getMemberNickname());
        });

        // storeName 설정
        storeRepository.findById(savedReview.getStoreCode()).ifPresent(storeEntity -> {
            savedReviewDTO.setStoreName(storeEntity.getStoreName());
        });

        return savedReviewDTO;
    }
}
