package com.lunchtime.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;
import java.io.File;

@Configuration
public class ResourceConfiguration {

    @Value("${resourceFolders}")
    private String[] folders;

    @PostConstruct
    void createResourceFolders() {
        for (String folder : folders) {
            File nestedFolder = new File(folder);
            nestedFolder.mkdirs();
        }
    }
}
