package com.lunchtime.service.impl;

import com.lunchtime.config.ResourcesPath;
import com.lunchtime.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.FileSystemResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RequiredArgsConstructor
@Service
public class ImageServiceImpl implements ImageService {
    private static final List<String> CONTENT_TYPES = Arrays.asList("image/png", "image/jpeg");

    public List<String> saveImage(List<MultipartFile> file, String endpoint) {
        List<String> result = new ArrayList<>();
        for (MultipartFile multipartFile : file) {
            try {
                String fileContentType = multipartFile.getContentType();
                if (!CONTENT_TYPES.contains(fileContentType)) {
                    result.add(null);
                }
                String filePath = ResourcesPath.getResourcePath() + "images/" + endpoint + "/";
                Path path = Paths.get(filePath + multipartFile.getOriginalFilename());
                Files.write(path, multipartFile.getBytes());
                result.add(multipartFile.getOriginalFilename());
            } catch (IOException e) {
                e.printStackTrace();
                result.add(null);
            }
        }
        return result;
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
