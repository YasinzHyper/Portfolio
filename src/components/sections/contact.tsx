"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { BackgroundBeams } from "@/components/ui/background-beams";
import {
  Mail,
  Copy,
  CheckCircle2,
  CalendarDays,
  Github,
  Linkedin,
  FileText,
  Globe,
  Phone,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// -----------------------------
// Config — replace with your links
// -----------------------------
const EMAIL = "myasinzuhayr@gmail.com"; // TODO: replace
const PHONE = "+91 86607 98709"; // optional
const RESUME_URL = "https://drive.google.com/drive/folders/10MPwn8bCUmV8gc3X9Bymyd6Wk1SQIlsj?usp=sharing";  // points to your hosted resume
const CAL_LINK = "mailto:" + EMAIL + "?subject=Call%20request&body=Hi%20Yasin%2C%20I'd%20like%20to%20schedule%20a%20call."; // replace with Cal.com/Calendly when ready

// -----------------------------
// Contact Section
// -----------------------------
export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [tz, setTz] = useState<string>("UTC");
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    setTz(Intl.DateTimeFormat().resolvedOptions().timeZone);
    // Set initial time and update every minute
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  // vCard link
  const vcardHref = useMemo(() => {
    const v = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      "N:Yasin;Mohammed;;;",
      "FN:Mohammed Yasin Zuhayr",
      `EMAIL;TYPE=INTERNET:${EMAIL}`,
      PHONE ? `TEL;TYPE=CELL:${PHONE}` : "",
      "ORG:Software Engineer",
      "TITLE:Developer",
      "URL:https://yasin.dev",
      "END:VCARD",
    ]
      .filter(Boolean)
      .join("\n");
    return "data:text/vcard;charset=utf-8," + encodeURIComponent(v);
  }, []);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  // Smart mailto links for different purposes
  const getSmartMailto = (reason: string) => {
    const subjects = {
      opportunity: "Job Opportunity Discussion",
      freelance: "Freelance Project Inquiry",
      mentorship: "Mentorship Request",
      collaboration: "Collaboration Proposal",
      general: "Hello from your portfolio"
    };
    
    const templates = {
      opportunity: "Hi Yasin,\n\nI'm reaching out regarding a potential opportunity. Here are the details:\n\n• Company: [Your Company]\n• Role: [Position Title]\n• Location: [Location/Remote]\n• Timeline: [When you'd like to start]\n\nI'd love to discuss this further.\n\nBest regards,\n[Your Name]",
      freelance: "Hi Yasin,\n\nI have a project that might be a great fit for your skills:\n\n• Project: [Brief description]\n• Tech Stack: [Technologies needed]\n• Budget: [Your budget range]\n• Timeline: [Project timeline]\n\nWould you be interested in discussing this?\n\nBest,\n[Your Name]",
      mentorship: "Hi Yasin,\n\nI'm interested in learning from your experience in [specific area]. I'm currently [your background/level] and would love guidance on:\n\n• [Specific topic 1]\n• [Specific topic 2]\n• [Career advice/technical skills]\n\nWould you be open to a brief conversation?\n\nThank you,\n[Your Name]",
      collaboration: "Hi Yasin,\n\nI have an idea for a collaboration:\n\n• Project: [Brief description]\n• Your role: [What you'd contribute]\n• My role: [What I'd contribute]\n• Goals: [What we aim to achieve]\n\nInterested in exploring this together?\n\nBest,\n[Your Name]",
      general: "Hi Yasin,\n\nI came across your portfolio and wanted to reach out.\n\n[Your message here]\n\nLooking forward to hearing from you!\n\n[Your Name]"
    };

    const subject = subjects[reason as keyof typeof subjects] || subjects.general;
    const body = templates[reason as keyof typeof templates] || templates.general;
    
    return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" className={cn("relative isolate overflow-hidden py-16 md:py-20", "bg-[#070910]")}>
      <BackgroundBeams className="absolute inset-0 -z-20 opacity-20" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(90%_70%_at_50%_-10%,rgba(255,255,255,0.06),transparent_60%)]" />

      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.45 }} className="mx-auto mb-12 max-w-3xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-3 py-1 text-xs text-white/70 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" /> Let’s talk
          </div>
          <h2 className="text-balance bg-gradient-to-br from-white via-white to-white/70 bg-clip-text text-3xl font-semibold leading-tight text-transparent sm:text-4xl">
            Start a conversation
          </h2>
          <p className="mt-2 text-sm text-white/70">Fast replies. Clear outcomes. Prefer email over forms? Use the buttons below.</p>
        </motion.div>

        {/* Grid */}
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          {/* Left: Smart contact options with tabs */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }} className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white/90 mb-2">Choose your preferred way to connect</h3>
              <p className="text-sm text-white/70">Each option opens your email client with a pre-filled template.</p>
            </div>
            
            <Tabs defaultValue="work" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-white/[0.05] border border-white/10">
                <TabsTrigger value="work" className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/70">Work</TabsTrigger>
                <TabsTrigger value="learn" className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/70">Learn</TabsTrigger>
                <TabsTrigger value="social" className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/70">Social</TabsTrigger>
              </TabsList>
              
              <TabsContent value="work" className="mt-6 space-y-4">
                {/* Job Opportunity */}
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-all hover:bg-white/[0.06]">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-white/90">Job Opportunity</h4>
                      <p className="text-sm text-white/70 mt-1">Full-time roles, contract positions, or consulting</p>
                    </div>
                    <Button asChild className="bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 text-white hover:from-indigo-600 hover:via-purple-600 hover:to-indigo-700">
                      <a href={getSmartMailto('opportunity')}>
                        <Mail className="mr-2 h-4 w-4"/> Email
                      </a>
                    </Button>
                  </div>
                </div>

                {/* Freelance Project */}
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-all hover:bg-white/[0.06]">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-white/90">Freelance Project</h4>
                      <p className="text-sm text-white/70 mt-1">Custom development, MVP builds, or technical consulting</p>
                    </div>
                    <Button asChild className="bg-gradient-to-r from-fuchsia-500 via-pink-500 to-fuchsia-600 text-white hover:from-fuchsia-600 hover:via-pink-600 hover:to-fuchsia-700">
                      <a href={getSmartMailto('freelance')}>
                        <Mail className="mr-2 h-4 w-4"/> Email
                      </a>
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="learn" className="mt-6 space-y-4">
                {/* Mentorship */}
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-all hover:bg-white/[0.06]">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-white/90">Mentorship</h4>
                      <p className="text-sm text-white/70 mt-1">Career guidance, code reviews, or learning path advice</p>
                    </div>
                    <Button asChild className="bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-600 text-white hover:from-teal-600 hover:via-cyan-600 hover:to-teal-700">
                      <a href={getSmartMailto('mentorship')}>
                        <Mail className="mr-2 h-4 w-4"/> Email
                      </a>
                    </Button>
                  </div>
                </div>

                {/* Collaboration */}
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-all hover:bg-white/[0.06]">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-white/90">Collaboration</h4>
                      <p className="text-sm text-white/70 mt-1">Open source projects, partnerships, or joint ventures</p>
                    </div>
                    <Button asChild className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white hover:from-amber-600 hover:via-orange-600 hover:to-amber-700">
                      <a href={getSmartMailto('collaboration')}>
                        <Mail className="mr-2 h-4 w-4"/> Email
                      </a>
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="social" className="mt-6 space-y-4">
                {/* General */}
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-all hover:bg-white/[0.06]">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-white/90">Just Say Hi</h4>
                      <p className="text-sm text-white/70 mt-1">General inquiries, feedback, or casual conversation</p>
                    </div>
                    <Button asChild variant="outline" className="border-white/20 bg-white/[0.04] text-white/90 hover:bg-white/10">
                      <a href={getSmartMailto('general')}>
                        <Mail className="mr-2 h-4 w-4"/> Email
                      </a>
                    </Button>
                  </div>
                </div>

                {/* Direct contact card */}
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Mail className="h-4 w-4 text-white/80" />
                    <code className="select-all rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-sm text-white/90">{EMAIL}</code>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button size="icon" variant="ghost" onClick={onCopy} className="h-8 w-8 border border-white/10 bg-white/[0.04] text-white/80 hover:bg-white/10">
                            {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className="border-white/10 bg-black/80 text-white">Copy</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  {PHONE ? (
                    <div className="flex items-center gap-2 text-white/80 text-sm">
                      <Phone className="h-4 w-4"/>
                      <a href={`tel:${PHONE}`} className="hover:underline">{PHONE}</a>
                    </div>
                  ) : null}
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-6 p-3 rounded-lg bg-white/[0.03] border border-white/10">
              <p className="text-xs text-white/60 flex items-center gap-2">
                <Sparkles className="h-3 w-3"/> 
                Pro tip: These templates are just starting points. Feel free to customize the message to fit your specific needs.
              </p>
            </div>
          </motion.div>

          {/* Right: quick actions + extras */}
          <motion.aside initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }} className="space-y-6">
            {/* Quick Actions */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur">
              <p className="text-sm text-white/70 mb-4">Quick actions</p>
              <div className="flex flex-wrap gap-2">
                <Button asChild variant="ghost" className="border border-white/10 bg-white/[0.04] text-white/90 hover:bg-white/10">
                  <a href={RESUME_URL} target="_blank" rel="noreferrer">
                    <FileText className="mr-2 h-4 w-4"/>Resume
                  </a>
                </Button>
                <Button asChild variant="ghost" className="border border-white/10 bg-white/[0.04] text-white/90 hover:bg-white/10">
                  <a href={CAL_LINK} target="_blank" rel="noreferrer">
                    <CalendarDays className="mr-2 h-4 w-4"/>Schedule
                  </a>
                </Button>
                <Button asChild variant="ghost" className="border border-white/10 bg-white/[0.04] text-white/90 hover:bg-white/10">
                  <a href={vcardHref} download="yasin.vcf">
                    <FileText className="mr-2 h-4 w-4"/>vCard
                  </a>
                </Button>
              </div>
              <p className="mt-4 text-xs text-white/60">
                {currentTime && (
                  <>
                    Local time: {currentTime} ({tz}). 
                    <span className="text-white"> Response time: &lt; 24h</span>
                  </>
                )}
                {!currentTime && (
                  <span className="text-white"> Response time: &lt; 24h</span>
                )}
              </p>
            </div>

            {/* Socials */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur">
              <p className="mb-3 text-sm text-white/70">Find me elsewhere</p>
              <div className="grid grid-cols-2 gap-3">
                <Button asChild variant="ghost" className="justify-start border border-white/10 bg-white/[0.04] text-white/90 hover:bg-white/10">
                  <a href="https://github.com/YasinzHyper" target="_blank" rel="noreferrer">
                    <Github className="mr-2 h-4 w-4"/>GitHub
                  </a>
                </Button>
                <Button asChild variant="ghost" className="justify-start border border-white/10 bg-white/[0.04] text-white/90 hover:bg-white/10">
                  <a href="https://www.linkedin.com/in/mohammed-yasin-zuhayr-249158157/" target="_blank" rel="noreferrer">
                    <Linkedin className="mr-2 h-4 w-4"/>LinkedIn
                  </a>
                </Button>
                <Button asChild variant="ghost" className="justify-start border border-white/10 bg-white/[0.04] text-white/90 hover:bg-white/10 col-span-2">
                  <a href="#" target="_blank" rel="noreferrer">
                    <Globe className="mr-2 h-4 w-4"/>Portfolio
                  </a>
                </Button>
              </div>
            </div>

            {/* Pitch card */}
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.03] p-6">
              <h3 className="text-base font-semibold text-white/90">Why me in one minute</h3>
              <ul className="mt-3 space-y-2 text-sm text-white/80">
                <li className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-indigo-400"/><strong>End-to-End Builder:</strong> Production work with Next.js, FastAPI, and Flutter.</li>
                <li className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-fuchsia-400"/><strong>AI + GenAI Expertise:</strong> Built evaluation loops and safety guardrails.</li>
                <li className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-teal-400"/><strong>Proven Delivery:</strong> Shipped real-time production apps with active users.</li>
              </ul>
              <p className="mt-3 text-xs text-white/60">Want a tailored intro? Use the specific contact templates above to mention your needs.</p>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
