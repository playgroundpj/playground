package com.players.playground.product.service;

import com.players.playground.common.Criteria;
import com.players.playground.product.dto.MenuDTO;
import com.players.playground.product.dto.MenuDTO;
import com.players.playground.product.entity.Menu;
import com.players.playground.product.entity.Menu;
import com.players.playground.product.repository.MenuRepository;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MenuService {

    private static final Logger log = LoggerFactory.getLogger(com.players.playground.member.service.AuthService.class);

    private final MenuRepository menuRepository;
    private final ModelMapper modelMapper;

    public MenuService(MenuRepository menuRepository, ModelMapper modelMapper) {
        this.menuRepository = menuRepository;
        this.modelMapper = modelMapper;
    }

    @Value("${image.image-dir}")
    private String IMAGE_DIR;

    @Value("${image.image-url}")
    private String IMAGE_URL;

    public int selectMenuTotal() {

        log.info("[MenuService] selectMenuTotal Start =======================");

        List<Menu> menuList = menuRepository.findAll();


        log.info("[MenuService] selectMenuTotal End =======================");

        return menuList.size();

    }


    public Object selectMenuListWithPaging(Criteria cri) {

        log.info("[MenuService] selectMenuListWithPaging() Start");

        int index = cri.getPageNum() -1;
        int count = cri.getAmount();
        Pageable paging = PageRequest.of(index, count, Sort.by("menuCode").descending());

        Page<Menu> result = menuRepository.findAll(paging);
        List<Menu> menuList = (List<Menu>)result.getContent();

        for(int i = 0 ; i < menuList.size() ; i++) {
            menuList.get(i).setMenuImg(IMAGE_URL + menuList.get(i).getMenuImg());
        }

        log.info("[MenuService] selectMenuListWithPaging() End");

        return menuList.stream().map(menu -> modelMapper.map(menu, MenuDTO.class)).collect(Collectors.toList());


    }

    public Object selectMenuAll() {

        log.info("[MenuService] selectMenuAll() Start.");

        List<Menu> menuList = menuRepository.findAll();
        for(int i = 0 ; i < menuList.size() ; i++) {
            menuList.get(i).setMenuImg(IMAGE_URL + menuList.get(i).getMenuImg());
        }

        return menuList.stream()
                .map(menu -> modelMapper.map(menu, MenuDTO.class))
                .collect(Collectors.toList());

    }


    public Object findMenuByCode(String menuCode) {

        log.info("[MenuService] findMenuByCode Start =======================");

        Menu menu = menuRepository.findByMenuCode(Integer.valueOf(menuCode));
        log.info("[MenuService] {}", menu);
        menu.setMenuImg(IMAGE_URL + menu.getMenuImg());
        log.info("[MenuService] findMenuByCode End =========================");

        return modelMapper.map(menu, MenuDTO.class);

    }

    public Object findMenuByMenuName(String menuName) {

        log.info("[MenuService] findMenuByMenuName Start =======================");

        /* 설명. 메뉴 중복 유효성 확인 */


        if(menuRepository.findByMenuName(menuName).isPresent()){
            Menu menu = menuRepository.findByMenuName(menuName).get();
            log.info("[MenuService] {}", menu);
            menu.setMenuImg(IMAGE_URL + menu.getMenuImg());
            log.info("[MenuService] findMenuByMenuName End =========================");
            return modelMapper.map(menu, MenuDTO.class);
        }else{
            return "사용 가능한 메뉴명입니다";
        }

    }
    
    
    
    
    
}
