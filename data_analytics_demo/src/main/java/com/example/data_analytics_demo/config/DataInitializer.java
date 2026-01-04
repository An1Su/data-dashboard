package com.example.data_analytics_demo.config;

import com.example.data_analytics_demo.model.Campaign;
import com.example.data_analytics_demo.model.CampaignDailyKpi;
import com.example.data_analytics_demo.model.EmailCampaign;
import com.example.data_analytics_demo.model.EmailCampaignDailyKpi;
import com.example.data_analytics_demo.repository.CampaignDailyKpiRepository;
import com.example.data_analytics_demo.repository.CampaignRepository;
import com.example.data_analytics_demo.repository.EmailCampaignDailyKpiRepository;
import com.example.data_analytics_demo.repository.EmailCampaignRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Random;


@Component
@RequiredArgsConstructor
public class DataInitializer {

    private final CampaignRepository campaignRepository;
    private final CampaignDailyKpiRepository campaignDailyKpiRepository;

    private final EmailCampaignDailyKpiRepository emailCampaignDailyKpiRepository;
    private final EmailCampaignRepository emailCampaignRepository;

    private final Random random = new Random();

    @PostConstruct
    public void init() {
        // Prevents reseeding as long as any data exists
        if (campaignRepository.count() > 0
                || campaignDailyKpiRepository.count() > 0
                || emailCampaignRepository.count() > 0
                || emailCampaignDailyKpiRepository.count() > 0) {
            return;
        }


        // 1. Create some campaigns
        Campaign c1 = createCampaign("Welcome Bonus FI", "Google Ads", "FI", BigDecimal.valueOf(10000), LocalDate.now().minusDays(60));
        Campaign c2 = createCampaign("Reload Bonus SE", "Facebook", "SE", BigDecimal.valueOf(8000), LocalDate.now().minusDays(45));
        Campaign c3 = createCampaign("VIP Email Reactivation", "Email", "FI", BigDecimal.valueOf(5000), LocalDate.now().minusDays(30));

        campaignRepository.saveAll(List.of(c1, c2, c3));

        // 2. Create 14 days of KPIs for each campaign
        LocalDate today = LocalDate.now();
        LocalDate startDate = today.minusDays(13); // 14 days including today

        for (LocalDate d = startDate; !d.isAfter(today); d = d.plusDays(1)) {
            createDailyKpiForCampaign(d, c1, 1.0);
            createDailyKpiForCampaign(d, c2, 0.8);
            createDailyKpiForCampaign(d, c3, 0.5);
        }

        // 3. Create some email campaigns
        EmailCampaign e1 = createEmailCampaign(
                "VIP Reactivation FI",
                "VIP",
                "We miss you - exclusive bonus just for you!"
        );
        EmailCampaign e2 = createEmailCampaign(
                "Dormant Reactivation SE",
                "Dormant",
                "Come back and play again - special offer inside"
        );

        emailCampaignRepository.saveAll(List.of(e1, e2));

// 4. Create 14 days of KPIs for each email campaign
        for (LocalDate d = startDate; !d.isAfter(today); d = d.plusDays(1)) {
            createDailyEmailKpiForCampaign(d, e1, 1.0);
            createDailyEmailKpiForCampaign(d, e2, 0.8);
        }

    }

    private Campaign createCampaign(String name, String channel, String country, BigDecimal budget, LocalDate startDate) {
        Campaign c = new Campaign();
        c.setName(name);
        c.setChannel(channel);
        c.setCountry(country);
        c.setBudget(budget);
        c.setStartDate(startDate);
        c.setEndDate(null);
        return c;
    }

    private void createDailyKpiForCampaign(LocalDate date, Campaign campaign, double performanceFactor) {
        // Base values
        int baseImpressions = 5000;
        int baseClicks = 300;
        BigDecimal baseSpend = BigDecimal.valueOf(200);
        int baseRegistrations = 20;
        int baseFtds = 5;
        BigDecimal baseDeposits = BigDecimal.valueOf(500);
        BigDecimal baseWithdrawals = BigDecimal.valueOf(200);
        BigDecimal baseBonus = BigDecimal.valueOf(100);
        BigDecimal baseGgr = BigDecimal.valueOf(700);
        BigDecimal baseNgr = BigDecimal.valueOf(400);

        double noise = 0.7 + (random.nextDouble() * 0.6); // between 0.7 and 1.3
        double factor = performanceFactor * noise;

        CampaignDailyKpi kpi = new CampaignDailyKpi();
        kpi.setDate(date);
        kpi.setCampaign(campaign);

        kpi.setImpressions((int) Math.round(baseImpressions * factor));
        kpi.setClicks((int) Math.round(baseClicks * factor));
        kpi.setSpend(baseSpend.multiply(BigDecimal.valueOf(factor)));
        kpi.setRegistrations((int) Math.round(baseRegistrations * factor));
        kpi.setFtds((int) Math.max(1, Math.round(baseFtds * factor)));

        kpi.setDepositsAmount(baseDeposits.multiply(BigDecimal.valueOf(factor)));
        kpi.setWithdrawalsAmount(baseWithdrawals.multiply(BigDecimal.valueOf(factor)));
        kpi.setBonusCost(baseBonus.multiply(BigDecimal.valueOf(factor)));
        kpi.setGgr(baseGgr.multiply(BigDecimal.valueOf(factor)));
        kpi.setNgr(baseNgr.multiply(BigDecimal.valueOf(factor)));

        campaignDailyKpiRepository.save(kpi);
    }
    private EmailCampaign createEmailCampaign(String name, String segment, String subject) {
        EmailCampaign e = new EmailCampaign();
        e.setName(name);
        e.setSegment(segment);
        e.setSubject(subject);
        return e;
    }

    private void createDailyEmailKpiForCampaign(LocalDate date, EmailCampaign emailCampaign, double performanceFactor) {
        int baseSent = 5000;
        int baseOpens = 1500;      // ~30% open rate
        int baseClicks = 400;      // ~8% click rate
        int baseConversions = 50;  // small percentage converts
        BigDecimal baseRevenue = BigDecimal.valueOf(800);
        int baseUnsubscribes = 10;

        double noise = 0.7 + (random.nextDouble() * 0.6); // between 0.7 and 1.3
        double factor = performanceFactor * noise;

        EmailCampaignDailyKpi kpi = new EmailCampaignDailyKpi();
        kpi.setDate(date);
        kpi.setEmailCampaign(emailCampaign);

        kpi.setSent((int) Math.round(baseSent * factor));
        kpi.setOpens((int) Math.round(baseOpens * factor));
        kpi.setClicks((int) Math.round(baseClicks * factor));
        kpi.setConversions((int) Math.max(1, Math.round(baseConversions * factor)));
        kpi.setRevenue(baseRevenue.multiply(BigDecimal.valueOf(factor)));
        kpi.setUnsubscribes((int) Math.max(0, Math.round(baseUnsubscribes * factor)));

        emailCampaignDailyKpiRepository.save(kpi);
    }

}
