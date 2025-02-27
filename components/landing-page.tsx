"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckSquare, Sparkles, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function LandingPage() {
  const { scrollY } = useScroll();
  const ref = useRef<HTMLDivElement>(null);
  const [bubbles, setBubbles] = useState<
    Array<{ id: number; size: number; x: number; y: number; delay: number }>
  >([]);
  const [isVisible, setIsVisible] = useState(false);

  // Generate random bubbles for the background
  useEffect(() => {
    const newBubbles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      size: Math.random() * 100 + 50,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
    }));
    setBubbles(newBubbles);

    // Set visibility after a small delay to trigger animations
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Parallax effects
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -300]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.2]);

  // Features data
  const features = [
    {
      icon: <CheckSquare className="h-10 w-10 text-primary" />,
      title: "Smart Task Management",
      description:
        "Organize tasks with AI-powered categorization and priority suggestions.",
    },
    {
      icon: <Star className="h-10 w-10 text-amber-500" />,
      title: "Productivity Insights",
      description:
        "Gain valuable insights into your work patterns and optimize your productivity.",
    },
    {
      icon: <Sparkles className="h-10 w-10 text-secondary" />,
      title: "AI Assistance",
      description:
        "Get intelligent suggestions for task scheduling and time management.",
    },
  ];

  // Testimonials data
  const testimonials = [
    {
      quote:
        "TaskAI has completely transformed how I manage my workload. The AI suggestions are spot-on!",
      author: "Sarah Johnson",
      role: "Product Manager",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      quote:
        "The productivity insights helped me identify when I work best and schedule my day accordingly.",
      author: "Michael Chen",
      role: "Software Developer",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      quote:
        "I've tried many task management tools, but TaskAI is in a league of its own with its AI capabilities.",
      author: "Emma Rodriguez",
      role: "Marketing Director",
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ];

  return (
    <div className="relative overflow-hidden" ref={ref}>
      {/* Animated background bubbles */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        {bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            className="absolute rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-3xl"
            style={{
              width: bubble.size,
              height: bubble.size,
              left: `${bubble.x}%`,
              top: `${bubble.y}%`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 0.5,
              x: [0, Math.random() * 50 - 25, 0],
              y: [0, Math.random() * 50 - 25, 0],
            }}
            transition={{
              delay: bubble.delay,
              duration: 15 + bubble.delay * 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      {/* Hero section */}
      <section className="relative pt-20 pb-32 md:pt-32 md:pb-40">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col gap-4"
            >
              <div className="inline-block">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="px-4 py-2 rounded-full bg-primary/10 text-primary flex items-center gap-2 w-fit mb-4"
                >
                  <Sparkles className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    AI-Powered Productivity
                  </span>
                </motion.div>
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
              >
                Manage tasks <span className="text-primary">smarter</span>, not
                harder
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="text-xl text-muted-foreground max-w-[600px]"
              >
                TaskAI uses artificial intelligence to help you organize,
                prioritize, and complete your tasks more efficiently than ever
                before.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
                className="flex flex-col sm:flex-row gap-4 mt-4"
              >
                <Button size="lg" asChild className="group">
                  <Link href="/sign-up">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="#features">Learn More</Link>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              style={{ y: y1, opacity }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: isVisible ? 1 : 0,
                scale: isVisible ? 1 : 0.8,
              }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative"
            >
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-primary/10 glass-card">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  width={800}
                  height={600}
                  alt="TaskAI Dashboard"
                  className="w-full h-auto"
                />

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.3 }}
                  className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-900 rounded-lg p-4 shadow-lg"
                >
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span className="text-sm font-medium">
                      Productivity up 32%
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1.5 }}
                  className="absolute top-4 -left-6 bg-white dark:bg-gray-900 rounded-lg p-4 shadow-lg"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-secondary" />
                    <span className="text-sm font-medium">AI Suggestions</span>
                  </div>
                </motion.div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full bg-gradient-to-r from-primary/5 to-secondary/5 blur-3xl"></div>
              <div className="absolute -z-10 top-0 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
              <div className="absolute -z-10 bottom-0 left-0 w-72 h-72 bg-secondary/10 rounded-full blur-3xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats section */}
      <section className="py-12 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "10,000+", label: "Active Users" },
              { value: "1M+", label: "Tasks Completed" },
              { value: "85%", label: "Productivity Increase" },
              { value: "24/7", label: "AI Assistance" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features section */}
      <section id="features" className="py-24 md:py-32 relative">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
              TaskAI combines cutting-edge AI technology with intuitive design
              to transform your productivity.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl transform group-hover:scale-[1.03] transition-transform duration-300 -z-10"></div>
                <Card className="p-6 h-full bg-background/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-colors">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Decorative elements */}
        <motion.div
          style={{ y: y2 }}
          className="absolute -z-10 top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        ></motion.div>
        <motion.div
          style={{ y: y1 }}
          className="absolute -z-10 bottom-1/4 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"
        ></motion.div>
      </section>

      {/* How it works section */}
      <section className="py-24 md:py-32 bg-muted/30 relative">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How TaskAI Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
              Our AI-powered platform adapts to your work style to help you
              achieve more.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-primary/20 -z-10"></div>

            {[
              {
                step: "01",
                title: "Add Your Tasks",
                description:
                  "Create tasks manually or let our AI generate them based on your input.",
              },
              {
                step: "02",
                title: "AI Optimization",
                description:
                  "Our AI analyzes your tasks and suggests optimal scheduling and prioritization.",
              },
              {
                step: "03",
                title: "Track & Improve",
                description:
                  "Monitor your progress and receive personalized productivity insights.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-background rounded-full w-12 h-12 flex items-center justify-center border border-primary/20 mx-auto mb-6 relative z-10">
                  <span className="text-lg font-bold text-primary">
                    {item.step}
                  </span>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials section */}
      <section id="testimonials" className="py-24 md:py-32 relative">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
              Join thousands of satisfied users who have transformed their
              productivity with TaskAI.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Card className="p-6 h-full bg-background/50 backdrop-blur-sm border-primary/10">
                  <div className="mb-4 text-primary">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="inline-block h-5 w-5 fill-current"
                      />
                    ))}
                  </div>
                  <p className="mb-6 italic text-muted-foreground">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-4">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      width={60}
                      height={60}
                      alt={testimonial.author}
                      className="rounded-full"
                    />
                    <div>
                      <div className="font-medium">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Decorative elements */}
        <motion.div
          style={{ y: y1 }}
          className="absolute -z-10 top-1/3 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
        ></motion.div>
        <motion.div
          style={{ y: y2 }}
          className="absolute -z-10 bottom-1/3 right-1/4 w-72 h-72 bg-secondary/5 rounded-full blur-3xl"
        ></motion.div>
      </section>

      {/* CTA section */}
      <section className="py-24 md:py-32 bg-gradient-to-r from-primary/10 to-secondary/10 relative">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-[800px] mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Productivity?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of users who have already revolutionized their task
              management with TaskAI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="group">
                <Link href="/sign-up">
                  Get Started for Free
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/sign-in">Sign In</Link>
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              No credit card required. Free plan available with premium
              upgrades.
            </p>
          </motion.div>
        </div>

        {/* Floating elements */}
        <div className="absolute -z-10 inset-0 overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/10 backdrop-blur-xl"
              style={{
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * 100 - 50, 0],
                x: [0, Math.random() * 100 - 50, 0],
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full"></div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
