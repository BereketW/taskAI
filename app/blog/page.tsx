"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bookmark, Clock, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock blog post data
const blogPosts = [
  {
    id: 1,
    slug: "productivity-tips-2024",
    title: "Top 10 Productivity Tips for 2024",
    description:
      "Discover the most effective productivity strategies and tools to boost your efficiency in the new year.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Productivity",
    date: "Jan 15, 2024",
    readTime: "5 min read",
    author: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Productivity Expert",
    },
    tags: ["Productivity", "Time Management", "Work Tips"],
  },
  {
    id: 2,
    slug: "ai-task-management",
    title: "How AI is Revolutionizing Task Management",
    description:
      "An in-depth look at how artificial intelligence is changing the way we manage our daily tasks.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Technology",
    date: "Jan 10, 2024",
    readTime: "8 min read",
    author: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Tech Analyst",
    },
    tags: ["AI", "Technology", "Future of Work"],
  },
  {
    id: 3,
    slug: "remote-work-efficiency",
    title: "Maximizing Efficiency in Remote Work",
    description:
      "Learn how to stay productive and maintain work-life balance while working remotely.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Remote Work",
    date: "Jan 5, 2024",
    readTime: "6 min read",
    author: {
      name: "Emma Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Remote Work Consultant",
    },
    tags: ["Remote Work", "Work-Life Balance", "Productivity"],
  },
  // Add more blog posts...
];

const categories = [
  "All",
  "Productivity",
  "Technology",
  "Remote Work",
  "Team Management",
  "AI",
];

export default function BlogPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold tracking-tight"
          >
            TaskAI Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground"
          >
            Insights and tips on productivity, task management, and AI
            technology
          </motion.p>
        </div>

        {/* Featured Post */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <Link href={`/blog/${blogPosts[0].slug}`} className="group">
            <Card className="overflow-hidden border-primary/10">
              <div className="relative aspect-[2/1] overflow-hidden">
                <Image
                  src={blogPosts[0].image || "/placeholder.svg"}
                  alt={blogPosts[0].title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/0" />
                <Badge
                  className="absolute top-4 left-4 bg-primary/90 hover:bg-primary/90"
                  variant="secondary"
                >
                  Featured
                </Badge>
              </div>
              <CardHeader className="relative">
                <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                  {blogPosts[0].title}
                </CardTitle>
                <CardDescription className="text-base">
                  {blogPosts[0].description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={blogPosts[0].author.avatar} />
                    <AvatarFallback>
                      {blogPosts[0].author.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {blogPosts[0].author.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {blogPosts[0].author.role}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {blogPosts[0].readTime}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search articles..."
              className="pl-8"
            />
          </div>
          <Tabs defaultValue="all" className="w-full sm:w-auto">
            <TabsList className="w-full sm:w-auto">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category.toLowerCase()}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.slice(1).map((post) => (
            <motion.div
              key={post.id}
              variants={item}
              initial="hidden"
              animate="show"
              className="group relative"
            >
              <Link href={`/blog/${post.slug}`}>
                <Card className="overflow-hidden h-full border-primary/10 transition-colors hover:border-primary/30">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <Badge
                      className="absolute top-4 left-4"
                      variant="secondary"
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                      }}
                    >
                      {post.category}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {post.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={post.author.avatar} />
                        <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {post.author.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {post.date}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Bookmark className="h-4 w-4" />
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        <div className="flex justify-center mt-8">
          <Button variant="outline" className="group">
            Load More Articles
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
