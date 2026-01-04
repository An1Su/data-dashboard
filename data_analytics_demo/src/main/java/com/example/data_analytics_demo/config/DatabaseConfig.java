package com.example.data_analytics_demo.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;
import java.net.URI;

@Configuration
public class DatabaseConfig {

    @Value("${DATABASE_URL:}")
    private String databaseUrl;

    @Bean
    @Primary
    public DataSource dataSource() {
        // If DATABASE_URL is provided (Render format: postgresql://user:pass@host:port/db)
        if (databaseUrl != null && !databaseUrl.isEmpty() && !databaseUrl.startsWith("jdbc:")) {
            try {
                URI dbUri = new URI(databaseUrl.replace("postgresql://", "http://"));
                String username = dbUri.getUserInfo().split(":")[0];
                String password = dbUri.getUserInfo().split(":")[1];
                String host = dbUri.getHost();
                int port = dbUri.getPort() == -1 ? 5432 : dbUri.getPort();
                String path = dbUri.getPath();
                String dbName = path.startsWith("/") ? path.substring(1) : path;

                String jdbcUrl = String.format("jdbc:postgresql://%s:%d/%s", host, port, dbName);

                return DataSourceBuilder.create()
                        .url(jdbcUrl)
                        .username(username)
                        .password(password)
                        .driverClassName("org.postgresql.Driver")
                        .build();
            } catch (Exception e) {
                throw new RuntimeException("Failed to parse DATABASE_URL: " + databaseUrl, e);
            }
        }

        // Fallback to default configuration from application.properties
        return DataSourceBuilder.create().build();
    }
}

