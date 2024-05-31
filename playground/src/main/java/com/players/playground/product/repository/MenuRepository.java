package com.players.playground.product.repository;

import com.players.playground.product.entity.Menu;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MenuRepository extends JpaRepository<Menu, Long> {
    List<Menu> findByMenuNameContaining(String name);
}
