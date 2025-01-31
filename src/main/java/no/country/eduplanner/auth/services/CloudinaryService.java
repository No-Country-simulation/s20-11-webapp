package no.country.eduplanner.auth.services;

import com.cloudinary.Cloudinary;
import no.country.eduplanner.auth.exceptions.ImageUploadException;
import no.country.eduplanner.shared.domain.vo.Image;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@Service
public class CloudinaryService {

    private final Cloudinary cloudinary;

    public CloudinaryService(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    public Image uploadImage(MultipartFile file) {
        try {
            // Subida de la imagen original
            Map uploadResult = cloudinary.uploader().upload(file.getBytes(), Map.of(
                    "resource_type", "auto",
                    "fetch_format", "auto",
                    "quality", "auto",
                    "format", "webp",
                    "compression", "low",
                    "flags", "lossy",
                    "asset_folder", "educplanner-profile-photos"
            ));
            String originalUrl = (String) uploadResult.get("url");


            String thumbnailUrl = adjustForLowSize(originalUrl);

            // Crear y devolver la entidad Image con ambas URLs
            return new Image(originalUrl, thumbnailUrl);
        } catch (Exception e) {
            throw new ImageUploadException("Error al subir la imagen", e);
        }
    }

    private static String adjustForLowSize(String secureUrl) {
        if (secureUrl == null) return null;
        return secureUrl.replace("/upload/", "/upload/w_150,c_scale,q_auto,f_auto,dpr_auto/");
    }
}


