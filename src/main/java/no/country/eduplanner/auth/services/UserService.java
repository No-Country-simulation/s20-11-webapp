package no.country.eduplanner.auth.services;

import no.country.eduplanner.auth.dtos.RegisterDTO;
import no.country.eduplanner.auth.models.ERole;
import no.country.eduplanner.auth.models.RoleEntity;
import no.country.eduplanner.auth.models.UserEntity;
import no.country.eduplanner.auth.repository.RoleRepository;
import no.country.eduplanner.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
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

        // Convertir el rol de String a ERole
        ERole roleEnum = ERole.valueOf(registerDTO.getRole().toUpperCase());

        // Buscar el rol en la base de datos por su valor Enum
        RoleEntity role = roleRepository.findByERole(roleEnum)
                .orElseThrow(() -> new RuntimeException("Rol no encontrado"));

        // Asignar el rol al usuario
        user.setRoles(Set.of(role));

        // Guardar el usuario en la base de datos
        return userRepository.save(user);
    }
}