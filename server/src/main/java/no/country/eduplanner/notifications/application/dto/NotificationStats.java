package no.country.eduplanner.notifications.application.dto;

public record NotificationStats(
        long totalNotifications,
        long nonExpiredNotifications,
        long expiredNotifications
) {
}
