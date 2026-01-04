package com.example.data_analytics_demo.model;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "campaign_daily_kpi")
@Data
public class CampaignDailyKpi {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "campaign_id")
    private Campaign campaign;

    private Integer impressions;

    private Integer clicks;

    @Column(precision = 19, scale = 4)
    private BigDecimal spend;

    private Integer registrations;

    private Integer ftds;

    @Column(name = "deposits_amount", precision = 19, scale = 4)
    private BigDecimal depositsAmount;

    @Column(name = "withdrawals_amount", precision = 19, scale = 4)
    private BigDecimal withdrawalsAmount;

    @Column(name = "bonus_cost", precision = 19, scale = 4)
    private BigDecimal bonusCost;

    @Column(precision = 19, scale = 4)
    private BigDecimal ggr;

    @Column(precision = 19, scale = 4)
    private BigDecimal ngr;
}