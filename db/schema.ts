// Intentionally empty by default.
// Add Drizzle tables here when the site actually needs a database.
// See examples/d1/db/schema.ts for an opt-in example.
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
export const students = sqliteTable('students', { id: text('id').primaryKey(), email: text('email').notNull().unique(), password: text('password').notNull(), created: integer('created').notNull(), terms: text('terms').notNull() });
export const sessions = sqliteTable('sessions', { token: text('token').primaryKey(), student: text('student').notNull().references(()=>students.id,{onDelete:'cascade'}), expires: integer('expires').notNull() });
export const plans = sqliteTable('plans', { student: text('student').primaryKey().references(()=>students.id,{onDelete:'cascade'}), data: text('data').notNull(), updated: integer('updated').notNull() });
export const limits = sqliteTable('limits', { key: text('key').primaryKey(), count: integer('count').notNull(), expires: integer('expires').notNull() });
export const botLinks = sqliteTable('bot_links', { code: text('code').primaryKey(), student: text('student').notNull().references(()=>students.id,{onDelete:'cascade'}), snapshot: text('snapshot').notNull(), expires: integer('expires').notNull(), phoneHash: text('phone_hash') });
export const botMessages = sqliteTable('bot_messages', { id:text('id').primaryKey(), expires:integer('expires').notNull(), sent:integer('sent').notNull() });
