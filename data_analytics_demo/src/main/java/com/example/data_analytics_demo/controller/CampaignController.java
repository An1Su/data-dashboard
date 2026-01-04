package com.example.data_analytics_demo.controller;

import com.example.data_analytics_demo.model.Campaign;
import com.example.data_analytics_demo.model.CampaignDailyKpi;
import com.example.data_analytics_demo.service.CampaignKpiService;
import com.example.data_analytics_demo.service.CampaignService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/campaigns")
@RequiredArgsConstructor
public class CampaignController {

    private final CampaignService campaignService;
    private final CampaignKpiService campaignKpiService;

    @GetMapping
    public List<Campaign> getAllCampaigns() {
        return campaignService.getAllCampaigns();
    }

    @GetMapping("/{id}/daily")
    public List<CampaignDailyKpi> getDailyKpis(
            @PathVariable Long id,
            @RequestParam("from") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam("to") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to
    ) {
        return campaignKpiService.getDailyKpis(id, from, to);
    }
}