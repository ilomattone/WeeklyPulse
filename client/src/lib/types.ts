import { type Article as DbArticle, type User as DbUser, type Category as DbCategory } from "@shared/schema";

export interface Article extends DbArticle {
  author: DbUser;
  categories: DbCategory[];
}

export interface PaginationData {
  total: number;
  page: number;
  totalPages: number;
  limit: number;
}

export interface ArticlesResponse {
  articles: Article[];
  pagination: PaginationData;
}
