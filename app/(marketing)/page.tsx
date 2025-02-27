"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-background to-secondary/20 z-0" />
        <div className="container px-4 md:px-6 relative z-10">
          <motion.div
            className="flex flex-col items-center space-y-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary backdrop-blur-md">
              Introducing TaskAI
            </div>
            <motion.h1
              className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              AI-Powered Task Management
            </motion.h1>
            <motion.p
              className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Boost your productivity with intelligent task management. Let AI optimize your schedule, prioritize tasks,
              and provide personalized insights.
            </motion.p>
            <motion.div
              className="flex flex-wrap items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button asChild size="lg" className="rounded-full">
                <Link href="/sign-up">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link href="/sign-in">Sign In</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[20vh] bg-gradient-to-t from-background to-transparent z-10" />
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary backdrop-blur-md">
              Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Smart Features for Smart People
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              TaskAI combines powerful task management with cutting-edge AI to help you work smarter, not harder.
            </p>
          </div>
          <motion.div
            className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {[
              {
                title: "AI Task Suggestions",
                description: "Get intelligent suggestions for tasks based on your habits and patterns.",
                icon: Sparkles,
                color: "bg-secondary/10",
                textColor: "text-secondary",
              },
              {
                title: "Smart Prioritization",
                description: "AI automatically ranks your tasks by urgency and importance.",
                icon: CheckCircle,
                color: "bg-primary/10",
                textColor: "text-primary",
              },
              {
                title: "Intelligent Deadlines",
                description: "AI suggests the optimal time to complete tasks based on your schedule.",
                icon: Sparkles,
                color: "bg-secondary/10",
                textColor: "text-secondary",
              },
              {
                title: "Productivity Insights",
                description: "Get personalized insights about your productivity patterns.",
                icon: CheckCircle,
                color: "bg-primary/10",
                textColor: "text-primary",
              },
              {
                title: "Team Collaboration",
                description: "Assign tasks to team members and track progress together.",
                icon: Sparkles,
                color: "bg-secondary/10",
                textColor: "text-secondary",
              },
              {
                title: "Cross-Platform Support",
                description: "Access your tasks from anywhere, even offline.",
                icon: CheckCircle,
                color: "bg-primary/10",
                textColor: "text-primary",
              },
            ].map((feature, index) => (
              <motion.div key={index} variants={item}>
                <Card className="backdrop-blur-lg bg-white/10 dark:bg-gray-950/30 border-muted/40 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-1">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-full ${feature.color} flex items-center justify-center mb-4`}>
                      <feature.icon className={`h-6 w-6 ${feature.textColor}`} />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* App Preview Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <motion.div
              className="flex flex-col justify-center space-y-4"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary backdrop-blur-md w-fit">
                Powerful Dashboard
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Experience the Future of Task Management
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our intuitive dashboard gives you a complete overview of your tasks, priorities, and productivity
                insights. Let AI handle the optimization while you focus on what matters.
              </p>
              <ul className="grid gap-2 py-4">
                {[
                  "Intuitive drag-and-drop interface",
                  "Real-time AI suggestions",
                  "Customizable views and filters",
                  "Detailed productivity analytics",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div>
                <Button asChild className="rounded-full">
                  <Link href="/sign-up">
                    Try It Free <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
            <motion.div
              className="mx-auto overflow-hidden rounded-xl border bg-background shadow-xl"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Image
                src="/placeholder.svg?height=600&width=800"
                width={800}
                height={600}
                alt="TaskAI Dashboard Preview"
                className="aspect-video object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary backdrop-blur-md">
              Testimonials
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Loved by Productive People</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              See what our users have to say about how TaskAI has transformed their productivity.
            </p>
          </div>
          <motion.div
            className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {[
              {
                quote:
                  "TaskAI has completely transformed how I manage my workload. The AI suggestions are surprisingly accurate!",
                author: "Sarah Johnson",
                role: "Product Manager",
              },
              {
                quote:
                  "I've tried dozens of task managers, but none come close to the intelligence and ease of use that TaskAI provides.",
                author: "Michael Chen",
                role: "Software Engineer",
              },
              {
                quote:
                  "The productivity insights have helped me identify and eliminate time-wasting habits I didn't even know I had.",
                author: "Emma Rodriguez",
                role: "Marketing Director",
              },
              {
                quote:
                  "Our team's efficiency has increased by 40% since we started using TaskAI for project management.",
                author: "David Kim",
                role: "Team Lead",
              },
              {
                quote: "The AI prioritization feature ensures I'm always working on what matters most. Game changer!",
                author: "Lisa Patel",
                role: "Freelance Designer",
              },
              {
                quote:
                  "TaskAI's ability to learn my work patterns and suggest optimal schedules has given me back hours each week.",
                author: "James Wilson",
                role: "Entrepreneur",
              },
            ].map((testimonial, index) => (
              <motion.div key={index} variants={item}>
                <Card className="backdrop-blur-lg bg-white/10 dark:bg-gray-950/30 border-muted/40 h-full">
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-4 h-full">
                      <div className="flex-1">
                        <p className="italic text-muted-foreground">"{testimonial.quote}"</p>
                      </div>
                      <div>
                        <p className="font-semibold">{testimonial.author}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary backdrop-blur-md">
              Pricing
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Simple, Transparent Pricing</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Choose the plan that works best for you or your team.
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 mt-12">
            {[
              {
                title: "Free",
                price: "$0",
                description: "Perfect for individuals just getting started.",
                features: [
                  "Basic task management",
                  "Limited AI suggestions",
                  "7-day task history",
                  "Mobile app access",
                ],
                buttonText: "Get Started",
                buttonVariant: "outline",
                popular: false,
              },
              {
                title: "Pro",
                price: "$9.99",
                period: "/month",
                description: "Ideal for professionals seeking AI-powered productivity.",
                features: [
                  "Advanced AI task suggestions",
                  "Unlimited task history",
                  "Priority support",
                  "Calendar integration",
                  "Productivity analytics",
                ],
                buttonText: "Get Started",
                buttonVariant: "default",
                popular: true,
              },
              {
                title: "Team",
                price: "$19.99",
                period: "/month",
                description: "For teams that want to collaborate efficiently.",
                features: [
                  "Everything in Pro",
                  "Team collaboration",
                  "Role-based permissions",
                  "Team analytics",
                  "Admin dashboard",
                  "Priority support",
                ],
                buttonText: "Contact Sales",
                buttonVariant: "outline",
                popular: false,
              },
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={index === 1 ? "-mt-4 md:mt-0" : ""}
              >
                <Card
                  className={`backdrop-blur-lg ${plan.popular ? "bg-primary/5 border-primary/20 shadow-lg" : "bg-white/10 dark:bg-gray-950/30 border-muted/40"} h-full flex flex-col`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                      <span className="inline-block bg-primary px-3 py-1 text-xs font-medium text-primary-foreground rounded-full">
                        Popular
                      </span>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{plan.title}</CardTitle>
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      {plan.period && <span className="text-muted-foreground ml-1">{plan.period}</span>}
                    </div>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="grid gap-2 py-4">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      asChild
                      variant={plan.buttonVariant as "default" | "outline"}
                      className={`w-full ${plan.popular ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}`}
                    >
                      <Link href="/sign-up">{plan.buttonText}</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-primary/20 via-background to-secondary/20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Transform Your Productivity?
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join thousands of users who have revolutionized their task management with TaskAI.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
                <Button asChild size="lg" className="rounded-full">
                  <Link href="/sign-up">
                    Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full">
                  <Link href="/contact">Contact Sales</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

