import { Link } from "wouter";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { type Article } from "@/lib/types";
import { ArrowUpRight, User } from "lucide-react";

interface FeaturedArticleProps {
  article: Article;
}

export function FeaturedArticle({ article }: FeaturedArticleProps) {
  // Default author data if it's missing
  const hasAuthor = article.author !== undefined;
  
  return (
    <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
      <div className="lg:col-span-1">
        <Link href={`/blog/${article.slug}`} className="block">
          <img 
            className="w-full h-64 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            src={article.featuredImageUrl}
            alt={article.title}
          />
        </Link>
      </div>
      <div className="mt-4 lg:mt-0 lg:col-span-1">
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
        <Link href={`/blog/${article.slug}`} className="group block mt-2">
          <h3 className="text-2xl font-semibold text-neutral-900 group-hover:text-primary transition-colors duration-200 flex items-center">
            {article.title}
            <ArrowUpRight className="h-5 w-5 ml-1 transition-transform duration-200 opacity-0 group-hover:opacity-100" />
          </h3>
          <p className="mt-3 text-base text-neutral-600">
            {article.excerpt}
          </p>
        </Link>
        <div className="mt-4 flex items-center">
          <div className="flex-shrink-0">
            {hasAuthor && article.author.avatarUrl ? (
              <img 
                className="h-10 w-10 rounded-full"
                src={article.author.avatarUrl}
                alt={article.author.fullName || "Author"}
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-neutral-200 flex items-center justify-center">
                <User className="h-6 w-6 text-neutral-500" />
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
      </div>
    </div>
  );
}
