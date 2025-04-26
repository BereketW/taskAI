/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import { Pacifico } from "next/font/google";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MarketingHeader } from "@/components/marketing/header";
import { MarketingFooter } from "@/components/marketing/footer";
import { MouseTrail } from "@/components/ui/mouse-trail";
import { ScrollSection } from "@/components/ui/scroll-section";
import { ParallaxBackground } from "@/components/ui/parallax-background";

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
});

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border-2 border-white/[0.15]",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
          )}
        />
      </motion.div>
    </motion.div>
  );
}

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [bubbles] = useState(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: Math.random() * 200 + 100,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }))
  );

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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
    <div className={`relative min-h-screen bg-[#030303] ${pacifico.variable}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />
      <MouseTrail />
      <ParallaxBackground />

      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="from-indigo-500/[0.15]"
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
        />

        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-rose-500/[0.15]"
          className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
        />

        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-violet-500/[0.15]"
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
        />

        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient="from-amber-500/[0.15]"
          className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
        />

        <ElegantShape
          delay={0.7}
          width={150}
          height={40}
          rotate={-25}
          gradient="from-cyan-500/[0.15]"
          className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
        />
      </div>

      {/* Rest of the landing page content */}
      <div className="relative z-10">
        <MarketingHeader />
        <main className="flex-1">
          {/* Wrap each section with ScrollSection */}
          <ScrollSection>
            {/* Hero Section */}
            <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden">
              <div className="absolute inset-0 z-0" />
              <div className="container px-4 md:px-6 relative z-10 rounded-lg">
                <motion.div
                  className="flex flex-col items-center space-y-4 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-4">
                    <span className="text-sm text-white/60 tracking-wide">
                      Introducing TaskAI
                    </span>
                  </div>
                  <motion.h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl mb-6">
                    <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                      AI-Powered
                    </span>
                    <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300 font-pacifico">
                      Task Management
                    </span>
                  </motion.h1>
                  <motion.p className="max-w-[700px] text-white/40 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mb-8">
                    Boost your productivity with intelligent task management.
                    Let AI optimize your schedule, prioritize tasks, and provide
                    personalized insights.
                  </motion.p>
                  <motion.div className="flex flex-wrap items-center justify-center gap-4">
                    <Button
                      asChild
                      size="lg"
                      className="rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white"
                    >
                      <Link href="/sign-up">
                        Get Started <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="rounded-full border-white/10 text-white/70 hover:text-white hover:bg-white/5"
                    >
                      <Link href="/sign-in">Sign In</Link>
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </section>
          </ScrollSection>

          <ScrollSection>
            {/* Features Section */}
            <section className="w-full py-12 md:py-24 lg:py-32 bg-[#050505]">
              <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                  <div className="inline-block rounded-full bg-white/[0.03] border border-white/[0.08] px-3 py-1 text-sm text-white/60">
                    Features
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                    Smart Features for Smart People
                  </h2>
                  <p className="max-w-[700px] text-white/40 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    TaskAI combines powerful task management with cutting-edge
                    AI to help you work smarter, not harder.
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
                      description:
                        "Get intelligent suggestions for tasks based on your habits and patterns.",
                      icon: Sparkles,
                      color: "bg-indigo-500/10",
                      textColor: "text-indigo-300",
                    },
                    {
                      title: "Smart Prioritization",
                      description:
                        "AI automatically ranks your tasks by urgency and importance.",
                      icon: CheckCircle,
                      color: "bg-rose-500/10",
                      textColor: "text-rose-300",
                    },
                    {
                      title: "Intelligent Deadlines",
                      description:
                        "AI suggests the optimal time to complete tasks based on your schedule.",
                      icon: Sparkles,
                      color: "bg-violet-500/10",
                      textColor: "text-violet-300",
                    },
                    {
                      title: "Productivity Insights",
                      description:
                        "Get personalized insights about your productivity patterns.",
                      icon: CheckCircle,
                      color: "bg-amber-500/10",
                      textColor: "text-amber-300",
                    },
                    {
                      title: "Team Collaboration",
                      description:
                        "Assign tasks to team members and track progress together.",
                      icon: Sparkles,
                      color: "bg-cyan-500/10",
                      textColor: "text-cyan-300",
                    },
                    {
                      title: "Cross-Platform Support",
                      description:
                        "Access your tasks from anywhere, even offline.",
                      icon: CheckCircle,
                      color: "bg-emerald-500/10",
                      textColor: "text-emerald-300",
                    },
                  ].map((feature, index) => (
                    <motion.div key={index} variants={item}>
                      <Card className="backdrop-blur-lg bg-white/[0.03] border border-white/[0.08] shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-1">
                        <CardHeader>
                          <div
                            className={`w-12 h-12 rounded-full ${feature.color} flex items-center justify-center mb-4`}
                          >
                            <feature.icon
                              className={`h-6 w-6 ${feature.textColor}`}
                            />
                          </div>
                          <CardTitle className="text-white">
                            {feature.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-white/40">{feature.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </section>
          </ScrollSection>

          <ScrollSection>
            {/* App Preview Section with decorative elements */}
            <section className="w-full py-12 md:py-24 lg:py-32 relative bg-[#030303]">
              <div className="container px-4 md:px-6">
                <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                  <motion.div
                    className="flex flex-col justify-center space-y-4"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="inline-block rounded-full bg-white/[0.03] border border-white/[0.08] px-3 py-1 text-sm text-white/60 w-fit">
                      Powerful Dashboard
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                      Experience the Future of Task Management
                    </h2>
                    <p className="max-w-[600px] text-white/40 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                      Our intuitive dashboard gives you a complete overview of
                      your tasks, priorities, and productivity insights. Let AI
                      handle the optimization while you focus on what matters.
                    </p>
                    <ul className="grid gap-2 py-4">
                      {[
                        "Intuitive drag-and-drop interface",
                        "Real-time AI suggestions",
                        "Customizable views and filters",
                        "Detailed productivity analytics",
                      ].map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-2 text-white/70"
                        >
                          <CheckCircle className="h-4 w-4 text-indigo-300" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div>
                      <Button
                        asChild
                        className="rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white"
                      >
                        <Link href="/sign-up">
                          Try It Free <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </motion.div>

                  {/* Dashboard preview with decorations */}
                  <motion.div
                    className="mx-auto overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] shadow-xl relative"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <Image
                      src="/assets/dashboard.png"
                      width={800}
                      height={600}
                      alt="TaskAI Dashboard Preview"
                      className="relative z-10 object-cover w-full h-full"
                    />
                  </motion.div>
                </div>
              </div>
            </section>
          </ScrollSection>

          <ScrollSection>
            {/* Testimonials Section */}
            <section className="w-full py-12 md:py-24 lg:py-32 bg-[#050505]">
              <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                  <div className="inline-block rounded-full bg-white/[0.03] border border-white/[0.08] px-3 py-1 text-sm text-white/60">
                    Testimonials
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                    Loved by Productive People
                  </h2>
                  <p className="max-w-[700px] text-white/40 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    See what our users have to say about how TaskAI has
                    transformed their productivity.
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
                      quote:
                        "The AI prioritization feature ensures I'm always working on what matters most. Game changer!",
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
                      <Card className="backdrop-blur-lg bg-white/[0.03] border border-white/[0.08] h-full">
                        <CardContent className="p-6">
                          <div className="flex flex-col gap-4 h-full">
                            <div className="flex-1">
                              <p className="italic text-white/60">
                                &quot;{testimonial.quote}&quot;
                              </p>
                            </div>
                            <div>
                              <p className="font-semibold text-white">
                                {testimonial.author}
                              </p>
                              <p className="text-sm text-white/40">
                                {testimonial.role}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </section>
          </ScrollSection>

          <ScrollSection>
            {/* Pricing Section */}
            <section className="w-full py-12 md:py-24 lg:py-32 bg-[#030303]">
              <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                  <div className="inline-block rounded-full bg-white/[0.03] border border-white/[0.08] px-3 py-1 text-sm text-white/60">
                    Pricing
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                    Simple, Transparent Pricing
                  </h2>
                  <p className="max-w-[700px] text-white/40 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Choose the plan that works best for you or your team.
                  </p>
                </div>
                <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 mt-12">
                  {[
                    {
                      title: "Free",
                      price: "$0",
                      description:
                        "Perfect for individuals just getting started.",
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
                      description:
                        "Ideal for professionals seeking AI-powered productivity.",
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
                      description:
                        "For teams that want to collaborate efficiently.",
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
                        className={`backdrop-blur-lg ${
                          plan.popular
                            ? "bg-indigo-500/[0.05] border-indigo-500/20 shadow-lg"
                            : "bg-white/[0.03] border border-white/[0.08]"
                        } h-full flex flex-col`}
                      >
                        {plan.popular && (
                          <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                            <span className="inline-block bg-indigo-500/20 px-3 py-1 text-xs font-medium text-indigo-300 rounded-full">
                              Popular
                            </span>
                          </div>
                        )}
                        <CardHeader>
                          <CardTitle className="text-white">
                            {plan.title}
                          </CardTitle>
                          <div className="flex items-baseline">
                            <span className="text-3xl font-bold text-white">
                              {plan.price}
                            </span>
                            {plan.period && (
                              <span className="text-white/40 ml-1">
                                {plan.period}
                              </span>
                            )}
                          </div>
                          <CardDescription className="text-white/60">
                            {plan.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                          <ul className="grid gap-2 py-4">
                            {plan.features.map((feature, featureIndex) => (
                              <li
                                key={featureIndex}
                                className="flex items-center gap-2 text-white/70"
                              >
                                <CheckCircle className="h-4 w-4 text-indigo-300" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                        <CardFooter>
                          <Button
                            asChild
                            variant={
                              plan.buttonVariant as "default" | "outline"
                            }
                            className={`w-full rounded-full ${
                              plan.popular
                                ? "bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white"
                                : "border-white/10 text-white/70 hover:text-white hover:bg-white/5"
                            }`}
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
          </ScrollSection>

          <ScrollSection>
            {/* CTA Section */}
            <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-indigo-500/[0.05] via-[#030303] to-rose-500/[0.05]">
              <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                  <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                      Ready to Transform Your Productivity?
                    </h2>
                    <p className="max-w-[700px] text-white/40 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                      Join thousands of users who have revolutionized their task
                      management with TaskAI.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
                      <Button
                        asChild
                        size="lg"
                        className="rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white"
                      >
                        <Link href="/sign-up">
                          Get Started Free{" "}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="rounded-full border-white/10 text-white/70 hover:text-white hover:bg-white/5"
                      >
                        <Link href="/contact">Contact Sales</Link>
                      </Button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>
          </ScrollSection>
        </main>
        <MarketingFooter />
      </div>
    </div>
  );
}
