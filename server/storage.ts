import { 
  users, 
  categories, 
  articles, 
  articleCategories,
  type User, 
  type InsertUser,
  type Category,
  type InsertCategory,
  type Article,
  type InsertArticle,
  type ArticleCategory,
  type InsertArticleCategory,
  type ArticleWithDetails
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Categories
  getCategories(): Promise<Category[]>;
  getCategory(id: number): Promise<Category | undefined>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Articles
  getArticles(
    limit?: number, 
    offset?: number, 
    categorySlug?: string,
    searchTerm?: string
  ): Promise<ArticleWithDetails[]>;
  getFeaturedArticles(): Promise<ArticleWithDetails[]>;
  getArticleCount(categorySlug?: string, searchTerm?: string): Promise<number>;
  getArticle(id: number): Promise<ArticleWithDetails | undefined>;
  getArticleBySlug(slug: string): Promise<ArticleWithDetails | undefined>;
  createArticle(article: InsertArticle): Promise<Article>;
  
  // Article Categories
  getArticleCategories(articleId: number): Promise<Category[]>;
  addArticleCategory(articleCategory: InsertArticleCategory): Promise<ArticleCategory>;
  
  // Related articles
  getRelatedArticles(articleId: number, limit: number): Promise<ArticleWithDetails[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private categories: Map<number, Category>;
  private articles: Map<number, Article>;
  private articleCategories: ArticleCategory[];
  
  private userId: number;
  private categoryId: number;
  private articleId: number;

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.articles = new Map();
    this.articleCategories = [];
    
    this.userId = 1;
    this.categoryId = 1;
    this.articleId = 1;
    
    this.initializeData();
  }

  private initializeData() {
    // Create sample users
    const author1 = this.createUser({
      username: "sarah.johnson",
      password: "password123",
      fullName: "Sarah Johnson",
      bio: "Senior Writer and Editor with extensive experience in tech journalism.",
      avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    });
    
    const author2 = this.createUser({
      username: "michael.torres",
      password: "password123",
      fullName: "Michael Torres",
      bio: "Tech enthusiast and product reviewer with a passion for clear communication.",
      avatarUrl: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    });
    
    const author3 = this.createUser({
      username: "jessica.chen",
      password: "password123",
      fullName: "Jessica Chen",
      bio: "UX researcher and writer focusing on user experience and product design.",
      avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    });
    
    const author4 = this.createUser({
      username: "robert.parker",
      password: "password123",
      fullName: "Robert Parker",
      bio: "Developer advocate and technical writer who simplifies complex topics.",
      avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    });
    
    // Create categories
    const tutorialCategory = this.createCategory({
      name: "Tutorials",
      slug: "tutorials"
    });
    
    const productivityCategory = this.createCategory({
      name: "Productivity",
      slug: "productivity"
    });
    
    const automationCategory = this.createCategory({
      name: "Automation",
      slug: "automation"
    });
    
    const caseStudyCategory = this.createCategory({
      name: "Case Studies",
      slug: "case-studies"
    });
    
    // Create articles
    const article1 = this.createArticle({
      title: "How to Save 5+ Hours a Week with Automated Progress Reports",
      slug: "how-to-save-5-hours-a-week-with-automated-progress-reports",
      excerpt: "Discover how top project managers are automating their weekly reports to save time and improve communication with stakeholders. We break down the step-by-step process to set up your own automated reporting workflow.",
      content: `
        <h2>Introduction</h2>
        <p>Time is the most valuable resource for any busy professional, and creating weekly progress reports can consume a significant chunk of it. In this article, we'll explore how automation can free up hours in your schedule while maintaining high-quality reporting.</p>
        
        <h2>The Cost of Manual Reporting</h2>
        <p>On average, project managers spend 5-7 hours per week creating and distributing progress reports. This includes time for data collection, formatting, visualization, and communication. For a team with multiple projects, this quickly adds up to a substantial time investment.</p>
        
        <h2>Automating Your Workflow</h2>
        <p>By implementing an automated reporting system, you can reduce this time investment by up to 80%. Here's how to set it up:</p>
        
        <ol>
          <li><strong>Connect your data sources</strong>: Integrate with tools like Jira, Asana, or Trello to automatically pull in task status, time tracking, and milestone progress.</li>
          <li><strong>Create report templates</strong>: Design standardized templates that reflect your brand and reporting needs.</li>
          <li><strong>Set up automatic data aggregation</strong>: Configure rules to transform raw data into meaningful insights.</li>
          <li><strong>Implement scheduled delivery</strong>: Set your reports to generate and deliver automatically on your preferred schedule.</li>
        </ol>
        
        <h2>Benefits Beyond Time Savings</h2>
        <p>Automation doesn't just save time—it improves report consistency, reduces human error, and ensures stakeholders receive timely updates. Teams using automated reporting systems report higher client satisfaction and improved internal visibility.</p>
        
        <h2>Getting Started</h2>
        <p>Ready to save those 5+ hours each week? Start by auditing your current reporting process, identifying integration points, and selecting a reporting automation tool that meets your specific needs.</p>
      `,
      featuredImageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80",
      readingTime: 8,
      authorId: author1.id,
      publishedAt: new Date("2023-05-15"),
      isFeatured: 1
    });
    
    this.addArticleCategory({ articleId: article1.id, categoryId: productivityCategory.id });
    this.addArticleCategory({ articleId: article1.id, categoryId: automationCategory.id });
    
    const article2 = this.createArticle({
      title: "Connecting ReportFlow to Your Project Management Tool",
      slug: "connecting-reportflow-to-your-project-management-tool",
      excerpt: "Step-by-step instructions to connect ReportFlow with Asana, Trello, Jira, and other popular tools.",
      content: `
        <h2>Introduction</h2>
        <p>Integrating your project management tools with ReportFlow is the first step toward automated reporting. This tutorial will guide you through the setup process for the most popular platforms.</p>
        
        <h2>Connecting with Asana</h2>
        <p>Asana's flexible structure makes it a popular choice for teams of all sizes. To connect Asana with ReportFlow:</p>
        <ol>
          <li>Navigate to the Integrations tab in your ReportFlow dashboard</li>
          <li>Select Asana from the available integrations</li>
          <li>Authorize ReportFlow to access your Asana data</li>
          <li>Select the projects you want to include in your reports</li>
          <li>Configure field mappings to customize how task data appears in reports</li>
        </ol>
        
        <h2>Connecting with Trello</h2>
        <p>Trello's kanban-style boards are excellent for visualizing workflow. Here's how to connect Trello:</p>
        <ol>
          <li>Access the Integrations section in ReportFlow</li>
          <li>Choose Trello and authorize the connection</li>
          <li>Select boards to include in reporting</li>
          <li>Map Trello lists to report statuses (e.g., "Doing" = "In Progress")</li>
          <li>Configure card data to extract for reporting</li>
        </ol>
        
        <h2>Connecting with Jira</h2>
        <p>For development teams using Jira, follow these steps:</p>
        <ol>
          <li>Go to Integrations in ReportFlow</li>
          <li>Select Jira and enter your Jira Cloud or Server URL</li>
          <li>Authenticate with your Jira admin credentials</li>
          <li>Select projects and issue types to include</li>
          <li>Configure JQL filters to further refine data collection</li>
        </ol>
        
        <h2>Advanced Configuration Tips</h2>
        <p>For any integration, consider these additional configurations:</p>
        <ul>
          <li>Set up data refresh intervals (hourly, daily, real-time)</li>
          <li>Configure custom fields to capture specific metrics</li>
          <li>Create data transformations to standardize reporting across tools</li>
        </ul>
        
        <h2>Troubleshooting Common Issues</h2>
        <p>If you encounter connection problems, check these common issues:</p>
        <ul>
          <li>Insufficient permissions in the project management tool</li>
          <li>API rate limiting (particularly with Jira)</li>
          <li>Outdated authentication tokens</li>
        </ul>
      `,
      featuredImageUrl: "https://images.unsplash.com/photo-1542744094-3a31f272c490?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      readingTime: 5,
      authorId: author2.id,
      publishedAt: new Date("2023-05-10"),
      isFeatured: 0
    });
    
    this.addArticleCategory({ articleId: article2.id, categoryId: tutorialCategory.id });
    
    const article3 = this.createArticle({
      title: "How Acme Corp Reduced Reporting Time by 80%",
      slug: "how-acme-corp-reduced-reporting-time-by-80-percent",
      excerpt: "Learn how a Fortune 500 company transformed their reporting process and improved team productivity.",
      content: `
        <h2>Executive Summary</h2>
        <p>Acme Corporation, a Fortune 500 technology company with over, struggled with inefficient reporting processes that consumed valuable team time and created bottlenecks in project delivery. By implementing automated reporting solutions, they achieved dramatic time savings and improved stakeholder satisfaction.</p>
        
        <h2>The Challenge</h2>
        <p>Before automation, Acme's project managers spent an average of 8 hours per week on reporting activities:</p>
        <ul>
          <li>2 hours collecting data from various systems</li>
          <li>3 hours creating visualizations and formatting reports</li>
          <li>1 hour cross-checking for accuracy</li>
          <li>2 hours distributing and explaining reports to stakeholders</li>
        </ul>
        <p>With 25 project managers, this represented over 10,000 hours per year spent on reporting—equivalent to 5 full-time employees.</p>
        
        <h2>The Solution</h2>
        <p>Acme implemented an end-to-end automated reporting system with these key components:</p>
        <ol>
          <li><strong>Centralized data hub</strong>: Integrated their project management suite, time tracking system, and financial software</li>
          <li><strong>Templatized reporting</strong>: Created standardized reports for executive, client, and team consumption</li>
          <li><strong>Scheduled generation</strong>: Configured weekly automatic generation and distribution</li>
          <li><strong>On-demand reporting</strong>: Enabled self-service access for stakeholders</li>
        </ol>
        
        <h2>Implementation Process</h2>
        <p>The implementation followed a phased approach:</p>
        <ol>
          <li><strong>Phase 1</strong>: Integration with core systems (4 weeks)</li>
          <li><strong>Phase 2</strong>: Template design and validation (3 weeks)</li>
          <li><strong>Phase 3</strong>: Pilot with two project teams (4 weeks)</li>
          <li><strong>Phase 4</strong>: Company-wide rollout and training (6 weeks)</li>
        </ol>
        
        <h2>Results</h2>
        <p>After six months of implementation, Acme achieved remarkable results:</p>
        <ul>
          <li><strong>80% reduction</strong> in time spent on reporting (from 8 hours to 1.5 hours per week)</li>
          <li><strong>94% stakeholder satisfaction</strong> with report quality and timeliness</li>
          <li><strong>$420,000 annual savings</strong> in recovered productive time</li>
          <li><strong>15% increase</strong> in on-time project delivery</li>
        </ul>
        
        <h2>Lessons Learned</h2>
        <p>Key takeaways from Acme's transformation include:</p>
        <ul>
          <li>Executive sponsorship was critical for securing resources and driving adoption</li>
          <li>Early involvement of end-users in template design increased satisfaction</li>
          <li>Phased implementation reduced disruption and allowed for adjustments</li>
          <li>Ongoing training was necessary to maximize the value of the new system</li>
        </ul>
      `,
      featuredImageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      readingTime: 12,
      authorId: author3.id,
      publishedAt: new Date("2023-05-03"),
      isFeatured: 0
    });
    
    this.addArticleCategory({ articleId: article3.id, categoryId: caseStudyCategory.id });
    
    const article4 = this.createArticle({
      title: "10 Custom Templates for Different Industries",
      slug: "10-custom-templates-for-different-industries",
      excerpt: "Explore industry-specific templates for software development, marketing, construction, and more.",
      content: `
        <h2>Introduction to Industry-Specific Reporting</h2>
        <p>While reporting fundamentals remain consistent across industries, each sector has unique data points, stakeholders, and compliance requirements. This guide presents customized reporting templates designed for specific industry needs.</p>
        
        <h2>1. Software Development</h2>
        <p>Software development teams benefit from templates that highlight:</p>
        <ul>
          <li><strong>Sprint progress</strong>: Story points completed vs. planned</li>
          <li><strong>Bug metrics</strong>: New, resolved, and outstanding issues</li>
          <li><strong>Code quality</strong>: Test coverage, code review status</li>
          <li><strong>Release readiness</strong>: Feature completion percentage, blocker status</li>
        </ul>
        <p>Our software development template integrates seamlessly with Jira, GitHub, and Azure DevOps.</p>
        
        <h2>2. Marketing Campaigns</h2>
        <p>Marketing teams need templates focused on:</p>
        <ul>
          <li><strong>Campaign performance</strong>: KPIs against targets</li>
          <li><strong>Channel metrics</strong>: Performance by marketing channel</li>
          <li><strong>Content production</strong>: Asset creation pipeline and status</li>
          <li><strong>Budget utilization</strong>: Spend vs. allocation by category</li>
        </ul>
        <p>The marketing template connects with Google Analytics, social media platforms, and marketing automation tools.</p>
        
        <h2>3. Construction Projects</h2>
        <p>Construction reporting templates emphasize:</p>
        <ul>
          <li><strong>Schedule tracking</strong>: Actual vs. planned progress</li>
          <li><strong>Safety metrics</strong>: Incidents, near-misses, and preventative measures</li>
          <li><strong>Budget monitoring</strong>: Cost variances and change orders</li>
          <li><strong>Resource allocation</strong>: Labor hours, equipment utilization</li>
        </ul>
        <p>Our construction template works with Procore, PlanGrid, and other construction management software.</p>
        
        <h2>4. Healthcare Initiatives</h2>
        <p>Healthcare organizations require templates that cover:</p>
        <ul>
          <li><strong>Patient metrics</strong>: Satisfaction scores, outcomes data</li>
          <li><strong>Compliance status</strong>: Regulatory requirements and audits</li>
          <li><strong>Quality improvement</strong>: Initiative tracking and results</li>
          <li><strong>Resource utilization</strong>: Staff allocation and facility usage</li>
        </ul>
        <p>The healthcare template is HIPAA-compliant and integrates with major EHR systems.</p>
        
        <h2>5. Financial Services</h2>
        <p>Financial reporting templates feature:</p>
        <ul>
          <li><strong>Portfolio performance</strong>: Returns, allocations, and benchmarks</li>
          <li><strong>Risk metrics</strong>: Exposure analysis and compliance status</li>
          <li><strong>Client acquisition</strong>: Pipeline and conversion metrics</li>
          <li><strong>Operational efficiency</strong>: Process metrics and improvement tracking</li>
        </ul>
        <p>Our financial services template connects with Bloomberg, CRM systems, and internal databases.</p>
        
        <h2>Additional Industry Templates</h2>
        <p>We also offer specialized templates for:</p>
        <ul>
          <li><strong>Education</strong>: Student progress, curriculum development, institutional initiatives</li>
          <li><strong>Retail</strong>: Inventory management, sales performance, store operations</li>
          <li><strong>Manufacturing</strong>: Production efficiency, quality control, supply chain</li>
          <li><strong>Non-profit</strong>: Program outcomes, grant utilization, donor engagement</li>
          <li><strong>Government</strong>: Constituent services, budget compliance, program effectiveness</li>
        </ul>
      `,
      featuredImageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      readingTime: 7,
      authorId: author4.id,
      publishedAt: new Date("2023-04-28"),
      isFeatured: 0
    });
    
    this.addArticleCategory({ articleId: article4.id, categoryId: automationCategory.id });
    
    const article5 = this.createArticle({
      title: "The Future of Automated Reporting: AI and Machine Learning",
      slug: "the-future-of-automated-reporting-ai-and-machine-learning",
      excerpt: "Explore how artificial intelligence and machine learning are transforming automated reporting systems to provide deeper insights and predictive analytics.",
      content: `
        <h2>Beyond Automation: Intelligent Reporting</h2>
        <p>While today's automated reporting systems excel at collecting and presenting data, the next generation will incorporate artificial intelligence and machine learning to transform how we understand and utilize project information.</p>
        
        <h2>AI-Powered Trend Analysis</h2>
        <p>Future reporting systems will automatically identify and highlight meaningful patterns in your project data:</p>
        <ul>
          <li><strong>Anomaly detection</strong>: Automated identification of data points that deviate from expected patterns</li>
          <li><strong>Correlation discovery</strong>: Highlighting relationships between seemingly unrelated metrics</li>
          <li><strong>Performance benchmarking</strong>: Contextualizing your results against industry standards</li>
        </ul>
        <p>These capabilities will elevate reports from descriptive summaries to powerful analytical tools.</p>
        
        <h2>Predictive Project Analytics</h2>
        <p>Machine learning algorithms will transform project reporting from backward-looking summaries to forward-looking predictions:</p>
        <ul>
          <li><strong>Delivery date forecasting</strong>: Data-driven predictions of actual completion dates</li>
          <li><strong>Resource utilization modeling</strong>: Advance warning of potential resource bottlenecks</li>
          <li><strong>Budget variance projection</strong>: Early alerts for potential cost overruns</li>
          <li><strong>Risk identification</strong>: Proactive flagging of emerging project risks</li>
        </ul>
        <p>These predictive capabilities will allow teams to address challenges before they impact project outcomes.</p>
        
        <h2>Natural Language Generation</h2>
        <p>Tomorrow's reporting systems will automatically generate narrative analyses to accompany data visualizations:</p>
        <ul>
          <li><strong>Executive summaries</strong>: Concise explanations of key findings tailored to leadership concerns</li>
          <li><strong>Performance narratives</strong>: Context-aware explanations of metrics and variations</li>
          <li><strong>Recommendation engines</strong>: AI-generated suggestions for addressing identified issues</li>
        </ul>
        <p>This capability will make reports more accessible and actionable for all stakeholders.</p>
        
        <h2>Augmented Data Collection</h2>
        <p>AI will transform how reporting systems gather information:</p>
        <ul>
          <li><strong>Intelligent data integration</strong>: Automated discovery and connection to relevant data sources</li>
          <li><strong>Unstructured data analysis</strong>: Extraction of insights from emails, documents, and meeting transcripts</li>
          <li><strong>Automated data quality assurance</strong>: Detection and correction of inconsistencies and errors</li>
        </ul>
        <p>These advances will ensure reports incorporate all relevant information regardless of where it resides.</p>
        
        <h2>Personalized Delivery</h2>
        <p>Future systems will tailor reporting experiences to individual stakeholders:</p>
        <ul>
          <li><strong>Role-based content prioritization</strong>: Highlighting the most relevant information for each viewer</li>
          <li><strong>Adaptive detail levels</strong>: Adjusting information density based on user preferences and history</li>
          <li><strong>Interactive exploration</strong>: Allowing intuitive deep dives into areas of interest</li>
        </ul>
        <p>This personalization will maximize the value and impact of reports for each recipient.</p>
        
        <h2>Preparing for Intelligent Reporting</h2>
        <p>Organizations can begin preparing for this future today by:</p>
        <ul>
          <li>Ensuring data quality and consistency across systems</li>
          <li>Developing structured taxonomies for project data</li>
          <li>Building historical data sets for future machine learning applications</li>
          <li>Experimenting with available AI reporting tools in controlled environments</li>
        </ul>
        <p>The transition to AI-enhanced reporting will be evolutionary, allowing teams to gradually incorporate new capabilities as they become available.</p>
      `,
      featuredImageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      readingTime: 10,
      authorId: author1.id,
      publishedAt: new Date("2023-04-20"),
      isFeatured: 0
    });
    
    this.addArticleCategory({ articleId: article5.id, categoryId: automationCategory.id });
    
    const article6 = this.createArticle({
      title: "5 Key Metrics Every Progress Report Should Include",
      slug: "5-key-metrics-every-progress-report-should-include",
      excerpt: "Discover the essential metrics that should be included in every project progress report to effectively communicate status and drive decision-making.",
      content: `
        <h2>The Purpose of Progress Metrics</h2>
        <p>Effective progress reports must balance comprehensive information with clarity and focus. Including the right metrics ensures stakeholders understand project status at a glance while providing the data needed for informed decisions.</p>
        
        <h2>1. Schedule Performance</h2>
        <p>Schedule metrics provide visibility into timeline adherence and progress pace:</p>
        <ul>
          <li><strong>Planned vs. Actual Progress</strong>: Compare expected completion percentage against actual status</li>
          <li><strong>Milestone Status</strong>: Track key deliverables against baseline dates</li>
          <li><strong>Schedule Variance (SV)</strong>: Quantify the monetary value of schedule deviations</li>
          <li><strong>Schedule Performance Index (SPI)</strong>: Measure work efficiency ratio (earned value ÷ planned value)</li>
        </ul>
        <p>Visualization tip: Use Gantt charts with baseline comparisons or simple burndown charts to make schedule performance immediately apparent.</p>
        
        <h2>2. Budget Utilization</h2>
        <p>Financial metrics help maintain fiscal control and forecast final costs:</p>
        <ul>
          <li><strong>Planned vs. Actual Spend</strong>: Compare budgeted costs against actuals for the reporting period</li>
          <li><strong>Cost Variance (CV)</strong>: Quantify budget deviations in monetary terms</li>
          <li><strong>Cost Performance Index (CPI)</strong>: Calculate cost efficiency ratio (earned value ÷ actual cost)</li>
          <li><strong>Forecast at Completion (FAC)</strong>: Project final cost based on current performance</li>
        </ul>
        <p>Visualization tip: Stacked bar charts showing planned, actual, and committed costs provide a comprehensive financial snapshot.</p>
        
        <h2>3. Scope Delivery</h2>
        <p>Scope metrics track deliverable completion and requirement fulfillment:</p>
        <ul>
          <li><strong>Requirements Completion</strong>: Percentage of defined requirements implemented and verified</li>
          <li><strong>Deliverable Status</strong>: Summary of completed, in-progress, and pending deliverables</li>
          <li><strong>Scope Change Metrics</strong>: Number and impact of approved and pending change requests</li>
          <li><strong>Acceptance Rate</strong>: Percentage of deliverables accepted by stakeholders without rework</li>
        </ul>
        <p>Visualization tip: Progress doughnuts for overall completion with supporting tables for detailed status review.</p>
        
        <h2>4. Quality Indicators</h2>
        <p>Quality metrics ensure deliverables meet standards and expectations:</p>
        <ul>
          <li><strong>Defect Metrics</strong>: Count, severity, and trend of identified issues</li>
          <li><strong>Test Coverage</strong>: Percentage of requirements covered by test cases</li>
          <li><strong>Test Pass Rate</strong>: Proportion of tests executed successfully</li>
          <li><strong>Technical Debt</strong>: Assessment of shortcuts taken and their future impact</li>
        </ul>
        <p>Visualization tip: Combination charts showing defect trends alongside project progress help correlate quality with delivery pressure.</p>
        
        <h2>5. Risk Profile</h2>
        <p>Risk metrics provide forward-looking insight into potential challenges:</p>
        <ul>
          <li><strong>Risk Exposure</strong>: Aggregate impact of identified risks (probability × impact)</li>
          <li><strong>Top Risks</strong>: Highest priority risks requiring attention or mitigation</li>
          <li><strong>Risk Response Status</strong>: Implementation status of planned mitigation actions</li>
          <li><strong>New/Changing Risks</strong>: Emerging threats or opportunities identified since last report</li>
        </ul>
        <p>Visualization tip: Heat maps effectively communicate risk severity and concentration across project areas.</p>
        
        <h2>Contextualizing Metrics for Maximum Impact</h2>
        <p>To make metrics truly valuable in progress reports:</p>
        <ul>
          <li><strong>Provide trends</strong>: Include historical data to show directionality</li>
          <li><strong>Add thresholds</strong>: Define acceptable ranges to highlight metrics requiring attention</li>
          <li><strong>Include narrative</strong>: Supplement numbers with concise explanation and context</li>
          <li><strong>Link to actions</strong>: Connect concerning metrics to specific correction plans</li>
        </ul>
        <p>Remember that metrics should drive decisions and actions—if a metric doesn't inform choices or behavior, reconsider its inclusion in your reports.</p>
      `,
      featuredImageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      readingTime: 9,
      authorId: author2.id,
      publishedAt: new Date("2023-04-15"),
      isFeatured: 0
    });
    
    this.addArticleCategory({ articleId: article6.id, categoryId: productivityCategory.id });
  }

  // Users methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Categories methods
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategory(id: number): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(
      (category) => category.slug === slug,
    );
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.categoryId++;
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }

  // Articles methods
  async getArticles(
    limit?: number, 
    offset: number = 0, 
    categorySlug?: string,
    searchTerm?: string
  ): Promise<ArticleWithDetails[]> {
    let articles = Array.from(this.articles.values());
    
    // Filter by category if provided
    if (categorySlug) {
      const category = await this.getCategoryBySlug(categorySlug);
      if (category) {
        const articleIdsInCategory = this.articleCategories
          .filter(ac => ac.categoryId === category.id)
          .map(ac => ac.articleId);
        
        articles = articles.filter(article => articleIdsInCategory.includes(article.id));
      }
    }
    
    // Filter by search term if provided
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      articles = articles.filter(article => 
        article.title.toLowerCase().includes(search) || 
        article.excerpt.toLowerCase().includes(search) ||
        article.content.toLowerCase().includes(search)
      );
    }
    
    // Sort by publish date (newest first)
    articles.sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
    
    // Apply pagination
    if (limit) {
      articles = articles.slice(offset, offset + limit);
    }
    
    // Fetch additional details
    const articlesWithDetails = await Promise.all(
      articles.map(async (article) => {
        const author = await this.getUser(article.authorId);
        const categories = await this.getArticleCategories(article.id);
        
        return {
          ...article,
          author: author!,
          categories,
        };
      })
    );
    
    return articlesWithDetails;
  }

  async getFeaturedArticles(): Promise<ArticleWithDetails[]> {
    const featuredArticles = Array.from(this.articles.values())
      .filter(article => article.isFeatured === 1)
      .sort((a, b) => 
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    
    const articlesWithDetails = await Promise.all(
      featuredArticles.map(async (article) => {
        const author = await this.getUser(article.authorId);
        const categories = await this.getArticleCategories(article.id);
        
        return {
          ...article,
          author: author!,
          categories,
        };
      })
    );
    
    return articlesWithDetails;
  }

  async getArticleCount(categorySlug?: string, searchTerm?: string): Promise<number> {
    let articles = Array.from(this.articles.values());
    
    // Filter by category if provided
    if (categorySlug) {
      const category = await this.getCategoryBySlug(categorySlug);
      if (category) {
        const articleIdsInCategory = this.articleCategories
          .filter(ac => ac.categoryId === category.id)
          .map(ac => ac.articleId);
        
        articles = articles.filter(article => articleIdsInCategory.includes(article.id));
      }
    }
    
    // Filter by search term if provided
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      articles = articles.filter(article => 
        article.title.toLowerCase().includes(search) || 
        article.excerpt.toLowerCase().includes(search) ||
        article.content.toLowerCase().includes(search)
      );
    }
    
    return articles.length;
  }

  async getArticle(id: number): Promise<ArticleWithDetails | undefined> {
    const article = this.articles.get(id);
    if (!article) return undefined;
    
    const author = await this.getUser(article.authorId);
    const categories = await this.getArticleCategories(article.id);
    
    return {
      ...article,
      author: author!,
      categories,
    };
  }

  async getArticleBySlug(slug: string): Promise<ArticleWithDetails | undefined> {
    const article = Array.from(this.articles.values()).find(
      (article) => article.slug === slug,
    );
    
    if (!article) return undefined;
    
    const author = await this.getUser(article.authorId);
    const categories = await this.getArticleCategories(article.id);
    
    return {
      ...article,
      author: author!,
      categories,
    };
  }

  async createArticle(insertArticle: InsertArticle): Promise<Article> {
    const id = this.articleId++;
    const article: Article = { ...insertArticle, id };
    this.articles.set(id, article);
    return article;
  }

  // Article categories methods
  async getArticleCategories(articleId: number): Promise<Category[]> {
    const categoryIds = this.articleCategories
      .filter(ac => ac.articleId === articleId)
      .map(ac => ac.categoryId);
    
    return categoryIds.map(id => this.categories.get(id)!).filter(Boolean);
  }

  async addArticleCategory(articleCategory: InsertArticleCategory): Promise<ArticleCategory> {
    this.articleCategories.push(articleCategory);
    return articleCategory;
  }

  // Related articles
  async getRelatedArticles(articleId: number, limit: number): Promise<ArticleWithDetails[]> {
    const article = await this.getArticle(articleId);
    
    if (!article) return [];
    
    const categories = await this.getArticleCategories(articleId);
    const categoryIds = categories.map(c => c.id);
    
    // Find articles that share categories with the given article
    const categoryArticleIds = this.articleCategories
      .filter(ac => categoryIds.includes(ac.categoryId) && ac.articleId !== articleId)
      .map(ac => ac.articleId);
    
    // Count occurrences to find articles with most shared categories
    const articleCounts = categoryArticleIds.reduce((acc, id) => {
      acc[id] = (acc[id] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);
    
    // Get unique article IDs and sort by most shared categories
    const relatedArticleIds = [...new Set(categoryArticleIds)]
      .sort((a, b) => {
        // Sort by category match count (descending)
        const countDiff = articleCounts[b] - articleCounts[a];
        if (countDiff !== 0) return countDiff;
        
        // If equal match count, sort by published date (descending)
        const articleA = this.articles.get(a);
        const articleB = this.articles.get(b);
        if (articleA && articleB) {
          return new Date(articleB.publishedAt).getTime() - new Date(articleA.publishedAt).getTime();
        }
        return 0;
      })
      .slice(0, limit);
    
    // Fetch full article details
    const relatedArticles = await Promise.all(
      relatedArticleIds.map(id => this.getArticle(id))
    );
    
    return relatedArticles.filter(Boolean) as ArticleWithDetails[];
  }
}

export const storage = new MemStorage();
