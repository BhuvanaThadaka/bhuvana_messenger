
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Check, 
  Star, 
  DollarSign, 
  Users, 
  BookOpen, 
  MessageSquare, 
  Calendar, 
  LayoutGrid 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Features by plan type
const planFeatures = {
  free: [
    "5 active cases",
    "1 user account",
    "Basic document management",
    "Email support",
    "Client portal"
  ],
  basic: [
    "25 active cases",
    "5 user accounts",
    "Advanced document management",
    "Email & phone support",
    "Client portal with messaging",
    "Calendar integration",
    "Basic reporting"
  ],
  professional: [
    "100 active cases",
    "15 user accounts",
    "Advanced document management",
    "Priority support",
    "Client portal with messaging",
    "Calendar & email integration",
    "Advanced reporting",
    "Custom branding",
    "API access"
  ],
  enterprise: [
    "Unlimited active cases",
    "Unlimited user accounts",
    "Advanced document management",
    "24/7 dedicated support",
    "Client portal with messaging",
    "Calendar & email integration",
    "Advanced reporting & analytics",
    "Custom branding",
    "API access",
    "Dedicated account manager",
    "Custom feature development",
    "On-premise deployment option"
  ]
};

// Testimonials
const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Managing Partner, Johnson & Associates",
    content: "This platform has completely transformed how we manage our cases. The intuitive interface and powerful features have saved us countless hours of administrative work.",
    avatar: "/placeholder.svg"
  },
  {
    name: "Michael Chen",
    role: "Legal Director, Pacific Law Group",
    content: "The client portal feature has greatly improved our client communication. Our clients appreciate the transparency and ease of accessing case information.",
    avatar: "/placeholder.svg"
  },
  {
    name: "Priya Patel",
    role: "Senior Partner, Patel & Mehta",
    content: "After trying several legal management systems, this is by far the most comprehensive solution. The document management alone is worth the investment.",
    avatar: "/placeholder.svg"
  }
];

// Feature highlights
const featureHighlights = [
  {
    title: "Case Management",
    description: "Efficiently organize and track all your legal cases in one place with customizable workflows.",
    icon: <BookOpen className="h-10 w-10 text-primary" />
  },
  {
    title: "Client Portal",
    description: "Provide clients with secure access to case information, documents, and communication.",
    icon: <Users className="h-10 w-10 text-primary" />
  },
  {
    title: "Document Management",
    description: "Centralize all case documents with version control, secure sharing, and template library.",
    icon: <LayoutGrid className="h-10 w-10 text-primary" />
  },
  {
    title: "Calendar Integration",
    description: "Sync court dates, meetings, and deadlines with your favorite calendar applications.",
    icon: <Calendar className="h-10 w-10 text-primary" />
  },
  {
    title: "Secure Messaging",
    description: "Communicate with clients and team members through encrypted in-app messaging.",
    icon: <MessageSquare className="h-10 w-10 text-primary" />
  }
];

const Branding = () => {
  const navigate = useNavigate();
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-6 lg:px-8">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,#e2ebff,transparent)]"></div>
        <div className="relative mx-auto max-w-7xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              Legal Practice Management Software
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Streamline Your</span>
              <span className="block text-primary">Legal Practice</span>
            </h1>
            <p className="mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
              A comprehensive solution designed for law firms and legal professionals to manage cases, clients, and operations with ease.
            </p>
            <div className="mx-auto mt-10 flex max-w-md justify-center gap-x-6">
              <Button size="lg" onClick={() => navigate("/login")}>
                Get Started
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/login")}>
                Request Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-16 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Powerful Features for Legal Professionals
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500">
              Everything you need to manage your legal practice efficiently
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featureHighlights.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full transition-all hover:shadow-lg">
                  <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                    {feature.icon}
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Flexible Plans for Every Practice
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500">
              Choose the plan that works best for your legal practice
            </p>
          </div>

          <div className="mt-8 flex justify-center">
            <Tabs 
              defaultValue="monthly" 
              className="w-[400px]"
              onValueChange={(value) => setBillingPeriod(value as "monthly" | "annual")}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="annual">Annual (20% off)</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-4">
            {/* Free Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full transition-all hover:shadow-lg">
                <CardHeader>
                  <CardTitle>Free</CardTitle>
                  <CardDescription>For individuals and small startups</CardDescription>
                  <div className="mt-4 text-4xl font-bold">
                    ₹0<span className="text-base font-normal text-gray-500">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {planFeatures.free.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="mr-2 h-5 w-5 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="outline">
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            {/* Basic Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full transition-all hover:shadow-lg">
                <CardHeader>
                  <CardTitle>Basic</CardTitle>
                  <CardDescription>For small law firms</CardDescription>
                  <div className="mt-4 text-4xl font-bold">
                    {billingPeriod === "monthly" ? (
                      <>₹2,499<span className="text-base font-normal text-gray-500">/month</span></>
                    ) : (
                      <>₹23,990<span className="text-base font-normal text-gray-500">/year</span></>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {planFeatures.basic.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="mr-2 h-5 w-5 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Choose Basic</Button>
                </CardFooter>
              </Card>
            </motion.div>

            {/* Professional Plan */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -top-5 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-center text-sm font-medium text-white">
                Most Popular
              </div>
              <Card className="h-full border-primary transition-all hover:shadow-lg">
                <CardHeader>
                  <CardTitle>Professional</CardTitle>
                  <CardDescription>For growing law practices</CardDescription>
                  <div className="mt-4 text-4xl font-bold">
                    {billingPeriod === "monthly" ? (
                      <>₹4,999<span className="text-base font-normal text-gray-500">/month</span></>
                    ) : (
                      <>₹47,990<span className="text-base font-normal text-gray-500">/year</span></>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {planFeatures.professional.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="mr-2 h-5 w-5 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Choose Professional</Button>
                </CardFooter>
              </Card>
            </motion.div>

            {/* Enterprise Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="h-full transition-all hover:shadow-lg">
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                  <CardDescription>For large law firms</CardDescription>
                  <div className="mt-4 text-4xl font-bold">
                    {billingPeriod === "monthly" ? (
                      <>₹9,999<span className="text-base font-normal text-gray-500">/month</span></>
                    ) : (
                      <>₹95,990<span className="text-base font-normal text-gray-500">/year</span></>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {planFeatures.enterprise.slice(0, 6).map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="mr-2 h-5 w-5 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                    <li className="text-sm text-gray-500">
                      + {planFeatures.enterprise.length - 6} more features
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="secondary">
                    Contact Sales
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-16 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Trusted by Legal Professionals
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500">
              See what our customers have to say about our platform
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 overflow-hidden rounded-full">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="mt-4 text-gray-700">"{testimonial.content}"</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-2xl bg-primary px-6 py-16 shadow-xl lg:px-16">
            <div className="relative">
              <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    Ready to transform your legal practice?
                  </h2>
                  <p className="mt-6 max-w-xl text-lg text-primary-foreground/90">
                    Join thousands of legal professionals who have streamlined their practice with our platform. Get started today.
                  </p>
                  <div className="mt-8 flex">
                    <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-gray-100">
                      Start Your Free Trial
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Branding;
