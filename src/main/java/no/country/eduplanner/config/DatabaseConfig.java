package no.country.eduplanner.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;
import java.net.URI;

@Slf4j
@Configuration
public class DatabaseConfig {


    @Value("${app.datasource.database-originalUrl}")
    private String databaseUrlFromProperties;

    @Value("${app.datasource.username}")
    private String username;

    @Value("${app.datasource.password}")
    private String password;

    @Bean
    public DataSource dataSource() {
        String databaseUrl = System.getenv("DATABASE_URL");
        HikariConfig config = new HikariConfig();


        if (databaseUrl != null && databaseUrl.startsWith("postgres://")) {
            databaseUrl = convertPostgresUrlToJdbc(databaseUrl);
            log.info("Converted Postgres URL to JDBC URL");
        } else {
            databaseUrl = databaseUrlFromProperties;
            config.setUsername(username);
            config.setPassword(password);
            log.info("Using application properties configuration");
        }
        log.info("Database URL loaded: {}", databaseUrl);

        config.setJdbcUrl(databaseUrl);
        config.setDriverClassName("org.postgresql.Driver");
        config.setMaximumPoolSize(5);
        config.setMinimumIdle(1);
        config.setConnectionTimeout(20000);
        config.setInitializationFailTimeout(0);

        // test query
        config.setConnectionTestQuery("SELECT 1");

        // timeout validation
        config.setValidationTimeout(5000);


        return new HikariDataSource(config);
    }

    // weird conversion needed by fly.io to work with postgres
    public static String convertPostgresUrlToJdbc(String postgresUrl) {
        URI uri = URI.create(postgresUrl);
        String host = uri.getHost();
        int port = uri.getPort();
        String path = uri.getPath();
        String[] userInfo = uri.getUserInfo().split(":");

        return String.format("jdbc:postgresql://%s:%d%s?user=%s&password=%s&sslmode=disable",
                host,
                port,
                path,
                userInfo[0],
                userInfo[1]
        );
    }

}
