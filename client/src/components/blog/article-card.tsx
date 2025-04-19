import { Link } from "wouter";
import { formatDistanceToNow } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type Article } from "@/lib/types";
import { ArrowUpRight, Calendar, Clock, User } from "lucide-react";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  // Default author data if it's missing
  const hasAuthor = article.author !== undefined;
  
  return (
    <Card className="overflow-hidden card-hover h-full flex flex-col animate-fade-in">
      <Link href={`/blog/${article.slug}`} className="block">
        <div className="relative h-52 w-full overflow-hidden group">
          <img
            src={article.featuredImageUrl}
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </Link>
      <CardContent className="p-6 flex-grow flex flex-col">
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
          <h3 className="text-xl font-bold text-neutral-900 group-hover:text-primary transition-colors duration-200 mb-3">
            {article.title}
          </h3>
        </Link>
        
        <p className="text-sm text-neutral-600 line-clamp-3 flex-grow">
          {article.excerpt}
        </p>
        
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-neutral-100">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              {hasAuthor && article.author.avatarUrl ? (
                <img
                  className="h-9 w-9 rounded-full border border-neutral-100 shadow-sm"
                  src={article.author.avatarUrl}
                  alt={article.author.fullName || "Author"}
                />
              ) : (
                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center border border-neutral-100 shadow-sm">
                  <User className="h-5 w-5 text-primary" />
                </div>
              )}
            </div>
            <div className="ml-2 overflow-hidden">
              <p className="text-xs font-medium text-neutral-900 truncate">
                {hasAuthor && article.author.fullName ? article.author.fullName : "Unknown Author"}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 text-xs text-neutral-500">
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              <time dateTime={new Date(article.publishedAt).toISOString()} className="whitespace-nowrap">
                {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}
              </time>
            </div>
            <div className="flex items-center whitespace-nowrap">
              <Clock className="h-3 w-3 mr-1" />
              <span>{article.readingTime} min</span>
            </div>
          </div>
        </div>
        
        <Link href={`/blog/${article.slug}`} className="mt-4 inline-flex items-center text-sm text-primary font-medium group">
          Read article
          <ArrowUpRight className="h-3.5 w-3.5 ml-1 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </CardContent>
    </Card>
  );
}
