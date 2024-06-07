create table
  `recurring_bills` (
    `id` int unsigned not null,
    `name` varchar(255) not null,
    `average_value` FLOAT not null,
    `day_due_date` INT not null,
    `relational_code` INT not null,
    `created_at` timestamp not null default CURRENT_TIMESTAMP,
    primary key (`id`)
  );

alter table
  `recurring_bills`
modify column
  `id` int unsigned not null auto_increment