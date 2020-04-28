package com.lunchtime.config;

import org.springframework.context.annotation.Configuration;

import java.io.File;

@Configuration
public class ResourcesPath {

    public static String getResourcePath() {
        return new File(System.getProperty("user.dir")) + "/static/";
    }
}
