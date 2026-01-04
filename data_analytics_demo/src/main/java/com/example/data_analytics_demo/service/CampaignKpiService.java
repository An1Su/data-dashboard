package com.example.data_analytics_demo.service;

import com.example.data_analytics_demo.model.CampaignDailyKpi;
import com.example.data_analytics_demo.repository.CampaignDailyKpiRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CampaignKpiService {

    private final CampaignDailyKpiRepository campaignDailyKpiRepository;

    public List<CampaignDailyKpi> getDailyKpis(Long campaignId, LocalDate from, LocalDate to) {
        return campaignDailyKpiRepository
                .findByCampaignIdAndDateBetweenOrderByDateAsc(campaignId, from, to);
    }
}
