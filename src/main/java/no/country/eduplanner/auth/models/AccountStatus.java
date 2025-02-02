package no.country.eduplanner.auth.models;

public enum AccountStatus {
    ACTIVE,
    LOCKED,
    UNVERIFIED,
    DISABLED;

    public boolean isActive() {
        return this == ACTIVE;
    }

    public boolean isLocked() {
        return this == LOCKED;
    }

    public boolean isUnverified() {
        return this == UNVERIFIED;
    }

    public boolean isDisabled() {
        return this == DISABLED;
    }

    public static AccountStatus fromString(String status) {
        return AccountStatus.valueOf(status);
    }
}
