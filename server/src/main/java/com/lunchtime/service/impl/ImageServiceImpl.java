package com.lunchtime.service.impl;

import com.lunchtime.config.ResourcesPath;
import com.lunchtime.service.ImageService;
import org.springframework.core.io.FileSystemResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;

@Service
public class ImageServiceImpl implements ImageService {

    private static final List<String> CONTENT_TYPES = Arrays.asList("image/png", "image/jpeg");

    public boolean saveImage(MultipartFile file, String endpoint) {
        try {
            String fileContentType = file.getContentType();
            if (!CONTENT_TYPES.contains(fileContentType)) {
                return false;
            }
            byte[] bytes = file.getBytes();
            String filePath = ResourcesPath.getResourcePath() + "images/" + endpoint + "/";
            Path path = Paths.get(filePath + file.getOriginalFilename());
            Files.write(path, bytes);
            return true;
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }

    public byte[] loadImage(String endpoint, long id) {
        FileSystemResource file = new FileSystemResource(ResourcesPath.getResourcePath()
            + "images/" + endpoint + "/" + id + ".jpg");
        try {
            return StreamUtils.copyToByteArray(file.getInputStream());
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
