import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const pointTable = sqliteTable('point_table', {
	id: integer().primaryKey({ autoIncrement: true }),
	name: text().notNull(),
});
