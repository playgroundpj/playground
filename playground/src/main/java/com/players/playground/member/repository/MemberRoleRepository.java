package com.players.playground.member.repository;

import com.players.playground.member.entity.MemberRole;
import com.players.playground.member.entity.MemberRolePk;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MemberRoleRepository extends JpaRepository<MemberRole, MemberRolePk>{

    @Query("SELECT mr FROM MemberRole mr WHERE mr.memberNo = :memberNo")
    List<MemberRole> findByMemberNo(@Param("memberNo") int memberNo);



    @Modifying
    @Transactional
    @Query("DELETE FROM MemberRole mr WHERE mr.memberNo = :memberNo")
    void deleteByMemberNo(@Param("memberNo") int memberNo);
}
