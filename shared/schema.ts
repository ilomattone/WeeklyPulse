import { pgTable, text, serial, integer, timestamp, primaryKey } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  bio: text("bio"),
  avatarUrl: text("avatar_url"),
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
});

export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  featuredImageUrl: text("featured_image_url").notNull(),
  readingTime: integer("reading_time").notNull(),
  authorId: integer("author_id").notNull().references(() => users.id),
  publishedAt: timestamp("published_at").notNull(),
  isFeatured: integer("is_featured").notNull().default(0),
});

export const articleCategories = pgTable("article_categories", {
  articleId: integer("article_id").notNull().references(() => articles.id),
  categoryId: integer("category_id").notNull().references(() => categories.id),
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.articleId, table.categoryId] }),
  };
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({ id: true });
export const insertCategorySchema = createInsertSchema(categories).omit({ id: true });
export const insertArticleSchema = createInsertSchema(articles).omit({ id: true });
export const insertArticleCategorySchema = createInsertSchema(articleCategories);

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Category = typeof categories.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;

export type Article = typeof articles.$inferSelect;
export type InsertArticle = z.infer<typeof insertArticleSchema>;

export type ArticleCategory = typeof articleCategories.$inferSelect;
export type InsertArticleCategory = z.infer<typeof insertArticleCategorySchema>;

// Extended article type with author and categories
export type ArticleWithDetails = Article & {
  author: User;
  categories: Category[];
};
