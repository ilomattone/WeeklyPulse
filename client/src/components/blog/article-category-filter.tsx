import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { type Category } from "@shared/schema";

interface ArticleCategoryFilterProps {
  currentCategory?: string;
}

export function ArticleCategoryFilter({ currentCategory }: ArticleCategoryFilterProps) {
  const [location] = useLocation();
  const [isMounted, setIsMounted] = useState(false);

  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (isLoading || !isMounted) {
    return (
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        <Button className="px-4 py-2 rounded-full">All</Button>
        {[1, 2, 3, 4].map((i) => (
          <Button 
            key={i} 
            variant="outline" 
            className="px-4 py-2 rounded-full text-neutral-700 animate-pulse"
          >
            Loading...
          </Button>
        ))}
      </div>
    );
  }

  const isBasePath = location === "/blog" && !currentCategory;

  return (
    <div className="mt-8 flex flex-wrap justify-center gap-2">
      <Link href="/blog">
        <Button 
          variant={isBasePath ? "default" : "outline"}
          className="px-4 py-2 rounded-full text-sm font-medium"
        >
          All
        </Button>
      </Link>
      {categories?.map((category) => (
        <Link key={category.id} href={`/blog?category=${category.slug}`}>
          <Button
            variant={currentCategory === category.slug ? "default" : "outline"}
            className="px-4 py-2 rounded-full text-sm font-medium"
          >
            {category.name}
          </Button>
        </Link>
      ))}
    </div>
  );
}
