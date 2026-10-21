CREATE TABLE `bot_links` (
	`code` text PRIMARY KEY NOT NULL,
	`student` text NOT NULL,
	`snapshot` text NOT NULL,
	`expires` integer NOT NULL,
	`phone_hash` text,
	FOREIGN KEY (`student`) REFERENCES `students`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `bot_messages` (
	`id` text PRIMARY KEY NOT NULL,
	`expires` integer NOT NULL,
	`sent` integer NOT NULL
);
