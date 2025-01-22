package no.country.eduplanner.auth.services;

import no.country.eduplanner.auth.dtos.RegisterDTO;
import no.country.eduplanner.auth.models.ERole;
import no.country.eduplanner.auth.models.RoleEntity;
import no.country.eduplanner.auth.models.UserEntity;
import no.country.eduplanner.auth.repository.RoleRepository;
import no.country.eduplanner.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Set;

public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public UserEntity registerNewUser(RegisterDTO registerDTO) {
        // Verificar si el usuario ya existe
        if (userRepository.existsByUsername(registerDTO.getUsername())) {
            throw new RuntimeException("El nombre de usuario ya está en uso.");
        }

        if (userRepository.existsByEmail(registerDTO.getEmail())) {
            throw new RuntimeException("El email ya está en uso.");
        }

        // Crear un nuevo usuario con los datos proporcionados
        UserEntity user = new UserEntity();
        user.setUsername(registerDTO.getUsername());
        user.setEmail(registerDTO.getEmail());
        user.setPassword(passwordEncoder.encode(registerDTO.getPassword())); // Encriptar la contraseña

        // Asignar un rol por defecto, por ejemplo "USER"
        RoleEntity role = roleRepository.findByName(ERole.valueOf("USER")).orElseThrow(() -> new RuntimeException("Rol no encontrado"));
        user.setRoles(Set.of(role));

        return userRepository.save(user);
    }
}
