import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-white border-t border-neutral-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <span className="text-xl font-bold text-primary">TechBlog</span>
            </div>
            <p className="text-neutral-600 text-base">
              The latest insights, tutorials, and trends in technology, development, design, and digital innovation.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-neutral-500 hover:text-neutral-900">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-neutral-500 hover:text-neutral-900">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-neutral-500 hover:text-neutral-900">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-neutral-500 tracking-wider uppercase">
                  Content
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  <li>
                    <Link href="/blog?category=tutorials" className="text-base text-neutral-600 hover:text-neutral-900">
                      Tutorials
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog?category=productivity" className="text-base text-neutral-600 hover:text-neutral-900">
                      Productivity
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog?category=automation" className="text-base text-neutral-600 hover:text-neutral-900">
                      Automation
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog?category=case-studies" className="text-base text-neutral-600 hover:text-neutral-900">
                      Case Studies
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-neutral-500 tracking-wider uppercase">
                  Support
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  <li>
                    <a href="#" className="text-base text-neutral-600 hover:text-neutral-900">
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-neutral-600 hover:text-neutral-900">
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-neutral-600 hover:text-neutral-900">
                      Guides
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-neutral-600 hover:text-neutral-900">
                      API Status
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-neutral-500 tracking-wider uppercase">
                  Company
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  <li>
                    <Link href="/about" className="text-base text-neutral-600 hover:text-neutral-900">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="text-base text-neutral-600 hover:text-neutral-900">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <a href="#" className="text-base text-neutral-600 hover:text-neutral-900">
                      Jobs
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-neutral-600 hover:text-neutral-900">
                      Press
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-neutral-500 tracking-wider uppercase">
                  Legal
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  <li>
                    <a href="#" className="text-base text-neutral-600 hover:text-neutral-900">
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-neutral-600 hover:text-neutral-900">
                      Terms
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-neutral-600 hover:text-neutral-900">
                      Cookie Policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-neutral-200 pt-8">
          <p className="text-base text-neutral-500 xl:text-center">
            &copy; {new Date().getFullYear()} TechBlog, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
