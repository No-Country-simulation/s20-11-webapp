package no.country.eduplanner.auth.controller;

import lombok.RequiredArgsConstructor;
import no.country.eduplanner.auth.controller.apidocs.CurrentUserApi;
import no.country.eduplanner.auth.dto.ProfileRequest;
import no.country.eduplanner.auth.dto.UserData;
import no.country.eduplanner.auth.services.UserDataService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/auth/current-user")
@RequiredArgsConstructor
public class CurrentUserController implements CurrentUserApi {

    private final UserDataService userDataService;

    @GetMapping
    public UserData getCurrentUserData() {
        return userDataService.getCurrentUserData();
    }

    @PutMapping()
    public UserData updateUserProfile(
            @RequestPart(value = "profile", required = false) ProfileRequest profileRequest,  // Perfil sin imagen
            @RequestPart(value = "file", required = false) MultipartFile file // Imagen opcional
    ) {
        return userDataService.updateUser(profileRequest, file);

    }

}
