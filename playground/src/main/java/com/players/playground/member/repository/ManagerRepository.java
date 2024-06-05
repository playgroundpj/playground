package com.players.playground.member.repository;

import com.players.playground.member.entity.Manager;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ManagerRepository  extends JpaRepository<Manager, Integer> {


    void deleteByStoreCode(int storeCode);

    Manager findByMemberCode(int memberCode);

    @Query("SELECT MAX(m.managerNo) FROM Manager m")
    int maxManagerNo();

    Manager findByStoreCode(int storeCode);
}
