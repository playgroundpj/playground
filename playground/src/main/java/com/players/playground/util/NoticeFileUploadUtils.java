package com.players.playground.util;

import org.apache.commons.io.FilenameUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

public class NoticeFileUploadUtils {


    private static final Logger log = LoggerFactory.getLogger(FileUploadUtils.class);
    private static final String UPLOAD_DIR = "C:/mySea/playGround_2/playground/src/main/resources/static/noticeimages";

    public static String saveFile(String fileName, MultipartFile multipartFile) throws IOException {

        Path uploadPath = Paths.get(UPLOAD_DIR);

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String replaceFileName = fileName + "." + FilenameUtils.getExtension(multipartFile.getOriginalFilename());

        try (InputStream inputStream = multipartFile.getInputStream()) {
            Path filePath = uploadPath.resolve(replaceFileName);
            Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException ex) {
            throw new IOException("Could not save file: " + fileName, ex);
        }

        // URL 반환
        return "/noticeimages/" + replaceFileName;
    }

    public static boolean deleteFile(String fileName) {

        boolean result = false;
        Path uploadPath = Paths.get(UPLOAD_DIR);

        if (!Files.exists(uploadPath)) {
            result = true;
        }
        try {
            Path filePath = uploadPath.resolve(fileName);
            Files.delete(filePath);
            result = true;
        } catch (IOException ex) {
            log.error("Could not delete file: {}", fileName, ex);
        }

        return result;
    }
}
