package com.players.playground.store.repository;

import com.players.playground.store.entity.StoreMenu;
import com.players.playground.store.entity.StoreReservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StoreReservationRepository extends JpaRepository<StoreReservation, Integer> {

    List<StoreReservation> findByStoreCode(Integer integer);

    List<StoreReservation> findByMemberCode(Integer integer);
}
