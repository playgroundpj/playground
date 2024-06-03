package com.players.playground.product.service;

import com.players.playground.product.entity.Menu;
import com.players.playground.product.repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MenuService {

    @Autowired
    private MenuRepository menuRepository;

    public List<Menu> getAllMenus() {
        return menuRepository.findAll();
    }

    public Menu getMenuById(Long id) {
        return menuRepository.findById(id).orElse(null);
    }

    public Menu saveMenu(Menu menu) {
        return menuRepository.save(menu);
    }

    public Menu updateMenu(Long id, Menu menuDetails) {
        Menu menu = menuRepository.findById(id).orElseThrow(() -> new RuntimeException("Menu not found"));

        menu.setMenuName(menuDetails.getMenuName());
        menu.setCategory(menuDetails.getCategory());
        menu.setMenuContent(menuDetails.getMenuContent());
        menu.setMenuPrice(menuDetails.getMenuPrice());
        menu.setOrderableStatus(menuDetails.isOrderableStatus());

        return menuRepository.save(menu);
    }

    public void deleteMenu(Long id) {
        menuRepository.deleteById(id);
    }

    public List<Menu> searchMenusByName(String name) {
        return menuRepository.findByMenuNameContaining(name);
    }
}
