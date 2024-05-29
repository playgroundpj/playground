package com.players.playground.member.repository;

import com.players.playground.member.entity.MemberRole;
import com.players.playground.member.entity.MemberRolePk;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRoleRepository extends JpaRepository<MemberRole, MemberRolePk>{

}
