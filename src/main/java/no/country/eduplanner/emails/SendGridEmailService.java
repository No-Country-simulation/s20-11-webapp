package no.country.eduplanner.emails;

import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import no.country.eduplanner.shared.application.events.NewUserRegisteredEvent;
import no.country.eduplanner.shared.application.events.StudentRegistrationSucceedEvent;
import no.country.eduplanner.shared.application.events.UserAccountLockedEvent;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.modulith.events.ApplicationModuleListener;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Slf4j
@Service
@Profile("prod")
@RequiredArgsConstructor
public class SendGridEmailService implements EmailService{


    private static final String EMAIL_ENDPOINT = "mail/send";
    private final SendGrid sendGrid;
    private final TemplateEngine templateEngine;

    @Value("${app.frontend-url}")
    private String appUrl;

    @Value("${app.mail-from}")
    private String mailFrom;

    @Override
    public void sendHtmlEmail(String to, String subject, String templateName, Context context) throws MessagingException {
        Email from = new Email(mailFrom);
        Email toEmail = new Email(to);
        String htmlContent = templateEngine.process(templateName, context);
        Content content = new Content("text/html", htmlContent);
        Mail mail = new Mail(from, subject, toEmail, content);

        try {
            Request request = new Request();
            request.setMethod(Method.POST);
            request.setEndpoint(EMAIL_ENDPOINT);
            request.setBody(mail.build());
            Response response = sendGrid.api(request);

            if (response.getStatusCode() >= 400) {
                log.error("SendGrid API error: {} - {}", response.getStatusCode(), response.getBody());
                throw new RuntimeException("Failed to send email");
            }
        } catch (Exception e) {
            log.error("Error sending HTML email", e);
            throw new RuntimeException("Failed to send HTML email", e);
        }
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
