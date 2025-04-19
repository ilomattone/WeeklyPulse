import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Newsletter } from "@/components/layout/newsletter";
import { ArticleCard } from "@/components/blog/article-card";
import { ArticleCategoryFilter } from "@/components/blog/article-category-filter";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { type ArticlesResponse } from "@/lib/types";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Blog() {
  const [location] = useLocation();
  const [searchParams, setSearchParams] = useState(new URLSearchParams());
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Parse URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSearchParams(params);
    
    const currentPage = parseInt(params.get("page") || "1");
    setPage(currentPage);
    
    const search = params.get("search") || "";
    setSearchTerm(search);
    setDebouncedSearchTerm(search);
  }, [location]);

  // Debounce search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const categorySlug = searchParams.get("category") || undefined;
  
  const { data, isLoading, isPreviousData } = useQuery<ArticlesResponse>({
    queryKey: [
      `/api/articles?page=${page}&limit=9${categorySlug ? `&category=${categorySlug}` : ""}${debouncedSearchTerm ? `&search=${debouncedSearchTerm}` : ""}`
    ],
    keepPreviousData: true,
  });

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    
    // Update URL without navigation
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    params.set("page", "1");
    
    const newUrl = `${location.split("?")[0]}?${params.toString()}`;
    window.history.pushState({}, "", newUrl);
    
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    // Update URL without navigation
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    
    const newUrl = `${location.split("?")[0]}?${params.toString()}`;
    window.history.pushState({}, "", newUrl);
    
    setPage(newPage);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onSearch={handleSearch} />
      <main className="flex-grow">
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl font-extrabold text-neutral-900 sm:text-4xl">
                Our Blog
              </h1>
              <p className="mt-3 max-w-2xl mx-auto text-xl text-neutral-600 sm:mt-4">
                The latest insights, tutorials, and trends in technology
              </p>
            </div>

            <ArticleCategoryFilter currentCategory={categorySlug} />

            {/* Articles Grid */}
            <div className="mt-12">
              {isLoading ? (
                <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
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
              ) : data?.articles && data.articles.length > 0 ? (
                <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2">
                  {data.articles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">No articles found</h3>
                  <p className="text-neutral-600">
                    {searchTerm 
                      ? `No articles matching "${searchTerm}"` 
                      : categorySlug 
                        ? "No articles in this category yet" 
                        : "No articles available at the moment"}
                  </p>
                  {(searchTerm || categorySlug) && (
                    <Button 
                      className="mt-4"
                      onClick={() => {
                        window.history.pushState({}, "", "/blog");
                        setSearchTerm("");
                        setDebouncedSearchTerm("");
                      }}
                    >
                      Clear filters
                    </Button>
                  )}
                </div>
              )}
            </div>

            {/* Pagination */}
            {data?.pagination && data.pagination.totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <nav className="inline-flex rounded-md shadow">
                  <Button
                    variant="outline"
                    className="px-4 py-2 text-sm font-medium text-neutral-500 bg-white border border-neutral-300 rounded-l-md"
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1 || isPreviousData}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                  
                  {Array.from({ length: data.pagination.totalPages }, (_, i) => i + 1)
                    .filter(p => {
                      // Show first page, last page, current page, and pages around current
                      return p === 1 || 
                             p === data.pagination.totalPages || 
                             (p >= page - 1 && p <= page + 1);
                    })
                    .map((p, i, arr) => {
                      // Add ellipsis if needed
                      const prevPage = arr[i - 1];
                      const showEllipsis = prevPage && p - prevPage > 1;
                      
                      return (
                        <div key={p}>
                          {showEllipsis && (
                            <Button
                              variant="outline"
                              className="px-4 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300"
                              disabled
                            >
                              ...
                            </Button>
                          )}
                          <Button
                            variant={p === page ? "default" : "outline"}
                            className={`px-4 py-2 text-sm font-medium ${
                              p === page 
                                ? "text-white bg-primary border border-primary" 
                                : "text-neutral-700 bg-white border border-neutral-300 hover:bg-neutral-50"
                            }`}
                            onClick={() => handlePageChange(p)}
                            disabled={isPreviousData}
                          >
                            {p}
                          </Button>
                        </div>
                      );
                    })}
                  
                  <Button
                    variant="outline"
                    className="px-4 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-r-md"
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === data.pagination.totalPages || isPreviousData}
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </nav>
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
