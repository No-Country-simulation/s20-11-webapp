package no.country.eduplanner.emails;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import no.country.eduplanner.shared.application.events.NewUserRegisteredEvent;
import no.country.eduplanner.shared.application.events.StudentRegistrationSucceedEvent;
import no.country.eduplanner.shared.application.events.UserAccountLockedEvent;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.modulith.events.ApplicationModuleListener;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;

    @Value("${app.frontend-url}")
    public String appUrl;

    @Value("${app.mail-from}")
    public String mailFrom;

    public void sendEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }

    public void sendHtmlEmail(String to, String subject, String templateName, Context context) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

        String htmlContent = templateEngine.process(templateName, context);

        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(htmlContent, true);

        mailSender.send(mimeMessage);
    }

    @ApplicationModuleListener
    public void onStudentRegistrationSucceed(StudentRegistrationSucceedEvent event) {
        log.info("📧 Sending student credentials email to user [{}]", event.email());
        try {
            Context context = new Context();
            context.setVariable("courseName", event.courseName());
            context.setVariable("email", event.email());
            context.setVariable("password", event.tempPassword());
            context.setVariable("link", appUrl);
            context.setVariable("contactEmail", mailFrom);
            sendHtmlEmail(event.email(),
                    "Has sido registrado como Estudiante en EducPlanner",
                    "email-template",
                    context);

        } catch (Exception e) {
            log.error("Error sending student credentials email", e);
        }
    }

    @ApplicationModuleListener
    public void onNewUserRegistered(NewUserRegisteredEvent event) {
        log.info("📧 Sending verification email to user [{}]", event.email());
        try {
            Context context = new Context();
            context.setVariable("email", event.email());
            context.setVariable("verificationLink", appUrl + "/verify?token=" + event.verificationToken());
            context.setVariable("verificationExpiration", event.verificationExpiration());
            context.setVariable("contactEmail", mailFrom);
            sendHtmlEmail(event.email(),
                    "Bienvenido a EducPlanner",
                    "verification-template",
                    context);
        } catch (Exception e) {
            log.error("Error sending verification email", e);
        }
    }

    @ApplicationModuleListener
    public void onAccountLocked(UserAccountLockedEvent event) {
        log.info("📧 Sending unlock account email to user [{}]", event.email());
        try {
            Context context = new Context();
            context.setVariable("email", event.email());
            context.setVariable("appUrl", appUrl);
            context.setVariable("unlockToken", event.unlockToken());
            context.setVariable("unlockTokenExpiration", event.unlockTokenExpiration());
            context.setVariable("contactEmail", mailFrom);
            sendHtmlEmail(event.email(),
                    "EducPlanner - Cuenta bloqueada",
                    "unlock-template",
                    context);
        } catch (Exception e) {
            log.error("Error sending unlock account email", e);
        }
    }

}
