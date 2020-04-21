package com.lunchtime.security;

import lombok.Getter;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Getter
@Component
public class TokenHistory {
    private List<String> tokenList = new ArrayList<>();
}
