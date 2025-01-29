package no.country.eduplanner.auth.controller;

import lombok.RequiredArgsConstructor;
import no.country.eduplanner.auth.controller.apidocs.CurrentUserApi;
import no.country.eduplanner.auth.dto.ProfileRequest;
import no.country.eduplanner.auth.dto.UserData;
import no.country.eduplanner.auth.models.UserEntity;
import no.country.eduplanner.auth.services.UserDataService;
import no.country.eduplanner.auth.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/auth/current-user")
@RequiredArgsConstructor
public class CurrentUserController implements CurrentUserApi {

    private final UserDataService userDataService;
    private final UserService userService;

    @GetMapping
    public UserData getCurrentUserData() {
        return userDataService.getCurrentUserData();
    }

    @PutMapping("/{userId}")
    public ResponseEntity<UserData> updateUserProfile(
            @PathVariable Long userId,
            @RequestPart(value ="profile", required = false) ProfileRequest profileRequest,  // Perfil sin imagen
            @RequestPart(value = "file", required = false) MultipartFile file // Imagen opcional
    ) {
        UserData updatedUser = userService.updateUser(userId, profileRequest, file);
        return ResponseEntity.ok(updatedUser);
    }

}
