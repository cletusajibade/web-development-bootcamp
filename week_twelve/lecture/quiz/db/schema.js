import {
  PgTable,
  serial,
  varchar,
  boolean,
  timestamp,
  integer,
  text,
  pgTable,
} from "drizzle-orm/pg-core";

export const participants = pgTable("participants", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name").notNull(),
  lastName: varchar("last_name").notNull(),
  email: varchar("last_name").unique().notNull(),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  option1: text("option1").unique(),
  option2: text("option2").unique(),
  option3: text("option3").unique(),
  option4: text("option4").unique(),
  answer: varchar("answer").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updateddAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});
