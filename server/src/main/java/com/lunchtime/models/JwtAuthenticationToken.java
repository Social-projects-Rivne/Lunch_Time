package com.lunchtime.models;

import java.io.Serializable;

public class JwtAuthenticationToken implements Serializable {
    private final String jwt;

    public JwtAuthenticationToken(String jwt) {
        this.jwt = jwt;
    }

    public String getJwt() {
        return jwt;
    }
}
