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
import { ArrowRight, ChevronRight, BookOpen, Lightbulb, TrendingUp } from "lucide-react";
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
    <div className="flex flex-col min-h-screen bg-neutral-50">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-white to-neutral-50">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center opacity-5"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="py-16 md:py-24 lg:py-32">
              <div className="text-center lg:text-left max-w-3xl mx-auto lg:mx-0">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
                  <BookOpen className="mr-1 h-4 w-4" /> MacPaw Blog
                </span>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 tracking-tight">
                  <span className="block">Ideas, insights, and</span>
                  <span className="block text-transparent bg-clip-text bg-primary-gradient">innovation for all</span>
                </h1>
                <p className="mt-6 text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto lg:mx-0">
                  Get the latest insights, tutorials, and trends in technology, development, and digital innovation from the MacPaw team.
                </p>
                
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link href="/blog">
                    <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-medium shadow-md hover:shadow-lg transition-all group">
                      Browse Articles
                      <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto text-primary bg-white border-primary/20 hover:bg-primary/5 font-medium"
                  >
                    Subscribe to Newsletter
                  </Button>
                </div>
                
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto lg:mx-0">
                  {[
                    { 
                      icon: <Lightbulb className="h-5 w-5 text-primary" />, 
                      title: "Expert Insights", 
                      description: "In-depth analysis from industry professionals" 
                    },
                    { 
                      icon: <BookOpen className="h-5 w-5 text-primary" />, 
                      title: "Comprehensive Guides", 
                      description: "Step-by-step tutorials and resources" 
                    },
                    { 
                      icon: <TrendingUp className="h-5 w-5 text-primary" />, 
                      title: "Latest Trends", 
                      description: "Stay ahead with cutting-edge tech news" 
                    },
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-start p-4 rounded-xl bg-white shadow-sm border border-neutral-100">
                      <div className="rounded-lg p-2 bg-primary/10">
                        {feature.icon}
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-neutral-900">{feature.title}</h3>
                        <p className="mt-1 text-xs text-neutral-500">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Article Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
                  Featured Article
                </h2>
                <p className="mt-2 text-lg text-neutral-600">
                  Our editor's top pick this week
                </p>
              </div>
              <ArticleCategoryFilter currentCategory="" />
            </div>

            {/* Featured Article */}
            <div>
              {isFeaturedLoading ? (
                <div className="lg:grid lg:grid-cols-12 lg:gap-8 rounded-xl overflow-hidden shadow-xl">
                  <Skeleton className="h-80 lg:col-span-7 w-full" />
                  <div className="p-8 lg:col-span-5">
                    <Skeleton className="h-8 w-32 mb-4" />
                    <Skeleton className="h-12 w-full mb-4" />
                    <Skeleton className="h-24 w-full mb-6" />
                    <Skeleton className="h-10 w-32 mb-8" />
                    <div className="flex items-center">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="ml-3">
                        <Skeleton className="h-4 w-32 mb-2" />
                        <Skeleton className="h-3 w-48" />
                      </div>
                    </div>
                  </div>
                </div>
              ) : featuredArticles && featuredArticles.length > 0 ? (
                <FeaturedArticle article={featuredArticles[0]} />
              ) : (
                <div className="text-center py-16 bg-neutral-50 rounded-xl">
                  <BookOpen className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-neutral-400">No featured articles found</h3>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Recent Articles */}
        <section className="py-16 md:py-24 bg-neutral-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">Recent Articles</h2>
                <p className="mt-2 text-lg text-neutral-600">
                  The latest insights from our team
                </p>
              </div>
              <Link href="/blog">
                <Button variant="outline" className="flex items-center group border-primary/20 text-primary hover:bg-primary/5">
                  View all articles 
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
            
            {isRecentLoading ? (
              <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-xl shadow-sm p-4">
                    <Skeleton className="h-52 w-full mb-6 rounded-lg" />
                    <Skeleton className="h-5 w-32 mb-3" />
                    <Skeleton className="h-8 w-full mb-3" />
                    <Skeleton className="h-20 w-full mb-6" />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Skeleton className="h-9 w-9 rounded-full" />
                        <Skeleton className="h-5 w-24 ml-2" />
                      </div>
                      <Skeleton className="h-5 w-28" />
                    </div>
                  </div>
                ))}
              </div>
            ) : recentArticlesResponse?.articles && recentArticlesResponse.articles.length > 0 ? (
              <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2">
                {recentArticlesResponse.articles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl shadow-sm">
                <BookOpen className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-neutral-400">No recent articles found</h3>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter */}
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
