package com.example.data_analytics_demo.service;

import com.example.data_analytics_demo.model.EmailCampaignDailyKpi;
import com.example.data_analytics_demo.repository.EmailCampaignDailyKpiRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EmailCampaignKpiService {

    private final EmailCampaignDailyKpiRepository emailCampaignDailyKpiRepository;

    public List<EmailCampaignDailyKpi> getDailyKpis(Long emailCampaignId, LocalDate from, LocalDate to) {
        return emailCampaignDailyKpiRepository
                .findByEmailCampaignIdAndDateBetweenOrderByDateAsc(emailCampaignId, from, to);
    }
}
