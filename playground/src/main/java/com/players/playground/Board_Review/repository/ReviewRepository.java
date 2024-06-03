package com.players.playground.Board_Review.repository;

import com.players.playground.Board_Review.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Integer> {
    
    // 리뷰 조회
    Page<Review> findByStoreStoreName(String storeName, Pageable pageable);
    long countByStoreStoreName(String storeName);
}
