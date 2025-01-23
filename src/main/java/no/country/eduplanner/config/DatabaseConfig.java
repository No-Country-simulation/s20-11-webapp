package no.country.eduplanner.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;
import java.net.URI;

@Slf4j
@Configuration
public class DatabaseConfig {

    @Bean
    @ConfigurationProperties("spring.datasource")
    public DataSource dataSource() {
        String databaseUrl = System.getenv("DATABASE_URL");
        if (databaseUrl != null && databaseUrl.startsWith("postgres://")) {
            databaseUrl = convertPostgresUrlToJdbc(databaseUrl);
            log.info("Converted Postgres URL to JDBC URL: {}", databaseUrl);
        }
        log.info("\\ud83d\\udfe2 Database URL loaded: {}", databaseUrl);

        HikariConfig config = new HikariConfig();
        config.setJdbcUrl(databaseUrl);
        config.setDriverClassName("org.postgresql.Driver");
        config.setMaximumPoolSize(5);
        config.setMinimumIdle(1);
        config.setConnectionTimeout(20000);
        config.setInitializationFailTimeout(0);

        return new HikariDataSource(config);
    }

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
