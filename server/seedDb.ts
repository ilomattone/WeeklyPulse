import { db } from "./db";
import { 
  users, 
  categories, 
  articles, 
  articleCategories, 
  type InsertUser, 
  type InsertCategory, 
  type InsertArticle,
  type InsertArticleCategory
} from "@shared/schema";

async function seed() {
  console.log('Starting database seed...');
  
  // Clear existing data
  await db.delete(articleCategories);
  await db.delete(articles);
  await db.delete(categories);
  await db.delete(users);
  
  console.log('Tables cleared, inserting sample data...');
  
  // Create users
  const [author1] = await db.insert(users).values({
    username: "sarah.johnson",
    password: "password123",
    fullName: "Sarah Johnson",
    bio: "Senior Writer and Editor with extensive experience in tech journalism.",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  }).returning();
  
  const [author2] = await db.insert(users).values({
    username: "michael.torres",
    password: "password123",
    fullName: "Michael Torres",
    bio: "Tech enthusiast and product reviewer with a passion for clear communication.",
    avatarUrl: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  }).returning();
  
  const [author3] = await db.insert(users).values({
    username: "jessica.chen",
    password: "password123",
    fullName: "Jessica Chen",
    bio: "UX researcher and writer focusing on user experience and product design.",
    avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  }).returning();
  
  const [author4] = await db.insert(users).values({
    username: "robert.parker",
    password: "password123",
    fullName: "Robert Parker",
    bio: "Developer advocate and technical writer who simplifies complex topics.",
    avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  }).returning();
  
  console.log('Users created...');
  
  // Create categories
  const [tutorialCategory] = await db.insert(categories).values({
    name: "Tutorials",
    slug: "tutorials"
  }).returning();
  
  const [productivityCategory] = await db.insert(categories).values({
    name: "Productivity",
    slug: "productivity"
  }).returning();
  
  const [automationCategory] = await db.insert(categories).values({
    name: "Automation",
    slug: "automation"
  }).returning();
  
  const [caseStudyCategory] = await db.insert(categories).values({
    name: "Case Studies",
    slug: "case-studies"
  }).returning();
  
  console.log('Categories created...');
  
  // Create articles
  const [article1] = await db.insert(articles).values({
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
  }).returning();
  
  // Link article to categories
  await db.insert(articleCategories).values([
    { articleId: article1.id, categoryId: productivityCategory.id },
    { articleId: article1.id, categoryId: automationCategory.id }
  ]);
  
  const [article2] = await db.insert(articles).values({
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
          <li>Configure field mappings to ensure data is interpreted correctly</li>
        </ol>
      `,
    featuredImageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    readingTime: 10,
    authorId: author1.id,
    publishedAt: new Date("2023-05-01"),
    isFeatured: 0
  }).returning();
  
  // Link article to categories
  await db.insert(articleCategories).values([
    { articleId: article2.id, categoryId: tutorialCategory.id },
    { articleId: article2.id, categoryId: automationCategory.id }
  ]);
  
  const [article3] = await db.insert(articles).values({
    title: "Case Study: How Acme Corp Reduced Reporting Time by 83%",
    slug: "case-study-how-acme-corp-reduced-reporting-time-by-83-percent",
    excerpt: "Learn how Acme Corp transformed their reporting process from a 30-hour weekly ordeal to a streamlined 5-hour task using automation.",
    content: `
        <h2>Company Background</h2>
        <p>Acme Corporation is a mid-sized software development company with 120 employees across 14 project teams. Before implementing automated reporting, their project managers spent an average of 30 hours each week preparing status reports for various stakeholders.</p>
      `,
    featuredImageUrl: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    readingTime: 12,
    authorId: author2.id,
    publishedAt: new Date("2023-04-25"),
    isFeatured: 0
  }).returning();
  
  // Link article to categories
  await db.insert(articleCategories).values([
    { articleId: article3.id, categoryId: caseStudyCategory.id },
    { articleId: article3.id, categoryId: automationCategory.id }
  ]);
  
  console.log('Articles and article categories created...');
  console.log('Database seed completed successfully!');
}

// Run seed function
seed()
  .then(() => {
    console.log('Database seeded successfully.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error seeding database:', error);
    process.exit(1);
  });