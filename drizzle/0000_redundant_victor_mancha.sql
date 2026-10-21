CREATE TABLE `limits` (
	`key` text PRIMARY KEY NOT NULL,
	`count` integer NOT NULL,
	`expires` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `plans` (
	`student` text PRIMARY KEY NOT NULL,
	`data` text NOT NULL,
	`updated` integer NOT NULL,
	FOREIGN KEY (`student`) REFERENCES `students`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`token` text PRIMARY KEY NOT NULL,
	`student` text NOT NULL,
	`expires` integer NOT NULL,
	FOREIGN KEY (`student`) REFERENCES `students`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `students` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`created` integer NOT NULL,
	`terms` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `students_email_unique` ON `students` (`email`);