package com.example.data_analytics_demo.model;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "email_campaign_daily_kpi")
@Data
public class EmailCampaignDailyKpi {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "email_campaign_id")
    private EmailCampaign emailCampaign;

    private Integer sent;

    private Integer opens;

    private Integer clicks;

    private Integer conversions;

    @Column(precision = 19, scale = 4)
    private BigDecimal revenue;

    private Integer unsubscribes;
}
