package com.players.playground.product.service;

import org.springframework.stereotype.Service;

@Service
public class UserService {

    public boolean isAdmin(String username) {
        // 여기서 사용자 이름을 통해 관리자인지 여부를 확인하는 로직을 추가하세요.
        // 예를 들어, 사용자 정보를 DB에서 조회하거나 하드코딩된 값을 사용해도 됩니다.
        // 예시로 간단하게 하드코딩된 값으로 관리자를 확인합니다.
        return "admin".equals(username);
    }
}
