CREATE TABLE
  `bills` (
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `amount` decimal(10, 2) NOT NULL,
    `due_date` date NOT NULL,
    `status` varchar(50) NOT NULL,
    `is_generated_by_recurrence` tinyint(1) NOT NULL DEFAULT '0',
    `user` varchar(255) NOT NULL,
    `modified_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
  ) ENGINE = InnoDB AUTO_INCREMENT = 16 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci