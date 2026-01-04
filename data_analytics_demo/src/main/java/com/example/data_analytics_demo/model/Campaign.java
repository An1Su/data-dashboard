package com.example.data_analytics_demo.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "campaign")
@Data
public class Campaign {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String channel;

    private String country;

    @Column(precision = 19, scale = 4)
    private BigDecimal budget;

    private LocalDate startDate;

    private LocalDate endDate;
}
