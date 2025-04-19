import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Newsletter } from "@/components/layout/newsletter";
import { FeaturedArticle } from "@/components/blog/featured-article";
import { ArticleCard } from "@/components/blog/article-card";
import { ArticleCategoryFilter } from "@/components/blog/article-category-filter";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight } from "lucide-react";
import { type Article } from "@/lib/types";

export default function Home() {
  const { data: featuredArticles, isLoading: isFeaturedLoading } = useQuery<Article[]>({
    queryKey: ["/api/articles/featured"],
  });

  const { data: recentArticlesResponse, isLoading: isRecentLoading } = useQuery<{
    articles: Article[];
  }>({
    queryKey: ["/api/articles?limit=3"],
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
              <svg
                className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
                fill="currentColor"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <polygon points="50,0 100,0 50,100 0,100" />
              </svg>

              <div className="relative pt-6 px-4 sm:px-6 lg:px-8"></div>

              <div className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                <div className="sm:text-center lg:text-left">
                  <h1 className="text-4xl tracking-tight font-extrabold text-neutral-900 sm:text-5xl md:text-6xl">
                    <span className="block">Your source for</span>
                    <span className="block text-primary">tech insights & tutorials</span>
                  </h1>
                  <p className="mt-3 text-base text-neutral-600 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-auto lg:text-left">
                    Get the latest insights, tutorials, and trends in technology, development, and digital innovation.
                  </p>
                  <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                    <div className="rounded-md shadow">
                      <Link href="/blog">
                        <Button className="w-full flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-white bg-primary md:py-4 md:text-lg md:px-10">
                          Explore Articles
                        </Button>
                      </Link>
                    </div>
                    <div className="mt-3 sm:mt-0 sm:ml-3">
                      <Button
                        variant="outline"
                        className="w-full flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-primary bg-white border-primary hover:bg-neutral-50 md:py-4 md:text-lg md:px-10"
                      >
                        Subscribe
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
            <img
              className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              alt="Modern workspace with computer"
            />
          </div>
        </section>

        {/* Blog Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-neutral-900 sm:text-4xl">
                Latest from our blog
              </h2>
              <p className="mt-3 max-w-2xl mx-auto text-xl text-neutral-600 sm:mt-4">
                Tips, tutorials, and insights to help you master technology
              </p>
            </div>

            <ArticleCategoryFilter />

            {/* Featured Article */}
            <div className="mt-10">
              {isFeaturedLoading ? (
                <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
                  <Skeleton className="h-64 w-full rounded-lg" />
                  <div>
                    <Skeleton className="h-8 w-24 mb-4" />
                    <Skeleton className="h-10 w-full mb-4" />
                    <Skeleton className="h-24 w-full mb-4" />
                    <div className="flex items-center">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="ml-3">
                        <Skeleton className="h-4 w-24 mb-2" />
                        <Skeleton className="h-3 w-32" />
                      </div>
                    </div>
                  </div>
                </div>
              ) : featuredArticles && featuredArticles.length > 0 ? (
                <FeaturedArticle article={featuredArticles[0]} />
              ) : (
                <div className="text-center py-12">
                  No featured articles found
                </div>
              )}
            </div>

            {/* Recent Articles */}
            <div className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-neutral-900">Recent Articles</h3>
                <Link href="/blog">
                  <Button variant="link" className="flex items-center text-primary">
                    View all articles <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              
              {isRecentLoading ? (
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
              ) : recentArticlesResponse?.articles && recentArticlesResponse.articles.length > 0 ? (
                <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2">
                  {recentArticlesResponse.articles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  No recent articles found
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
