import { Link } from "wouter";
import { formatDistanceToNow } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type Article } from "@/lib/types";
import { ArrowUpRight, User } from "lucide-react";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  // Default author data if it's missing
  const hasAuthor = article.author !== undefined;
  
  return (
    <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-md h-full flex flex-col">
      <Link href={`/blog/${article.slug}`} className="block">
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={article.featuredImageUrl}
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </Link>
      <CardContent className="p-6 flex-grow flex flex-col">
        <div className="flex flex-wrap gap-2 mb-3">
          {article.categories && article.categories.length > 0 ? (
            article.categories.map((category) => (
              <Link key={category.id} href={`/blog?category=${category.slug}`}>
                <Badge variant="outline" className="text-xs font-medium text-primary">
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
          <h3 className="text-xl font-semibold text-neutral-900 group-hover:text-primary transition-colors duration-200 mb-3 flex items-start">
            {article.title}
            <ArrowUpRight className="h-4 w-4 ml-1 transition-transform duration-200 opacity-0 group-hover:opacity-100" />
          </h3>
        </Link>
        <p className="mt-1 text-base text-neutral-600 flex-grow">
          {article.excerpt}
        </p>
        <div className="mt-4 flex items-center">
          <div className="flex-shrink-0">
            {hasAuthor && article.author.avatarUrl ? (
              <img
                className="h-8 w-8 rounded-full"
                src={article.author.avatarUrl}
                alt={article.author.fullName || "Author"}
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-neutral-200 flex items-center justify-center">
                <User className="h-5 w-5 text-neutral-500" />
              </div>
            )}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-neutral-900">
              {hasAuthor && article.author.fullName ? article.author.fullName : "Unknown Author"}
            </p>
            <div className="flex space-x-1 text-sm text-neutral-500">
              <time dateTime={new Date(article.publishedAt).toISOString()}>
                {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}
              </time>
              <span aria-hidden="true">&middot;</span>
              <span>{article.readingTime} min read</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
