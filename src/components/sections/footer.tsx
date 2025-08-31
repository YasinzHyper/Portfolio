"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { LinkedinIcon, GithubIcon, TwitterIcon, MailIcon, ArrowUpIcon } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: LinkedinIcon,
      label: "LinkedIn",
      href: "https://linkedin.com/in/yourprofile"
    },
    {
      icon: GithubIcon,
      label: "GitHub",
      href: "https://github.com/yourusername"
    },
    {
      icon: TwitterIcon,
      label: "Twitter",
      href: "https://twitter.com/yourhandle"
    },
    {
      icon: MailIcon,
      label: "Email",
      href: "mailto:hello@yourname.com"
    }
  ];

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <h3 className="text-2xl font-bold mb-4">Your Name</h3>
              <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
                A passionate full-stack developer creating beautiful and functional digital experiences. 
                Always learning, always building, always improving.
              </p>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <social.icon className="w-4 h-4" />
                    <span className="sr-only">{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold mb-4">Get In Touch</h4>
              <div className="space-y-2 text-muted-foreground">
                <p>📧 hello@yourname.com</p>
                <p>📱 +1 (555) 123-4567</p>
                <p>📍 San Francisco, CA</p>
              </div>
              <div className="mt-6">
                <Button size="sm" className="w-full">
                  <MailIcon className="w-4 h-4 mr-2" />
                  Say Hello
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center md:text-left"
            >
              <p className="text-muted-foreground text-sm">
                © {currentYear} Your Name. All rights reserved.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex items-center gap-6"
            >
              <div className="flex gap-4 text-sm text-muted-foreground">
                <a href="#" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-foreground transition-colors">
                  Terms of Service
                </a>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={scrollToTop}
                className="group"
              >
                <ArrowUpIcon className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                <span className="sr-only">Back to top</span>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Hidden Development Credit */}
        <div className="text-center pb-4">
          <p className="text-xs text-muted-foreground/50">
            Designed & built with ❤️ using Next.js, Tailwind CSS, and Aceternity UI
          </p>
        </div>
      </div>
    </footer>
  );
}
