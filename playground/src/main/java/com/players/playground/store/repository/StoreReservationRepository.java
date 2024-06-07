package com.players.playground.store.repository;

import com.players.playground.store.entity.StoreMenu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StoreReservationRepository extends JpaRepository<StoreMenu, Integer> {

}
