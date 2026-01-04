package com.example.data_analytics_demo.repository;

import com.example.data_analytics_demo.model.Campaign;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CampaignRepository extends JpaRepository<Campaign, Long> {
}
