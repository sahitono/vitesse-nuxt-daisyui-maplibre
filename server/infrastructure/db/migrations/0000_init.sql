CREATE TABLE `refresh_token` (
	`jti` text NOT NULL,
	`token` text NOT NULL,
	`exp` integer NOT NULL,
	`expired_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_jti_expired` ON `refresh_token` (`jti`,`expired_at`);--> statement-breakpoint
CREATE TABLE `role` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `role_name_unique` ON `role` (`name`);--> statement-breakpoint
CREATE TABLE `user_account` (
	`id` text PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`password` text NOT NULL,
	`createdAt` integer,
	`roleId` integer NOT NULL,
	FOREIGN KEY (`roleId`) REFERENCES `role`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_account_username_unique` ON `user_account` (`username`);