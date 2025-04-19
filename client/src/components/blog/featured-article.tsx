import { Link } from "wouter";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { type Article } from "@/lib/types";
import { ArrowUpRight, Calendar, Clock, User } from "lucide-react";

interface FeaturedArticleProps {
  article: Article;
}

export function FeaturedArticle({ article }: FeaturedArticleProps) {
  // Default author data if it's missing
  const hasAuthor = article.author !== undefined;
  
  return (
    <div className="animate-fade-in rounded-xl overflow-hidden bg-card shadow-lg lg:grid lg:grid-cols-12 lg:gap-0">
      <div className="lg:col-span-7 relative overflow-hidden group">
        <Link href={`/blog/${article.slug}`} className="block">
          <img 
            className="w-full lg:h-full h-72 object-cover transition-transform duration-700 group-hover:scale-105"
            src={article.featuredImageUrl}
            alt={article.title}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </Link>
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <Badge className="bg-primary hover:bg-primary/90 text-white transition-colors">Featured</Badge>
        </div>
      </div>
      <div className="p-6 lg:p-8 flex flex-col justify-between lg:col-span-5">
        <div>
          <div className="flex flex-wrap gap-2 mb-4">
            {article.categories && article.categories.length > 0 ? (
              article.categories.map((category) => (
                <Link key={category.id} href={`/blog?category=${category.slug}`}>
                  <Badge variant="outline" className="border-primary/20 text-xs font-medium text-primary">
                    {category.name}
                  </Badge>
                </Link>
              ))
            ) : (
              <Badge variant="outline" className="text-xs font-medium text-neutral-500">
                Uncategorized
              </Badge>
            )}
          </div>
          <Link href={`/blog/${article.slug}`} className="group">
            <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 group-hover:text-primary transition-colors duration-200">
              {article.title}
            </h3>
            <p className="mt-4 text-base text-neutral-600 line-clamp-3">
              {article.excerpt}
            </p>
            <div className="mt-5 inline-flex items-center text-primary font-medium">
              Read more 
              <ArrowUpRight className="h-4 w-4 ml-1 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
          </Link>
        </div>
        
        <div className="mt-6 pt-6 border-t border-neutral-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              {hasAuthor && article.author.avatarUrl ? (
                <img 
                  className="h-12 w-12 rounded-full border-2 border-white shadow-sm"
                  src={article.author.avatarUrl}
                  alt={article.author.fullName || "Author"}
                />
              ) : (
                <div className="h-12 w-12 rounded-full bg-primary/10 border-2 border-white shadow-sm flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
              )}
            </div>
            <div className="ml-3">
              <p className="text-sm font-semibold text-neutral-900">
                {hasAuthor && article.author.fullName ? article.author.fullName : "Unknown Author"}
              </p>
              <div className="flex items-center space-x-3 text-xs text-neutral-500">
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  <time dateTime={new Date(article.publishedAt).toISOString()}>
                    {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}
                  </time>
                </div>
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{article.readingTime} min read</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
