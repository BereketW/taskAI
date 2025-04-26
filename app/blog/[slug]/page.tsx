"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  Bookmark,
  Clock,
  Facebook,
  Heart,
  Link2,
  Linkedin,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

// Mock blog post data - in a real app, this would come from an API or CMS
const blogPost = {
  slug: "productivity-tips-2024",
  title: "Top 10 Productivity Tips for 2024",
  description:
    "Discover the most effective productivity strategies and tools to boost your efficiency in the new year.",
  content: `
    <p>In today's fast-paced world, productivity is more important than ever. As we enter 2024, new challenges and opportunities require us to adapt our productivity strategies. Here are the top 10 tips that will help you maximize your efficiency and achieve more this year.</p>

    <h2>1. Embrace AI-Powered Task Management</h2>
    <p>Artificial Intelligence has revolutionized how we organize and prioritize tasks. Tools like TaskAI can analyze your work patterns and suggest optimal schedules for maximum productivity.</p>

    <h2>2. The Two-Minute Rule</h2>
    <p>If a task takes less than two minutes to complete, do it immediately instead of adding it to your to-do list. This prevents the accumulation of small tasks that can overwhelm you later.</p>

    <h2>3. Time Blocking</h2>
    <p>Dedicate specific time blocks for different types of work. This helps maintain focus and reduces context switching, which can drain your energy and productivity.</p>

    <h2>4. Digital Minimalism</h2>
    <p>Reduce digital clutter by organizing your files, maintaining a clean inbox, and limiting notifications. A cleaner digital workspace leads to better focus and efficiency.</p>

    <h2>5. Regular Breaks</h2>
    <p>Use techniques like the Pomodoro Method to maintain high energy levels throughout the day. Short, regular breaks can actually increase your overall productivity.</p>
  `,
  image: "/placeholder.svg?height=600&width=1200",
  category: "Productivity",
  date: "January 15, 2024",
  readTime: "5 min read",
  author: {
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=80&width=80",
    role: "Productivity Expert",
    bio: "Sarah has been helping professionals optimize their workflow for over a decade. She specializes in digital productivity tools and time management strategies.",
  },
  tags: ["Productivity", "Time Management", "Work Tips"],
  relatedPosts: [
    {
      slug: "ai-task-management",
      title: "How AI is Revolutionizing Task Management",
      description:
        "An in-depth look at how artificial intelligence is changing the way we manage our daily tasks.",
      image: "/placeholder.svg?height=200&width=300",
      date: "Jan 10, 2024",
      readTime: "8 min read",
    },
    {
      slug: "remote-work-efficiency",
      title: "Maximizing Efficiency in Remote Work",
      description:
        "Learn how to stay productive and maintain work-life balance while working remotely.",
      image: "/placeholder.svg?height=200&width=300",
      date: "Jan 5, 2024",
      readTime: "6 min read",
    },
  ],
};

export default function BlogPostPage() {
  return (
    <div className="min-h-screen pb-12">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] w-full">
        <Image
          src={blogPost.image || "/placeholder.svg"}
          alt={blogPost.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/0" />
        <div className="absolute inset-x-0 bottom-0 container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center text-sm hover:text-primary mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
            <Badge variant="secondary" className="mb-4">
              {blogPost.category}
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight mb-4 md:text-5xl lg:text-6xl">
              {blogPost.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-[700px]">
              {blogPost.description}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Author Info */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={blogPost.author.avatar} />
                    <AvatarFallback>{blogPost.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{blogPost.author.name}</h3>
                      <Badge variant="secondary">{blogPost.author.role}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {blogPost.author.bio}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {blogPost.readTime}
                      </div>
                      <div>{blogPost.date}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Article Content */}
            <article className="prose prose-gray dark:prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
            </article>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-8">
              {blogPost.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Engagement */}
            <div className="flex items-center gap-4 mt-8">
              <Button variant="outline" className="gap-2">
                <Heart className="h-4 w-4" />
                Like
              </Button>
              <Button variant="outline" className="gap-2">
                <Bookmark className="h-4 w-4" />
                Save
              </Button>
              <Button variant="outline" className="gap-2">
                <Link2 className="h-4 w-4" />
                Share
              </Button>
            </div>

            <Separator className="my-8" />

            {/* Author Bio (Mobile) */}
            <div className="md:hidden">
              <h3 className="font-semibold mb-4">About the Author</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={blogPost.author.avatar} />
                      <AvatarFallback>{blogPost.author.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{blogPost.author.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {blogPost.author.role}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    {blogPost.author.bio}
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Share Buttons */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="sticky top-8"
            >
              <h3 className="font-semibold mb-4">Share this article</h3>
              <div className="flex flex-col gap-2">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <Twitter className="h-4 w-4" />
                  Share on Twitter
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <Facebook className="h-4 w-4" />
                  Share on Facebook
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <Linkedin className="h-4 w-4" />
                  Share on LinkedIn
                </Button>
              </div>

              {/* Related Posts */}
              <h3 className="font-semibold mt-8 mb-4">Related Articles</h3>
              <div className="space-y-4">
                {blogPost.relatedPosts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`}>
                    <Card className="overflow-hidden hover:bg-muted/50 transition-colors">
                      <CardContent className="p-4">
                        <div className="aspect-[16/9] relative rounded-md overflow-hidden mb-4">
                          <Image
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <h4 className="font-medium mb-2 line-clamp-2">
                          {post.title}
                        </h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {post.readTime}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
