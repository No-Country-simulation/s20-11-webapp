package no.country.eduplanner.emails;

import lombok.RequiredArgsConstructor;
import no.country.eduplanner.shared.application.events.StudentRegistrationSucceedEvent;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.modulith.events.ApplicationModuleListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    public static final String APP_URL = "https://eduplanner.fly.dev/login"; //TODO: GET THIS FROM PROPERTIES/ENVIRONMENT
    private final JavaMailSender mailSender;

    public void sendEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }

    @ApplicationModuleListener
    public void onStudentRegistrationSucceed(StudentRegistrationSucceedEvent event) {
        sendEmail(event.email(), "Has sido registrado como Estudiante en EducPlanner",
                """
                        Bienvenido a EducPlanner! 👋
                        
                        Has sido registrado como Estudiante para el curso %s.
                        Estas son tus credenciales para ingresar a la plataforma:
                        
                        Correo Electrónico: %s
                        Contraseña: %s
                        
                        Puedes ingresar a la plataforma en %s
                        No olvides cambiar tu contraseña por tu seguridad!
                        """.formatted(event.courseName(), event.email(), event.tempPassword(), APP_URL));
    }
}
