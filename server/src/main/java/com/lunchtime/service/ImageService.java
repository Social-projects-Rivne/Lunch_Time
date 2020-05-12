package com.lunchtime.service;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ImageService {
    List<String> saveImage(List<MultipartFile> file, String endpoint);

    byte[] loadImage(String endpoint, long id);
}
