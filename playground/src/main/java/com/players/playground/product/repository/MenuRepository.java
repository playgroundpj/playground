package com.players.playground.product.repository;

import com.players.playground.product.entity.Menu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MenuRepository extends JpaRepository<Menu, Integer> {

    Menu findByMenuCode(Integer integer);

    Optional<Menu> findByMenuName(String menuName);
}
