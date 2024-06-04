package com.players.playground.member.repository;

import com.players.playground.member.entity.Manager;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ManagerRepository  extends JpaRepository<Manager, Integer> {


    void deleteByStoreCode(int storeCode);
}
