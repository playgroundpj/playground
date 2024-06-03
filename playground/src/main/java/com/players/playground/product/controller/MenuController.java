package com.players.playground.product.controller;

import com.players.playground.product.entity.Menu;
import com.players.playground.product.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/menus")
public class MenuController {

    @Autowired
    private MenuService menuService;

    @GetMapping
    public ResponseEntity<List<Menu>> getAllMenus() {
        List<Menu> menus = menuService.getAllMenus();
        return new ResponseEntity<>(menus, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Menu> getMenuById(@PathVariable Long id) {
        Menu menu = menuService.getMenuById(id);
        return new ResponseEntity<>(menu, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Menu> createMenu(@RequestBody Menu menu) {
        Menu newMenu = menuService.saveMenu(menu);
        return new ResponseEntity<>(newMenu, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Menu> updateMenu(@PathVariable Long id, @RequestBody Menu menuDetails) {
        Menu updatedMenu = menuService.updateMenu(id, menuDetails);
        return new ResponseEntity<>(updatedMenu, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteMenu(@PathVariable Long id) {
        menuService.deleteMenu(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Menu>> searchMenus(@RequestParam String name) {
        List<Menu> menus = menuService.searchMenusByName(name);
        return new ResponseEntity<>(menus, HttpStatus.OK);
    }
}
