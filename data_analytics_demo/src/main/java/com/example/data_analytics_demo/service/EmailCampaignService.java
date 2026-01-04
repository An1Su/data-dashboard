package com.example.data_analytics_demo.service;

import com.example.data_analytics_demo.model.EmailCampaign;
import com.example.data_analytics_demo.repository.EmailCampaignRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmailCampaignService {

    private final EmailCampaignRepository emailCampaignRepository;

    public List<EmailCampaign> getAllEmailCampaigns() {
        return emailCampaignRepository.findAll();
    }
}
