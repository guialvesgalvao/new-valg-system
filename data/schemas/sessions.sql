CREATE TABLE
  `sessions` (
    `id` int unsigned NOT NULL AUTO_INCREMENT,
    `user_id` int unsigned NOT NULL,
    `access_token` varchar(255) DEFAULT NULL,
    `refresh_token` varchar(255) DEFAULT NULL,
    `access_token_expires_at` datetime NOT NULL,
    `refresh_token_expires_at` datetime DEFAULT NULL,
    `token_type` varchar(255) DEFAULT NULL,
    `modified_at` date DEFAULT NULL,
    `created_at` date DEFAULT NULL,
    `revoked` tinyint(1) DEFAULT '0',
    `amazon_user_id` varchar(255) DEFAULT NULL,
    `otp_code_expires_at` datetime DEFAULT NULL,
    `otp_code` char(6) DEFAULT NULL,
    PRIMARY KEY (`id`, `user_id`),
    KEY `fk_sessions_users` (`user_id`),
    CONSTRAINT `fk_sessions_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci