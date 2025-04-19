import express, { type Express, type Request, type Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes
  const apiRouter = express.Router();
  
  // Get all categories
  apiRouter.get("/categories", async (_req: Request, res: Response) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });
  
  // Get featured articles
  apiRouter.get("/articles/featured", async (_req: Request, res: Response) => {
    try {
      const featuredArticles = await storage.getFeaturedArticles();
      res.json(featuredArticles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured articles" });
    }
  });
  
  // Get articles with pagination and filtering
  apiRouter.get("/articles", async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 9;
      const offset = (page - 1) * limit;
      const categorySlug = req.query.category as string | undefined;
      const searchTerm = req.query.search as string | undefined;
      
      const articles = await storage.getArticles(limit, offset, categorySlug, searchTerm);
      const totalCount = await storage.getArticleCount(categorySlug, searchTerm);
      const totalPages = Math.ceil(totalCount / limit);
      
      res.json({
        articles,
        pagination: {
          total: totalCount,
          page,
          totalPages,
          limit
        }
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch articles" });
    }
  });
  
  // Get article by slug
  apiRouter.get("/articles/:slug", async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      const article = await storage.getArticleBySlug(slug);
      
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }
      
      res.json(article);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch article" });
    }
  });
  
  // Get related articles
  apiRouter.get("/articles/:slug/related", async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      const limit = parseInt(req.query.limit as string) || 3;
      
      const article = await storage.getArticleBySlug(slug);
      
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }
      
      const relatedArticles = await storage.getRelatedArticles(article.id, limit);
      res.json(relatedArticles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch related articles" });
    }
  });
  
  // Subscribe to newsletter
  const emailSchema = z.object({
    email: z.string().email("Please enter a valid email address")
  });
  
  apiRouter.post("/newsletter/subscribe", async (req: Request, res: Response) => {
    try {
      const validation = emailSchema.safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ 
          message: "Invalid email address",
          errors: validation.error.format() 
        });
      }
      
      // In a real app, you would store the email in a database
      // For this example, we'll just return success
      
      res.json({ 
        success: true, 
        message: "Thank you for subscribing to our newsletter!"
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to process subscription" });
    }
  });

  // Register API routes
  app.use('/api', apiRouter);

  const httpServer = createServer(app);
  return httpServer;
}
