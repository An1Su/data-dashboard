package com.example.data_analytics_demo.repository;

import com.example.data_analytics_demo.model.CampaignDailyKpi;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface CampaignDailyKpiRepository extends JpaRepository<CampaignDailyKpi, Long> {

    List<CampaignDailyKpi> findByCampaignIdAndDateBetweenOrderByDateAsc(
            Long campaignId,
            LocalDate from,
            LocalDate to
    );

}
