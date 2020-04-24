package com.lunchtime.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.env.Environment;

import javax.annotation.PostConstruct;
import java.util.TimeZone;

@Configuration
@Profile("prod")
public class TimeConfiguration {

    private final Environment env;

    public TimeConfiguration(Environment env) {
        this.env = env;
    }

    @PostConstruct
    void started() {
        String timezone = env.getProperty("timezone");
        TimeZone.setDefault(TimeZone.getTimeZone(timezone));
    }
}
