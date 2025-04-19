import { 
  users, 
  categories, 
  articles, 
  articleCategories,
  type User, 
  type InsertUser,
  type Category,
  type InsertCategory,
  type Article,
  type InsertArticle,
  type ArticleCategory,
  type InsertArticleCategory,
  type ArticleWithDetails
} from "@shared/schema";

import { IStorage } from "./storage";
import { db } from "./db";
import { eq, ne, like, desc, and, or, inArray, count, sql } from "drizzle-orm";

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getCategories(): Promise<Category[]> {
    return await db.select().from(categories).orderBy(categories.name);
  }

  async getCategory(id: number): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.id, id));
    return category || undefined;
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.slug, slug));
    return category || undefined;
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const [category] = await db
      .insert(categories)
      .values(insertCategory)
      .returning();
    return category;
  }

  async getArticles(
    limit: number = 10,
    offset: number = 0,
    categorySlug?: string,
    searchTerm?: string
  ): Promise<ArticleWithDetails[]> {
    let query = db.select().from(articles);
    
    // Filter by category if provided
    if (categorySlug) {
      const category = await this.getCategoryBySlug(categorySlug);
      if (category) {
        query = query
          .innerJoin(
            articleCategories, 
            eq(articles.id, articleCategories.articleId)
          )
          .where(eq(articleCategories.categoryId, category.id));
      }
    }
    
    // Filter by search term if provided
    if (searchTerm) {
      const search = `%${searchTerm.toLowerCase()}%`;
      query = query.where(
        or(
          like(articles.title, search),
          like(articles.excerpt, search),
          like(articles.content, search)
        )
      );
    }
    
    // Apply pagination and ordering
    const articlesData = await query
      .orderBy(desc(articles.publishedAt))
      .limit(limit)
      .offset(offset);
    
    // Fetch additional details for each article
    const articlesWithDetails = await Promise.all(
      articlesData.map(async (article) => {
        const author = await this.getUser(article.authorId);
        const categories = await this.getArticleCategories(article.id);
        
        // Create a default author if none found
        const defaultAuthor: User = {
          id: 0,
          username: "unknown",
          password: "",
          fullName: "Unknown Author",
          bio: "No information available",
          avatarUrl: ""
        };
        
        return {
          ...article,
          author: author || defaultAuthor,
          categories,
        };
      })
    );
    
    return articlesWithDetails;
  }

  async getFeaturedArticles(): Promise<ArticleWithDetails[]> {
    const featuredArticles = await db
      .select()
      .from(articles)
      .where(eq(articles.isFeatured, 1))
      .orderBy(desc(articles.publishedAt));
    
    const articlesWithDetails = await Promise.all(
      featuredArticles.map(async (article) => {
        const author = await this.getUser(article.authorId);
        const categories = await this.getArticleCategories(article.id);
        
        // Create a default author if none found
        const defaultAuthor: User = {
          id: 0,
          username: "unknown",
          password: "",
          fullName: "Unknown Author",
          bio: "No information available",
          avatarUrl: ""
        };
        
        return {
          ...article,
          author: author || defaultAuthor,
          categories,
        };
      })
    );
    
    return articlesWithDetails;
  }

  async getArticleCount(categorySlug?: string, searchTerm?: string): Promise<number> {
    let query = db.select({ count: count() }).from(articles);
    
    // Filter by category if provided
    if (categorySlug) {
      const category = await this.getCategoryBySlug(categorySlug);
      if (category) {
        query = query
          .innerJoin(
            articleCategories, 
            eq(articles.id, articleCategories.articleId)
          )
          .where(eq(articleCategories.categoryId, category.id));
      }
    }
    
    // Filter by search term if provided
    if (searchTerm) {
      const search = `%${searchTerm.toLowerCase()}%`;
      query = query.where(
        or(
          like(articles.title, search),
          like(articles.excerpt, search),
          like(articles.content, search)
        )
      );
    }
    
    const result = await query;
    return Number(result[0]?.count || 0);
  }

  async getArticle(id: number): Promise<ArticleWithDetails | undefined> {
    const [article] = await db
      .select()
      .from(articles)
      .where(eq(articles.id, id));
    
    if (!article) return undefined;
    
    const author = await this.getUser(article.authorId);
    const categories = await this.getArticleCategories(article.id);
    
    // Create a default author if none found
    const defaultAuthor: User = {
      id: 0,
      username: "unknown",
      password: "",
      fullName: "Unknown Author",
      bio: "No information available",
      avatarUrl: ""
    };
    
    return {
      ...article,
      author: author || defaultAuthor,
      categories,
    };
  }

  async getArticleBySlug(slug: string): Promise<ArticleWithDetails | undefined> {
    const [article] = await db
      .select()
      .from(articles)
      .where(eq(articles.slug, slug));
    
    if (!article) return undefined;
    
    const author = await this.getUser(article.authorId);
    const categories = await this.getArticleCategories(article.id);
    
    // Create a default author if none found
    const defaultAuthor: User = {
      id: 0,
      username: "unknown",
      password: "",
      fullName: "Unknown Author",
      bio: "No information available",
      avatarUrl: ""
    };
    
    return {
      ...article,
      author: author || defaultAuthor,
      categories,
    };
  }

  async createArticle(insertArticle: InsertArticle): Promise<Article> {
    const [article] = await db
      .insert(articles)
      .values(insertArticle)
      .returning();
    
    return article;
  }

  async getArticleCategories(articleId: number): Promise<Category[]> {
    const results = await db
      .select({
        category: categories
      })
      .from(articleCategories)
      .innerJoin(
        categories,
        eq(articleCategories.categoryId, categories.id)
      )
      .where(eq(articleCategories.articleId, articleId));
    
    return results.map(result => result.category);
  }

  async addArticleCategory(articleCategory: InsertArticleCategory): Promise<ArticleCategory> {
    const [result] = await db
      .insert(articleCategories)
      .values(articleCategory)
      .returning();
    
    return result;
  }

  async getRelatedArticles(articleId: number, limit: number): Promise<ArticleWithDetails[]> {
    // Get category IDs for the specified article
    const articleCats = await db
      .select()
      .from(articleCategories)
      .where(eq(articleCategories.articleId, articleId));
    
    const categoryIds = articleCats.map(ac => ac.categoryId);
    
    if (categoryIds.length === 0) {
      return [];
    }
    
    // Get related articles in those categories
    const relatedArticleIds = await db
      .select({
        articleId: articleCategories.articleId,
      })
      .from(articleCategories)
      .where(
        and(
          inArray(articleCategories.categoryId, categoryIds),
          ne(articleCategories.articleId, articleId)
        )
      )
      .groupBy(articleCategories.articleId)
      .limit(limit);
    
    if (relatedArticleIds.length === 0) {
      return [];
    }
    
    // Get the full article details
    const articlesData = await db
      .select()
      .from(articles)
      .where(
        inArray(
          articles.id,
          relatedArticleIds.map(ra => ra.articleId)
        )
      )
      .orderBy(desc(articles.publishedAt))
      .limit(limit);
    
    // Fetch additional details for each article
    const articlesWithDetails = await Promise.all(
      articlesData.map(async (article) => {
        const author = await this.getUser(article.authorId);
        const categories = await this.getArticleCategories(article.id);
        
        // Create a default author if none found
        const defaultAuthor: User = {
          id: 0,
          username: "unknown",
          password: "",
          fullName: "Unknown Author",
          bio: "No information available",
          avatarUrl: ""
        };
        
        return {
          ...article,
          author: author || defaultAuthor,
          categories,
        };
      })
    );
    
    return articlesWithDetails;
  }
}