/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  Flame, 
  Droplet, 
  Thermometer, 
  ShowerHead, 
  Snowflake, 
  House, 
  Phone, 
  Star, 
  Check, 
  X, 
  Facebook, 
  Instagram, 
  MapPin, 
  Menu,
  Clock
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "motion/react";

// --- Components ---

const Badge = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <span className={`inline-flex items-center px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary font-mono text-xs uppercase tracking-wider ${className}`}>
    {children}
  </span>
);

const Button = ({ 
  children, 
  variant = "primary", 
  className = "", 
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" }) => {
  const baseClasses = "relative px-8 py-4 font-bebas text-xl tracking-wide transition-all overflow-hidden group active:scale-95";
  const variants = {
    primary: "bg-primary text-black hover:bg-white hover:text-black",
    ghost: "bg-transparent border-2 border-white text-white hover:bg-white hover:text-black"
  };

  return (
    <button className={`${baseClasses} ${variants[variant]} ${className}`} {...props}>
      <motion.div 
        className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
      />
      <span className="relative z-10">{children}</span>
    </button>
  );
};

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-primary font-mono font-bold tracking-[0.2em] text-sm uppercase mb-4">
    {children}
  </p>
);

const Counter = ({ value, duration = 1.5 }: { value: string, duration?: number }) => {
  const [count, setCount] = useState(0);
  const numericValue = parseInt(value.replace(/[^0-9]/g, ""));
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    let start = 0;
    const end = numericValue;
    const stepTime = Math.abs(Math.floor(duration * 1000 / end));
    
    const timer = setInterval(() => {
      start += Math.ceil(end / 60); // Roughly 60fps
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [numericValue, duration]);

  return <>{count.toLocaleString()}{suffix}</>;
};

// --- Sections ---

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 30, scale: 0.98 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    initial: {},
    whileInView: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="min-h-screen bg-bg-dark font-dm selection:bg-primary selection:text-black scroll-smooth">
      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "h-20 bg-bg-dark/80 backdrop-blur-xl border-b border-border-dark" : "h-24 bg-transparent"}`}>
        <div className="container mx-auto px-6 h-full flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group">
            <Flame className="text-primary w-8 h-8 group-hover:scale-110 transition-transform" />
            <span className="text-3xl text-primary font-black uppercase tracking-tighter italic font-narrow">FLOWPRO</span>
          </a>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold uppercase tracking-widest">
            {["Services", "About", "Reviews", "Pricing"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-text-muted hover:text-primary transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <div className="hidden sm:block text-right">
              <p className="text-[10px] text-text-muted font-mono tracking-widest">(555) 200-4400</p>
              <p className="text-xs font-bold uppercase tracking-tighter font-narrow italic text-primary">AVAILABLE 24/7</p>
            </div>
            <button className="bg-primary text-black px-6 py-2.5 font-bold uppercase text-sm skew-btn group hover:bg-white transition-colors">
              <span className="skew-text italic">Get Free Quote</span>
            </button>
            <button className="lg:hidden text-text-primary" onClick={() => setMobileMenuOpen(true)}>
              <Menu className="w-8 h-8" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 z-[100] bg-bg-dark/95 backdrop-blur-2xl p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="font-narrow font-black italic text-4xl text-primary">FLOWPRO</span>
              <button onClick={() => setMobileMenuOpen(false)} className="text-text-muted hover:text-white">
                <X className="w-10 h-10" />
              </button>
            </div>
            <nav className="flex flex-col gap-8">
              {["Services", "About", "Reviews", "Pricing"].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)} 
                   className="font-narrow text-6xl text-text-primary hover:text-primary transition-colors underline decoration-primary decoration-4 underline-offset-8 italic uppercase">
                  {item}
                </a>
              ))}
            </nav>
            <div className="mt-auto space-y-6 pt-12 border-t border-border-dark">
              <a href="tel:5552004400" className="flex items-center gap-4 text-2xl font-mono text-primary font-bold">
                <Phone className="fill-primary" /> (555) 200-4400
              </a>
              <button className="w-full bg-primary text-black py-6 font-black uppercase text-2xl skew-btn">
                <span className="skew-text italic tracking-tighter">GET FREE QUOTE</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-24">
        {/* Section 1: Hero */}
        <section id="hero" className="container mx-auto px-6 py-12 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <motion.div 
              className="lg:col-span-8 bg-[#1C1C1C] border border-border-dark rounded-3xl p-12 lg:p-20 relative overflow-hidden group shadow-2xl"
              variants={fadeIn}
              initial="initial"
              whileInView="whileInView"
            >
              <div className="absolute top-0 right-0 w-2/3 h-full opacity-10 pointer-events-none text-primary">
                 <svg className="w-full h-full" viewBox="0 0 200 200">
                   <path fill="currentColor" d="M40,-62.7C52.2,-54.5,62.5,-44,69.6,-31.6C76.7,-19.2,80.6,-4.8,78.1,8.7C75.5,22.2,66.6,34.8,56.1,45.1C45.6,55.3,33.5,63.2,19.9,68.4C6.3,73.5,-8.8,75.9,-23.1,72.4C-37.5,68.8,-51.1,59.3,-61.1,47C-71.1,34.7,-77.5,19.6,-77.9,4.4C-78.4,-10.8,-72.9,-26.2,-63.3,-38.7C-53.7,-51.2,-40,-60.8,-26.2,-67.9C-12.4,-75,1.5,-79.6,14.6,-77.4C27.8,-75.2,40,-62.7Z" transform="translate(100 100)" />
                 </svg>
              </div>
              <div className="inline-block px-4 py-1.5 border border-primary text-primary font-mono text-xs uppercase tracking-widest mb-10 w-fit relative z-10 font-bold">
                🔥 #1 Rated HVAC & Plumbing in Los Angeles
              </div>
              <h1 className="text-6xl lg:text-[10rem] font-black leading-[0.8] uppercase mb-8 italic tracking-tighter font-narrow relative z-10">
                YOUR HOME.<br/><span className="text-primary group-hover:text-white transition-colors duration-500">FIXED FAST.</span><br/>DONE RIGHT.
              </h1>
              <p className="text-text-muted text-xl lg:text-2xl max-w-xl mb-12 relative z-10 leading-relaxed">
                From clogged drains to full AC installs — FlowPro shows up same day, no excuses. Built like a truck, trusted like family.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 relative z-10">
                <button className="bg-primary text-black px-10 py-5 font-black uppercase text-xl hover:bg-white transition-all transform hover:-translate-y-1">BOOK NOW</button>
                <button className="border-2 border-white/10 px-10 py-5 font-black uppercase text-xl hover:bg-white/5 transition-all text-white flex items-center justify-center gap-3">
                  <Phone className="w-6 h-6 fill-white" /> (555) 200-4400
                </button>
              </div>
            </motion.div>

            <div className="lg:col-span-4 flex flex-col gap-8">
              {/* Response Time Card */}
              <motion.div 
                className="flex-1 bg-secondary border border-border-dark p-8 rounded-3xl flex flex-col items-center justify-center text-center group hover:border-primary transition-colors"
                variants={fadeIn}
                initial="initial"
                whileInView="whileInView"
              >
                <Clock className="w-12 h-12 text-primary mb-6 group-hover:rotate-12 transition-transform" />
                <div className="text-7xl font-black text-primary font-mono mb-2 italic tracking-tighter">
                  <Counter value="47 MIN" />
                </div>
                <p className="text-text-muted font-bold uppercase tracking-widest text-sm font-dm">Avg Response Time</p>
                <div className="mt-8 pt-8 border-t border-border-dark w-full text-[10px] font-mono text-green-500 uppercase tracking-widest font-black animate-pulse flex items-center justify-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" /> Live Service Tracker Active
                </div>
              </motion.div>

              {/* Quick Trust Bar */}
              <motion.div 
                className="bg-primary p-8 rounded-3xl flex flex-col gap-6 text-black font-black uppercase italic font-narrow"
                variants={fadeIn}
                initial="initial"
                whileInView="whileInView"
              >
                <div className="flex items-center gap-4 text-2xl">
                  <Check className="w-8 h-8 stroke-[4px]" /> Licensed & Insured
                </div>
                <div className="h-[2px] bg-black/10" />
                <div className="flex items-center gap-4 text-2xl">
                  <Star className="w-8 h-8 fill-black stroke-none" /> 4.9 Stars on Google
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section 2: Social Proof */}
        <section className="py-16 bg-secondary/30 border-y border-border-dark overflow-hidden">
          <div className="container mx-auto px-6 mb-12 flex items-center gap-8">
            <div className="h-[2px] flex-1 bg-border-dark" />
            <p className="text-text-muted font-narrow uppercase tracking-widest font-black italic text-center whitespace-nowrap lg:text-3xl opacity-50">
              Trusted by local businesses across Los Angeles
            </p>
            <div className="h-[2px] flex-1 bg-border-dark" />
          </div>
          <div className="marquee-container">
            <div className="marquee-content flex items-center gap-24 py-4">
               {Array(4).fill([
                 "Google 4.9 \u2b50", "HomeAdvisor", "Thumbtack", "Angi Service", "BBB A+ Platinum", "Yelp Top Pro"
               ]).flat().map((logo, i) => (
                 <span 
                  key={i} 
                  className="font-narrow text-6xl text-text-muted/30 grayscale hover:grayscale-0 hover:text-primary transition-all cursor-pointer select-none whitespace-nowrap font-black italic tracking-tighter"
                 >
                   {logo}
                 </span>
               ))}
            </div>
          </div>
        </section>

        {/* Section 3: Services */}
        <section id="services" className="py-32 bg-bg-dark relative overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-8">
              <div className="max-w-3xl">
                <SectionLabel>What We Do</SectionLabel>
                <h2 className="font-narrow text-[clamp(4rem,8vw,10rem)] leading-[0.85] text-primary italic font-black uppercase">
                  EVERY JOB.<br/>EVERY TIME.
                </h2>
              </div>
              <p className="text-text-muted text-2xl max-w-sm font-dm leading-relaxed border-l-2 border-primary pl-8">
                From simple leaks to full building HVAC systems, we own the tools and the expertise.
              </p>
            </div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
            >
              {[
                { 
                  icon: <Flame className="w-10 h-10" />, 
                  title: "AC \u0026 Heating", 
                  desc: "Installation, repair, and tune-ups for all major HVAC brands.",
                  price: "FROM $199"
                },
                { 
                  icon: <Droplet className="w-10 h-10" />, 
                  title: "Drain \u0026 Pipe Repair", 
                  desc: "Blocked drains, burst pipes, and full repiping done fast.",
                  price: "FROM $149"
                },
                { 
                  icon: <Thermometer className="w-10 h-10" />, 
                  title: "Heating Systems", 
                  desc: "Furnace installs, boiler repairs, and full winterization.",
                  price: "FROM $229"
                },
                { 
                  icon: <ShowerHead className="w-10 h-10" />, 
                  title: "Bathroom Plumbing", 
                  desc: "Fixtures, leaks, shower installs, and water heater replacement.",
                  price: "FROM $89"
                },
                { 
                  icon: <Snowflake className="w-10 h-10" />, 
                  title: "Emergency Repair", 
                  desc: "Same-day emergency service when your AC dies in July.",
                  price: "PRIORITY"
                },
                { 
                  icon: <House className="w-10 h-10" />, 
                  title: "Home Inspections", 
                  desc: "Pre-purchase plumbing and HVAC audit with written report.",
                  price: "$199 FLAT"
                }
              ].map((service, i) => (
                <motion.div 
                  key={i}
                  variants={fadeIn}
                  whileHover={{ y: -8, borderLeftWidth: "12px", background: "#1C1C1C" }}
                  className="bg-secondary p-12 border border-border-dark border-l-4 border-l-primary/30 transition-all duration-300 relative group cursor-pointer"
                >
                  <div className="text-primary mb-8 group-hover:scale-125 transition-transform origin-left">
                    {service.icon}
                  </div>
                  <h3 className="font-narrow text-4xl text-text-primary mb-4 italic font-black">{service.title}</h3>
                  <p className="text-text-muted leading-relaxed font-dm mb-10 text-lg">{service.desc}</p>
                  <div className="font-mono text-xs text-primary font-black tracking-[0.2em]">{service.price}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Section 4: Why Us / Multi-column Stats Bento */}
        <section id="about" className="py-24 bg-[#111111] relative diagonal-divider-both border-y border-border-dark">
          <div className="container mx-auto px-6 relative z-10">
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <motion.div 
                  className="bg-bg-dark border border-white/5 p-12 rounded-[2rem] flex flex-col justify-between group overflow-hidden"
                  variants={fadeIn}
                >
                   <div className="mb-12">
                     <p className="text-primary font-mono text-[10px] uppercase tracking-widest mb-4">Real-world track record</p>
                     <h4 className="font-narrow text-6xl text-white italic font-black uppercase">EXPERIENCE</h4>
                   </div>
                   <div className="text-9xl font-narrow font-black text-white/5 absolute -bottom-8 -right-8 select-none group-hover:text-primary/10 transition-colors">2400</div>
                   <p className="text-4xl text-primary font-narrow italic font-black">
                     <Counter value="2,400+" />
                   </p>
                   <p className="text-text-muted mt-2 font-bold uppercase tracking-widest text-xs">Major Jobs Completed</p>
                </motion.div>

                <motion.div 
                  className="bg-gradient-to-br from-primary to-orange-700 p-12 rounded-[2rem] flex flex-col justify-between text-black group relative overflow-hidden"
                  variants={fadeIn}
                >
                   <X className="w-64 h-64 absolute -bottom-16 -right-16 text-black/20 group-hover:scale-125 transition-transform duration-700" />
                   <div className="mb-12">
                     <p className="font-black uppercase tracking-tighter font-narrow text-7xl leading-none">NO<br />EXCUSES.</p>
                   </div>
                   <div>
                     <p className="text-3xl font-narrow font-black italic uppercase leading-none">Same-day service or we pay YOU $50 credit.</p>
                     <p className="mt-4 font-bold text-xs uppercase tracking-widest opacity-70">The FlowPro Triple Guarantee</p>
                   </div>
                </motion.div>

                <motion.div 
                  className="bg-bg-dark border border-white/5 p-12 rounded-[2rem] flex flex-col justify-between group overflow-hidden"
                  variants={fadeIn}
                >
                   <div className="mb-12">
                     <p className="text-accent font-mono text-[10px] uppercase tracking-widest mb-4">Certified \u0026 Verified</p>
                     <h4 className="font-narrow text-6xl text-white italic font-black uppercase">RELIABILITY</h4>
                   </div>
                   <div className="text-9xl font-narrow font-black text-white/5 absolute -bottom-8 -right-8 select-none group-hover:text-accent/10 transition-colors">49</div>
                   <p className="text-4xl text-accent font-narrow italic font-black">
                     <Counter value="4.9" /> / 5.0
                   </p>
                   <p className="text-text-muted mt-2 font-bold uppercase tracking-widest text-xs">Customer Satisfaction Rating</p>
                </motion.div>
             </div>
          </div>
        </section>

        {/* Section 5: Testimonials  */}
        <section id="reviews" className="py-40 bg-bg-dark">
          <div className="container mx-auto px-6">
            <div className="text-center mb-32 max-w-4xl mx-auto">
              <SectionLabel>What Clients Say</SectionLabel>
              <h2 className="font-narrow text-8xl lg:text-[10rem] text-text-primary italic font-black leading-none uppercase">
                REAL JOBS.<br />REAL PEOPLE.
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {[
                {
                  quote: "AC died at 10pm on a Friday. FlowPro was at my door by 11:15. Fixed in under an hour. Unreal service.",
                  name: "Ahmed R.",
                  loc: "Homeowner, North LA",
                  color: "bg-primary",
                  span: "lg:col-span-4"
                },
                {
                  quote: "They found a pipe leak our last plumber missed for two years. Fixed it same visit, price was fair, no drama.",
                  name: "Sadia M.",
                  loc: "Property Owner",
                  color: "bg-accent",
                  span: "lg:col-span-4"
                },
                {
                  quote: "Installed a full HVAC unit in our office. Clean work, on time, no mess left behind. Will call again.",
                  name: "Bilal Enterprises",
                  loc: "Commercial Client",
                  color: "bg-green-500",
                  span: "lg:col-span-4"
                }
              ].map((t, i) => (
                <motion.div 
                  key={i}
                  variants={fadeIn}
                  className={`${t.span} bg-secondary p-12 rounded-[2.5rem] relative overflow-hidden group border border-border-dark hover:border-primary transition-all duration-500`}
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                  <span className="font-narrow text-[180px] text-primary/5 absolute -top-12 -right-8 select-none group-hover:text-primary/10 transition-colors italic font-black font-narrow uppercase tracking-tighter">”</span>
                  <div className="flex gap-1 text-primary mb-10">
                    {Array(5).fill(0).map((_, i) => <Star key={i} className="w-5 h-5 fill-primary stroke-none" />)}
                  </div>
                  <p className="text-text-primary text-xl italic mb-12 relative z-10 leading-relaxed font-dm">
                    \u201c{t.quote}\u201d
                  </p>
                  <div className="flex items-center gap-5">
                    <div className={`w-14 h-14 rounded-full ${t.color} flex items-center justify-center text-black font-narrow font-black italic text-2xl`}>
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="text-white font-narrow text-2xl font-black italic tracking-wide uppercase">{t.name}</p>
                      <p className="text-text-muted text-xs font-dm uppercase tracking-widest font-bold">{t.loc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 6: Pricing */}
        <section id="pricing" className="py-40 bg-secondary/30 border-y border-border-dark relative">
          <div className="container mx-auto px-6">
            <div className="text-center mb-32">
              <SectionLabel>Transparent Pricing</SectionLabel>
              <h2 className="font-narrow text-[clamp(4rem,10vw,12rem)] text-text-primary italic font-black leading-[0.85] uppercase">
                NO SURPRISES.<br />EVER.
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-7xl mx-auto">
              {/* Basic */}
              <motion.div 
                variants={fadeIn}
                className="bg-bg-dark p-12 rounded-[2rem] border border-border-dark flex flex-col group hover:scale-[1.02] transition-transform"
              >
                <div className="mb-12">
                  <p className="text-text-muted font-mono text-xs uppercase tracking-[0.3em] font-black mb-4">Level 01</p>
                  <h3 className="font-narrow text-6xl text-white mb-4 italic font-black uppercase leading-none">Diagnostic<br />Call</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-7xl font-narrow font-black italic text-primary">$89</span>
                    <span className="text-text-muted font-bold text-sm uppercase tracking-widest italic group-hover:translate-x-2 transition-transform inline-block">/ visit</span>
                  </div>
                </div>
                <ul className="space-y-6 mb-16 flex-1">
                  {[
                    "Same-day availability",
                    "Full diagnosis included",
                    "Written quote before work",
                    "Licensed technician"
                  ].map(f => (
                    <li key={f} className="flex items-center gap-4 text-text-primary text-lg font-dm">
                      <Check className="w-6 h-6 text-primary stroke-[3px]" /> {f}
                    </li>
                  ))}
                  <li className="flex items-center gap-4 text-text-muted/40 text-lg font-dm line-through decoration-primary/50">
                    <X className="w-6 h-6" /> Parts not included
                  </li>
                </ul>
                <button className="w-full border-2 border-white text-white py-6 font-black uppercase text-xl skew-btn hover:bg-white hover:text-black transition-colors">
                  <span className="skew-text italic">BOOK A VISIT</span>
                </button>
              </motion.div>

              {/* Standard Fix - Highlighted */}
              <motion.div 
                className="bg-[#1C1C1C] p-16 rounded-[2.5rem] border-4 border-primary relative shadow-[0_0_80px_rgba(249,115,22,0.25)] flex flex-col transform lg:-translate-y-6 lg:scale-105 z-10 group"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: -24 }}
                viewport={{ once: true }}
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                  <div className="bg-primary text-black px-8 py-3 font-narrow font-black italic uppercase text-lg italic skew-btn">
                     <span className="skew-text">BEST VALUE</span>
                  </div>
                </div>
                <div className="mb-12">
                   <p className="text-primary font-mono text-xs uppercase tracking-[0.3em] font-black mb-4">Level 02</p>
                   <h3 className="font-narrow text-[ clamp(3rem,5vw,5rem) ] text-white mb-4 italic font-black uppercase leading-none underline decoration-primary decoration-8 underline-offset-[12px]">Standard<br />Fix</h3>
                   <div className="flex items-baseline gap-2 mt-8">
                     <span className="text-8xl font-narrow font-black italic text-primary">$249</span>
                     <span className="text-text-muted font-bold text-sm uppercase tracking-widest italic">Starting from</span>
                   </div>
                </div>
                <ul className="space-y-6 mb-16 flex-1">
                  {[
                    "Everything in Basic",
                    "Parts \u0026 labor included",
                    "90-day workmanship guarantee",
                    "Priority scheduling"
                  ].map(f => (
                    <li key={f} className="flex items-center gap-4 text-text-primary text-xl font-black italic font-narrow uppercase tracking-tighter">
                      <Check className="w-7 h-7 text-primary stroke-[4px]" /> {f}
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-primary text-black py-8 font-black uppercase text-3xl skew-btn hover:bg-white transition-all transform hover:-rotate-1">
                  <span className="skew-text italic">GET STARTED</span>
                </button>
              </motion.div>

              {/* Full Install */}
              <motion.div 
                variants={fadeIn}
                className="bg-bg-dark p-12 rounded-[2rem] border border-border-dark flex flex-col group hover:scale-[1.02] transition-transform"
              >
                <div className="mb-12">
                  <p className="text-text-muted font-mono text-xs uppercase tracking-[0.3em] font-black mb-4">Level 03</p>
                  <h3 className="font-narrow text-6xl text-white mb-4 italic font-black uppercase leading-none text-accent">Full<br />Install</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-7xl font-narrow font-black italic text-accent">CUSTOM</span>
                    <span className="text-text-muted font-bold text-sm uppercase tracking-widest italic group-hover:translate-x-2 transition-transform inline-block">Quote</span>
                  </div>
                </div>
                <ul className="space-y-6 mb-16 flex-1">
                  {[
                    "Full HVAC system install",
                    "Permit handling included",
                    "1-year labor warranty",
                    "Financing available"
                  ].map(f => (
                    <li key={f} className="flex items-center gap-4 text-text-primary text-lg font-dm">
                      <Check className="w-6 h-6 text-accent stroke-[3px]" /> {f}
                    </li>
                  ))}
                </ul>
                <button className="w-full border-2 border-accent text-accent py-6 font-black uppercase text-xl skew-btn hover:bg-accent hover:text-black transition-colors">
                  <span className="skew-text italic">REQUEST QUOTE</span>
                </button>
              </motion.div>
            </div>
            <p className="text-center text-text-muted mt-24 font-mono text-sm uppercase tracking-[0.3em] font-black opacity-50">
              * Final quote given before work begins — No Pricing Gaps
            </p>
          </div>
        </section>

        {/* Section 7: Final CTA  */}
        <section className="container mx-auto px-6 py-24">
          <motion.div 
            className="bg-gradient-to-br from-primary to-orange-700 p-12 lg:p-24 rounded-[3rem] relative overflow-hidden group shadow-2xl flex flex-col items-center text-center"
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
          >
             <Flame className="w-[800px] h-[800px] absolute -right-64 -bottom-64 opacity-5 text-black pointer-events-none group-hover:scale-110 transition-transform duration-[2000ms]" />
             <div className="relative z-10 max-w-5xl">
               <h2 className="font-narrow text-8xl lg:text-[14rem] text-black italic font-black leading-[0.8] mb-12 uppercase tracking-tight shadow-black/20">
                 FIX IT<br />TODAY.
               </h2>
               <p className="text-black/80 text-3xl font-narrow font-black italic uppercase mb-16 tracking-tight max-w-2xl mx-auto border-y-4 border-black/10 py-10">
                 Same-day service. Transparent pricing. Zero stress. Why wait for tomorrow?
               </p>
               <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                 <button className="bg-black text-white px-16 py-8 font-black uppercase text-2xl skew-btn group-hover:scale-105 transition-transform hover:shadow-2xl">
                   <span className="skew-text italic">GET FREE QUOTE</span>
                 </button>
                 <button className="border-4 border-black text-black px-16 py-8 font-black uppercase text-2xl skew-btn hover:bg-black hover:text-white transition-colors">
                   <span className="skew-text italic">CALL US NOW</span>
                 </button>
               </div>
             </div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#050505] pt-32 pb-12 border-t-8 border-primary">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-32">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-12 group">
                <Flame className="text-primary w-12 h-12 group-hover:scale-125 transition-transform" />
                <span className="font-narrow text-5xl text-primary italic font-black uppercase tracking-tighter">FLOWPRO</span>
              </div>
              <p className="text-text-muted mb-12 italic leading-relaxed text-lg font-dm border-l-4 border-border-dark pl-6">
                Licensed. Local. Reliable. Delivering industrial-grade comfort to every neighborhood since 2010.
              </p>
              <div className="flex gap-8">
                <a href="#" className="text-text-muted hover:text-primary transition-all hover:-translate-y-1"><Facebook className="w-8 h-8" /></a>
                <a href="#" className="text-text-muted hover:text-primary transition-all hover:-translate-y-1"><Instagram className="w-8 h-8" /></a>
                <a href="#" className="text-text-muted hover:text-primary transition-all hover:-translate-y-1"><MapPin className="w-8 h-8" /></a>
              </div>
            </div>

            {[
              { title: "Services", links: ["AC \u0026 Heating", "Drain \u0026 Pipe", "Emergency Repair", "Bathroom Plumbing", "Commercial"] },
              { title: "Company", links: ["About Us", "Our Guarantee", "Service Areas", "Careers", "Blog"] }
            ].map(col => (
              <div key={col.title}>
                <h4 className="font-narrow text-3xl text-white mb-12 tracking-widest font-black italic uppercase border-b border-white/10 pb-4">{col.title}</h4>
                <ul className="space-y-6 text-text-muted font-dm text-lg font-bold">
                  {col.links.map(link => (
                    <li key={link}><a href="#" className="hover:text-primary transition-colors flex items-center gap-3 overflow-hidden group"><span className="w-2 h-2 bg-primary transform -translate-x-4 group-hover:translate-x-0 transition-transform" /> {link}</a></li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h4 className="font-narrow text-3xl text-white mb-12 tracking-widest font-black italic uppercase border-b border-white/10 pb-4">Contact</h4>
              <ul className="space-y-8">
                <li>
                  <a href="tel:5552004400" className="text-4xl font-narrow text-text-primary hover:text-primary transition-colors flex items-center gap-4 italic font-black uppercase leading-none">
                    <Phone className="w-10 h-10 text-primary fill-primary" /> (555) 200-4400
                  </a>
                </li>
                <li className="text-text-muted text-xl font-dm pl-14">hello@flowpro.com</li>
                <li className="text-text-muted text-xl font-dm pl-14 leading-relaxed font-bold">Los Angeles, California<br />90210 District</li>
                <li className="pt-8 border-t border-border-dark flex flex-col gap-2">
                  <p className="text-primary font-mono text-[10px] uppercase font-black tracking-[0.3em]">Operational Status</p>
                  <p className="text-text-primary text-xl font-narrow font-black italic uppercase">Mon–Sat 7am–9pm</p>
                  <div className="flex items-center gap-3 mt-2">
                     <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                     <p className="text-primary text-xs font-black uppercase tracking-widest">Emergency 24/7 Priority Active</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-16 border-t border-border-dark gap-8">
            <p className="text-text-muted font-mono text-[10px] uppercase tracking-[0.4em] font-black">
              © 2025 FLOWPRO SERVICES. ALL RIGHTS RESERVED.
            </p>
            <div className="flex gap-12 text-text-muted font-mono text-[10px] uppercase tracking-[0.4em] font-black">
              <a href="#" className="hover:text-white transition-colors relative group">Privacy Policy<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full" /></a>
              <a href="#" className="hover:text-white transition-colors relative group">Terms of Service<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full" /></a>
            </div>
          </div>
        </div>
      </footer>

      {/* Heavy Fixed Bottom CTA for Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full p-4 z-50 pointer-events-none">
        <a 
          href="tel:5552004400" 
          className="pointer-events-auto bg-primary text-black font-narrow font-black italic text-[2.5rem] py-8 flex items-center justify-center gap-4 rounded-3xl shadow-[0_-20px_60px_rgba(0,0,0,0.5)] border-4 border-black active:scale-95 transition-transform"
        >
          <Phone className="fill-black w-10 h-10" /> CALL NOW
        </a>
      </div>
    </div>
  );
}
