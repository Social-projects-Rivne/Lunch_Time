package com.lunchtime.controllers;

import com.lunchtime.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/image")
public class ImageController {
    private final ImageService imageService;

    @PostMapping(value = "/upload/{endpoint}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<List<String>> uploadImage(
        @RequestParam List<MultipartFile> file, @PathVariable String endpoint) {
        List<String> result = imageService.saveImage(file, endpoint);
        return ResponseEntity.ok().body(result);
    }

    @GetMapping(value = "/{endpoint}/{id}", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<byte[]> getImage(@PathVariable String endpoint, @PathVariable long id) {
        byte[] result = imageService.loadImage(endpoint, id);
        if (result != null) {
            return ResponseEntity.ok().body(result);
        }
        return ResponseEntity.badRequest().build();
    }
}
