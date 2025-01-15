package no.country.eduplanner.auth.controller;

import jakarta.validation.Valid;
import no.country.eduplanner.auth.controller.request.CreateUserDTO;
import no.country.eduplanner.auth.models.ERole;
import no.country.eduplanner.auth.models.RoleEntity;
import no.country.eduplanner.auth.models.UserEntity;
import no.country.eduplanner.auth.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;
import java.util.stream.Collectors;

@RestController
public class PrincipalController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/hello")
    public String hello(){
        return "Hola Mundo No seguro";
    }

    @GetMapping("/hello-secured")
    public String helloSecured(){
        return "Hola Mundo seguro";
    }

    @PostMapping("/create-user")
    public ResponseEntity<?> createUser(@Valid @RequestBody CreateUserDTO createUserDTO){

        Set<RoleEntity> roles = createUserDTO.getRoles().stream()
                .map(role-> RoleEntity.builder()
                        .name(ERole.valueOf(role))
                        .build())
                .collect(Collectors.toSet());

        UserEntity userEntity = UserEntity.builder()
                .username(createUserDTO.getUsername())
                .password(createUserDTO.getPassword())
                .email(createUserDTO.getEmail())
                .roles(roles)
                .build();

        userRepository.save(userEntity);

        return ResponseEntity.ok(userEntity);
    }

    @DeleteMapping("deleteUser")
    public String deleteUser(@RequestParam String id){
        userRepository.deleteById(Long.parseLong(id));
        return  "Se ha borrado el usuario con id".concat(id);
    }
}
