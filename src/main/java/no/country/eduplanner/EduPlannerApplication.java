package no.country.eduplanner;

//import no.country.eduplanner.auth.repository.UserRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EduPlannerApplication {

    public static void main(String[] args) {
        SpringApplication.run(EduPlannerApplication.class, args);
    }

        /*@Bean
        CommandLineRunner init(UserRepository userRepository){
            return args -> {
                ///*PERMISOS
                PermissionEntity createPermission = PermissionEntity.builder()
                        .name("CREATE")
                        .build();

                PermissionEntity readPermission = PermissionEntity.builder()
                        .name("READ")
                        .build();

                PermissionEntity updatePermission = PermissionEntity.builder()
                        .name("UPDATE")
                        .build();

                PermissionEntity deletePermission = PermissionEntity.builder()
                        .name("DELETE")
                        .build();

                ///*ROLES
                RoleEntity roleAdmin = RoleEntity.builder()
                        .eRole(ERole.ADMIN)
                        .permissionList(Set.of(createPermission, readPermission, updatePermission, deletePermission))
                        .build();

                RoleEntity roleStudent = RoleEntity.builder()
                        .eRole(ERole.STUDENT)
                        .permissionList(Set.of(readPermission))
                        .build();
                //*Creación de usuarios
                UserEntity userAdmin = UserEntity.builder()
                        .username("fabian")
                        .password("1234")
                        .isEnabled(true)
                        .accountNoExpired(true)
                        .accountNoLocked(true)
                        .credentialNoExpired(true)
                        .roles(Set.of(roleAdmin))
                        .build();

                UserEntity userStudent = UserEntity.builder()
                        .username("anaid")
                        .password("1234")
                        .isEnabled(true)
                        .accountNoExpired(true)
                        .accountNoLocked(true)
                        .credentialNoExpired(true)
                        .roles(Set.of(roleAdmin))
                        .build();
                userRepository.saveAll(List.of(userAdmin, userStudent));
            };
        }*/
    }
