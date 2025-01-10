CREATE TABLE `sessions` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INT UNSIGNED NOT NULL,
    `acess_token` VARCHAR(255),
    `refresh_token` VARCHAR(255),
    `acess_token_expires_at` DATE DEFAULT NULL,
    `refresh_token_expires_at` DATE NOT NULL,
    `token_type` VARCHAR(255),
    `modified_at` DATE,
    `created_at` DATE,
    `revoked` BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (`id`, `user_id`),
    CONSTRAINT `fk_sessions_users` 
        FOREIGN KEY (`user_id`) 
        REFERENCES `users` (`id`)
) ENGINE = InnoDB;
