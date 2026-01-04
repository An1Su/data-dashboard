package com.example.data_analytics_demo.controller;

import com.example.data_analytics_demo.model.EmailCampaign;
import com.example.data_analytics_demo.model.EmailCampaignDailyKpi;
import com.example.data_analytics_demo.service.EmailCampaignKpiService;
import com.example.data_analytics_demo.service.EmailCampaignService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/email-campaigns")
@RequiredArgsConstructor
public class EmailCampaignController {

    private final EmailCampaignService emailCampaignService;
    private final EmailCampaignKpiService emailCampaignKpiService;

    @GetMapping
    public List<EmailCampaign> getAllEmailCampaigns() {
        return emailCampaignService.getAllEmailCampaigns();
    }

    @GetMapping("/{id}/daily")
    public List<EmailCampaignDailyKpi> getDailyKpis(
            @PathVariable Long id,
            @RequestParam("from") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam("to") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to
    ) {
        return emailCampaignKpiService.getDailyKpis(id, from, to);
    }
}
