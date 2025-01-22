package no.country.eduplanner.auth.controller;

import lombok.RequiredArgsConstructor;
import no.country.eduplanner.auth.dto.UserData;
import no.country.eduplanner.auth.services.UserDataService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth/current-user")
@RequiredArgsConstructor
public class CurrentUserController {

    private final UserDataService userDataService;

    @GetMapping
    public UserData getCurrentUserData() {
        return userDataService.getCurrentUserData();
    }

}
