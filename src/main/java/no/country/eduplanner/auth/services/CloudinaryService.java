package no.country.eduplanner.auth.services;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
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
            Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
            String originalUrl = (String) uploadResult.get("url");

            // Subida de la imagen reducida con transformación
//            Map thumbnailResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
//                    "transformation", ObjectUtils.asMap(
//                            "width", 150,
//                            "height", 150,
//                            "crop", "fill",
//                            "quality", "auto:low"
//                    )
//            ));
            String thumbnailUrl = adjustForLowSize(originalUrl);

            // Crear y devolver la entidad Image con ambas URLs
            return new Image(originalUrl, thumbnailUrl);
        } catch (Exception e) {
            throw new ImageUploadException("Error al subir la imagen", e);
        }
    }

    private static String adjustForLowSize(String secureUrl) {
        if (secureUrl == null) return null;
        return secureUrl.replace("/upload/", "/upload/w_400,c_scale,q_auto,f_auto,dpr_auto/");
    }
}


