package com.example.data_analytics_demo.repository;

import com.example.data_analytics_demo.model.EmailCampaign;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmailCampaignRepository extends JpaRepository<EmailCampaign, Long> {
}
