package com.players.playground.store.repository;

import com.players.playground.store.entity.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StoreRepository extends JpaRepository<Store, Integer> {
    Optional<Store> findByStoreName(String storeName);

    Store findByStoreCode(Integer integer);
    @Query("SELECT MAX(s.storeCode) FROM Store s")
    int maxStoreCode();
}
