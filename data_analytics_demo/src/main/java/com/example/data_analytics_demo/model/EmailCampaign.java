package com.example.data_analytics_demo.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "email_campaign")
@Data
public class EmailCampaign {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String segment;

    private String subject;
}
