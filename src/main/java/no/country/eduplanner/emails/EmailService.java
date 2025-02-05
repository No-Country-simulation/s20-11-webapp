package no.country.eduplanner.emails;

import jakarta.mail.MessagingException;
import org.thymeleaf.context.Context;

public interface EmailService {

     void sendHtmlEmail(String to, String subject, String templateName, Context context) throws MessagingException;
}
