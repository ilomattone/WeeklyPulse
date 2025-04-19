import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useRoute, useLocation } from "wouter";
import { formatDistanceToNow, format } from "date-fns";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Newsletter } from "@/components/layout/newsletter";
import { ArticleCard } from "@/components/blog/article-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { type Article } from "@/lib/types";
import { ChevronLeft, Clock, Share2, Linkedin, Twitter, Facebook, Link as LinkIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ArticlePage() {
  const [, setLocation] = useLocation();
  const [match, params] = useRoute("/blog/:slug");
  const { toast } = useToast();
  const slug = params?.slug;

  // Redirect if no slug parameter
  useEffect(() => {
    if (!match) {
      setLocation("/404");
    }
  }, [match, setLocation]);

  const { data: article, isLoading: isArticleLoading } = useQuery<Article>({
    queryKey: [`/api/articles/${slug}`],
    enabled: !!slug,
  });

  const { data: relatedArticles, isLoading: isRelatedLoading } = useQuery<Article[]>({
    queryKey: [`/api/articles/${slug}/related`],
    enabled: !!slug,
  });

  if (!match) return null;

  const handleShare = async (platform?: string) => {
    const url = window.location.href;
    const title = article?.title || "Article";

    if (platform === "twitter") {
      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`);
    } else if (platform === "facebook") {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
    } else if (platform === "linkedin") {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
    } else {
      try {
        await navigator.clipboard.writeText(url);
        toast({
          title: "Link copied",
          description: "Article link copied to clipboard",
        });
      } catch (err) {
        toast({
          title: "Copy failed",
          description: "Could not copy the link to clipboard",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <article className="py-8 md:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back button */}
            <div className="mb-8">
              <Button 
                variant="ghost" 
                className="text-neutral-600 hover:text-neutral-900"
                onClick={() => window.history.back()}
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> Back
              </Button>
            </div>

            {isArticleLoading ? (
              <div>
                <Skeleton className="h-10 w-3/4 mb-4" />
                <div className="flex flex-wrap gap-2 mb-6">
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-6 w-24 rounded-full" />
                </div>
                <Skeleton className="h-64 w-full rounded-lg mb-8" />
                <div className="flex items-center mb-8">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="ml-3">
                    <Skeleton className="h-5 w-32 mb-1" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                </div>
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            ) : article ? (
              <>
                {/* Article header */}
                <header className="mb-8">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {article.categories.map((category) => (
                      <Link key={category.id} href={`/blog?category=${category.slug}`}>
                        <Badge variant="outline" className="text-xs font-medium text-primary">
                          {category.name}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                  <h1 className="text-3xl md:text-4xl font-extrabold text-neutral-900 mb-4">
                    {article.title}
                  </h1>
                  <div className="flex items-center text-neutral-600 text-sm gap-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" /> {article.readingTime} min read
                    </div>
                    <time dateTime={new Date(article.publishedAt).toISOString()}>
                      {format(new Date(article.publishedAt), "MMMM d, yyyy")}
                    </time>
                  </div>
                </header>

                {/* Featured image */}
                <div className="mb-8">
                  <img
                    src={article.featuredImageUrl}
                    alt={article.title}
                    className="w-full h-auto rounded-lg"
                  />
                </div>

                {/* Author info */}
                <div className="flex items-center mb-8 p-4 border border-neutral-200 rounded-lg bg-neutral-50">
                  <img
                    src={article.author.avatarUrl}
                    alt={article.author.fullName}
                    className="h-12 w-12 rounded-full"
                  />
                  <div className="ml-4">
                    <p className="text-base font-medium text-neutral-900">{article.author.fullName}</p>
                    <p className="text-sm text-neutral-600">{article.author.bio}</p>
                  </div>
                </div>

                {/* Article content */}
                <div 
                  className="prose max-w-none prose-lg prose-primary mb-12"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />

                {/* Share buttons */}
                <div className="border-t border-neutral-200 pt-6 mb-12">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <h3 className="text-neutral-900 font-semibold flex items-center">
                      <Share2 className="w-5 h-5 mr-2" /> Share this article
                    </h3>
                    <div className="flex space-x-3">
                      <Button variant="outline" size="icon" className="rounded-full" onClick={() => handleShare("twitter")}>
                        <Twitter className="h-5 w-5" />
                        <span className="sr-only">Share on Twitter</span>
                      </Button>
                      <Button variant="outline" size="icon" className="rounded-full" onClick={() => handleShare("facebook")}>
                        <Facebook className="h-5 w-5" />
                        <span className="sr-only">Share on Facebook</span>
                      </Button>
                      <Button variant="outline" size="icon" className="rounded-full" onClick={() => handleShare("linkedin")}>
                        <Linkedin className="h-5 w-5" />
                        <span className="sr-only">Share on LinkedIn</span>
                      </Button>
                      <Button variant="outline" size="icon" className="rounded-full" onClick={() => handleShare()}>
                        <LinkIcon className="h-5 w-5" />
                        <span className="sr-only">Copy link</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">Article not found</h3>
                <p className="text-neutral-600 mb-6">
                  The article you're looking for doesn't exist or has been removed.
                </p>
                <Button asChild>
                  <Link href="/blog">Browse all articles</Link>
                </Button>
              </div>
            )}
          </div>
        </article>

        {/* Related articles */}
        {article && (
          <section className="py-12 bg-neutral-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-8">Related Articles</h2>
              
              {isRelatedLoading ? (
                <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex flex-col">
                      <Skeleton className="h-48 w-full mb-4 rounded-lg" />
                      <Skeleton className="h-6 w-24 mb-2" />
                      <Skeleton className="h-8 w-full mb-2" />
                      <Skeleton className="h-24 w-full mb-3" />
                      <div className="flex items-center mt-auto">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <div className="ml-3">
                          <Skeleton className="h-4 w-24 mb-1" />
                          <Skeleton className="h-3 w-32" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : relatedArticles && relatedArticles.length > 0 ? (
                <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2">
                  {relatedArticles.map((relatedArticle) => (
                    <ArticleCard key={relatedArticle.id} article={relatedArticle} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-white rounded-lg shadow-sm">
                  <p className="text-neutral-600">No related articles found</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Newsletter */}
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
