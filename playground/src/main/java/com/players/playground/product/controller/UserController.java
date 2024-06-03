package com.players.playground.product.controller;

import com.players.playground.product.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/check-admin")
    public ResponseEntity<?> checkAdmin(Principal principal) {
        if (principal == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        boolean isAdmin = userService.isAdmin(principal.getName());
        return new ResponseEntity<>(new CheckAdminResponse(isAdmin), HttpStatus.OK);
    }

    private static class CheckAdminResponse {
        private boolean isAdmin;

        public CheckAdminResponse(boolean isAdmin) {
            this.isAdmin = isAdmin;
        }

        public boolean isAdmin() {
            return isAdmin;
        }

        public void setAdmin(boolean admin) {
            isAdmin = admin;
        }
    }
}
