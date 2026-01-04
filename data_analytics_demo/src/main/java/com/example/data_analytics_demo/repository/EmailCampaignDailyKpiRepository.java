package com.example.data_analytics_demo.repository;

import com.example.data_analytics_demo.model.EmailCampaignDailyKpi;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface EmailCampaignDailyKpiRepository extends JpaRepository<EmailCampaignDailyKpi, Long> {

    List<EmailCampaignDailyKpi> findByEmailCampaignIdAndDateBetweenOrderByDateAsc(
            Long emailCampaignId,
            LocalDate from,
            LocalDate to
    );
}
