package com.lunchtime.service;

import org.springframework.web.multipart.MultipartFile;

public interface ImageService {

    boolean saveImage(MultipartFile file, String endpoint);

    byte[] loadImage(String endpoint, long id);
}
