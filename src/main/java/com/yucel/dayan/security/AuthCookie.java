package com.yucel.dayan.security;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseCookie;

import java.util.Arrays;
import java.util.Optional;

public class AuthCookie {
    public static final String COOKIE_NAME = "AUTH";

    public static ResponseCookie buildAuthCookie(String jwt, boolean secure) {
        return ResponseCookie.from(COOKIE_NAME, jwt)
                .httpOnly(true)
                .secure(secure) // prod: true (https)
                .sameSite("Lax") // admin panel aynı siteyse Lax iyi
                .path("/")
                .maxAge(60 * 60) // 1 saat (ttl ile uyumlu)
                .build();
    }

    public static ResponseCookie clearAuthCookie(boolean secure) {
        return ResponseCookie.from(COOKIE_NAME, "")
                .httpOnly(true)
                .secure(secure)
                .sameSite("Lax")
                .path("/")
                .maxAge(0)
                .build();
    }

    public static Optional<String> read(HttpServletRequest req) {
        Cookie[] cookies = req.getCookies();
        if (cookies == null) return Optional.empty();
        return Arrays.stream(cookies)
                .filter(c -> COOKIE_NAME.equals(c.getName()))
                .map(Cookie::getValue)
                .findFirst();
    }
}
