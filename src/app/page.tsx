'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Map,
  ShieldAlert,
  Database,
  CheckCircle,
  RefreshCw,
  Zap,
  ArrowRight,
  Activity,
  Building2,
  Stethoscope,
  Droplet,
  HeartPulse,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-brand/20 selection:text-brand-light overflow-x-hidden">
      {/* 1. Top Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'h-16 glass-nav shadow-sm' : 'h-24 bg-transparent'}`}
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4 group">
            <div className={`rounded-2xl bg-gradient-to-br from-brand-light to-brand flex items-center justify-center text-white shadow-md shadow-brand/20 transition-all duration-500 group-hover:scale-105 group-hover:shadow-lg group-hover:-rotate-3 ${scrolled ? 'w-10 h-10' : 'w-12 h-12'}`}>
              <HeartPulse size={scrolled ? 24 : 28} strokeWidth={2.5} />
            </div>
            <span className={`font-bold tracking-tight text-neutral-900 transition-all duration-500 ${scrolled ? 'text-xl' : 'text-3xl'}`}>CareRoute</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 font-medium text-neutral-600 text-sm">
            <Link href="/app/search" className="hover:text-neutral-900 transition-colors">
              Find Care
            </Link>
            <Link
              href="/app/emergency"
              className="text-emergency hover:text-red-700 transition-colors"
            >
              Emergency
            </Link>
            <Link href="#how-it-works" className="hover:text-neutral-900 transition-colors">
              How it works
            </Link>
            <Link href="/app/facilities" className="hover:text-neutral-900 transition-colors">
              Facilities
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2 text-xs font-medium text-neutral-500 bg-neutral-100 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-brand"></span>
              Live: Lucknow
            </div>
            <Link href="/app">
              <Button size="sm" className="rounded-full px-6 shadow-sm">
                Start
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main>
        {/* 2. Editorial Hero */}
        <section className="relative pt-40 pb-20 lg:pt-52 lg:pb-32 overflow-hidden">
          {/* Subtle Ambient Background Gradient */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[800px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-muted via-background to-background -z-10 opacity-70 blur-3xl"></div>

          <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 fill-mode-both">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface border border-border shadow-sm text-xs font-bold tracking-widest text-neutral-600 uppercase mb-8">
                <span className="w-2 h-2 rounded-full bg-brand"></span>
                Local Healthcare Intelligence
              </div>
            </div>

            <h1 className="animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-150 fill-mode-both text-5xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] tracking-tight text-neutral-900 mb-8 max-w-5xl mx-auto">
              Find the right care.
              <span className="block text-neutral-400 font-light mt-2">Not just a hospital.</span>
            </h1>

            <p className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-both text-lg lg:text-xl text-neutral-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              CareRoute turns fragmented public healthcare information into clear, location-aware
              options you can act on.
            </p>

            <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 fill-mode-both flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/app/search">
                <Button size="lg" className="rounded-full text-lg px-10 shadow-lg shadow-brand/20">
                  Find care
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full text-lg px-8 bg-surface/50 backdrop-blur-md"
                >
                  How it works
                </Button>
              </Link>
            </div>
          </div>

          {/* Spatial Intelligence Visualization Layer */}
          <div className="relative mt-20 max-w-6xl mx-auto h-[400px] lg:h-[500px] animate-in fade-in zoom-in-95 duration-1000 delay-700 fill-mode-both">
            {/* Map abstract base */}
            <div className="absolute inset-x-4 inset-y-0 bg-surface/40 backdrop-blur-3xl border border-border/50 rounded-3xl shadow-2xl overflow-hidden">
              {/* Fake route lines */}
              <svg
                className="absolute inset-0 w-full h-full opacity-20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M -100 200 Q 300 400 800 100 T 1200 300"
                  fill="none"
                  stroke="#1B7850"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
                <path
                  d="M 100 -50 C 100 200 600 200 600 500"
                  fill="none"
                  stroke="#2D9A7A"
                  strokeWidth="1"
                />
              </svg>

              {/* Central Search Node */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glass-panel p-4 rounded-2xl flex items-center gap-3 z-20 w-80 shadow-xl">
                <Search className="text-brand" size={20} />
                <span className="font-medium text-neutral-800 text-sm">
                  "Emergency trauma care"
                </span>
                <Badge variant="outline" className="ml-auto bg-neutral-100 border-none">
                  Lucknow
                </Badge>
              </div>

              {/* Floating Facility Card 1 */}
              <div className="absolute top-[15%] left-[10%] lg:left-[20%] glass-panel p-4 rounded-xl w-64 shadow-lg hover:-translate-y-1 transition-transform duration-500">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-semibold text-neutral-900 text-sm">Sanjay Gandhi Trauma</div>
                  <span className="text-[10px] font-bold text-emergency bg-emergency/10 px-1.5 py-0.5 rounded text-red-700">
                    2.4 km
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-success mt-3 font-medium">
                  <CheckCircle size={12} /> Verified 2h ago
                </div>
              </div>

              {/* Floating Facility Card 2 */}
              <div className="absolute bottom-[20%] right-[10%] lg:right-[20%] glass-panel p-4 rounded-xl w-64 shadow-lg hover:-translate-y-1 transition-transform duration-500">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-semibold text-neutral-900 text-sm">KGMU Trauma Center</div>
                  <span className="text-[10px] font-bold text-neutral-500 bg-neutral-100 px-1.5 py-0.5 rounded">
                    4.1 km
                  </span>
                </div>
                <div className="flex gap-1 mt-2">
                  <span className="text-[9px] bg-neutral-100 text-neutral-600 px-1.5 py-0.5 rounded">
                    Level 1 Trauma
                  </span>
                  <span className="text-[9px] bg-neutral-100 text-neutral-600 px-1.5 py-0.5 rounded">
                    Gov
                  </span>
                </div>
              </div>
            </div>

            {/* Fade out bottom of hero */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-30"></div>
          </div>
        </section>

        {/* 3. First Value: Fragmentation */}
        <section className="py-32 relative bg-background">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 tracking-tight text-neutral-900">
              Healthcare information is everywhere.
              <br />
              <span className="text-neutral-400">The answer is not.</span>
            </h2>

            <div className="mt-20 relative h-[400px] flex items-center justify-center">
              {/* Scattered Cards */}
              <div className="absolute left-[10%] top-[20%] glass-panel p-4 rounded-xl -rotate-6 shadow-sm text-sm text-neutral-600 font-medium">
                Hospital Website
              </div>
              <div className="absolute right-[15%] top-[10%] glass-panel p-4 rounded-xl rotate-3 shadow-sm text-sm text-neutral-600 font-medium border-dashed">
                Gov Portal
              </div>
              <div className="absolute left-[20%] bottom-[20%] glass-panel p-4 rounded-xl rotate-12 shadow-sm text-sm text-neutral-600 font-medium">
                Specialty Directory
              </div>
              <div className="absolute right-[20%] bottom-[30%] glass-panel p-4 rounded-xl -rotate-12 shadow-sm text-sm text-neutral-600 font-medium border-dashed">
                Local Clinic Page
              </div>

              {/* Converging into CareRoute */}
              <div className="z-10 bg-surface px-8 py-6 rounded-2xl shadow-xl border border-border text-center flex flex-col items-center ring-1 ring-brand/10">
                <Database className="text-brand mb-4" size={32} />
                <h3 className="font-bold text-neutral-900 text-lg mb-1">CareRoute Intelligence</h3>
                <p className="text-neutral-500 text-sm">Structured, verified, actionable.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. How it works */}
        <section id="how-it-works" className="py-32 bg-neutral-50 border-y border-border/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-neutral-900 mb-4">
                How CareRoute Works
              </h2>
            </div>

            <div className="grid md:grid-cols-4 gap-8 relative">
              <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-[1px] bg-neutral-200 z-0"></div>

              {[
                {
                  title: 'Natural Request',
                  desc: 'Tell us exactly what you need in plain English.',
                  icon: Search,
                },
                {
                  title: 'Location Aware',
                  desc: 'Results instantly mapped to your specific city area.',
                  icon: Map,
                },
                {
                  title: 'Intelligence',
                  desc: 'We match capabilities, not just simple keywords.',
                  icon: Zap,
                },
                {
                  title: 'Verified Options',
                  desc: 'Ranked, actionable results backed by evidence.',
                  icon: CheckCircle,
                },
              ].map((step, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center text-center group">
                  <div className="w-16 h-16 rounded-2xl bg-surface border border-border flex items-center justify-center mb-6 shadow-sm transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-md">
                    <step.icon size={24} className="text-brand" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-2">{step.title}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Care Mode Section */}
        <section className="py-32 bg-background">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 mb-6 leading-[1.1]">
                Tell us what you need.
                <br />
                <span className="text-neutral-400">We’ll find where it exists.</span>
              </h2>
              <p className="text-lg text-neutral-600 mb-10 leading-relaxed">
                Whether you need specialized dialysis, pediatric cardiology, or simply the nearest
                public clinic, CareRoute understands complex medical requirements and
                cross-references them against actual facility capabilities.
              </p>

              <div className="space-y-4">
                <div className="glass-panel p-4 rounded-xl flex items-center gap-4 cursor-default transition-all hover:bg-neutral-50">
                  <Search className="text-neutral-400" size={20} />
                  <span className="text-neutral-800 font-medium">
                    "I need a government hospital with nephrology and dialysis"
                  </span>
                </div>
                <div className="glass-panel p-4 rounded-xl flex items-center gap-4 cursor-default transition-all hover:bg-neutral-50">
                  <Search className="text-neutral-400" size={20} />
                  <span className="text-neutral-800 font-medium">
                    "Find pediatric cardiology near me"
                  </span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-surface rounded-2xl border border-border shadow-xl p-8 relative z-10">
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
                  <div>
                    <h3 className="font-bold text-xl text-neutral-900">Facility Requirements</h3>
                    <p className="text-sm text-neutral-500">Extracted from natural language</p>
                  </div>
                  <Badge variant="success" className="bg-success/10 text-success border-none">
                    Structured
                  </Badge>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-2">
                      Required Specialties
                    </div>
                    <div className="flex gap-2">
                      <Badge className="bg-brand/10 text-brand border-brand/20">Nephrology</Badge>
                      <Badge className="bg-brand/10 text-brand border-brand/20">Dialysis</Badge>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-2">
                      Facility Type
                    </div>
                    <Badge variant="outline" className="text-neutral-700 bg-neutral-50">
                      Government / Public
                    </Badge>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-2">
                      Location Context
                    </div>
                    <div className="text-neutral-800 font-medium">Proximity / Nearest</div>
                  </div>
                </div>
              </div>

              <div className="absolute -inset-4 bg-brand/5 rounded-[2rem] -z-10 blur-xl"></div>
            </div>
          </div>
        </section>

        {/* 6. Emergency Mode Section */}
        <section className="py-32 bg-teal-50/30 border-y border-teal-100 relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-emergency/5 blur-[100px] rounded-full pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <div className="order-2 lg:order-1 relative">
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-teal-900/5 border border-teal-100 relative z-10">
                <div className="flex items-center gap-3 text-emergency mb-8">
                  <ShieldAlert size={24} />
                  <span className="font-bold tracking-widest uppercase text-sm">
                    Emergency Intelligence
                  </span>
                </div>

                <div className="space-y-4 relative">
                  {/* Chain line */}
                  <div className="absolute left-[11px] top-6 bottom-6 w-[2px] bg-teal-100 z-0"></div>

                  <div className="flex gap-4 relative z-10">
                    <div className="w-6 h-6 rounded-full bg-white border-2 border-teal-200 flex-shrink-0 mt-0.5"></div>
                    <div>
                      <div className="text-xs text-neutral-400 font-semibold uppercase mb-1">
                        Situation
                      </div>
                      <div className="text-neutral-900 font-semibold">Severe Trauma</div>
                    </div>
                  </div>
                  <div className="flex gap-4 relative z-10">
                    <div className="w-6 h-6 rounded-full bg-white border-2 border-teal-200 flex-shrink-0 mt-0.5"></div>
                    <div>
                      <div className="text-xs text-neutral-400 font-semibold uppercase mb-1">
                        Required Capability
                      </div>
                      <div className="text-neutral-900 font-semibold">Level 1 Trauma Center</div>
                    </div>
                  </div>
                  <div className="flex gap-4 relative z-10">
                    <div className="w-6 h-6 rounded-full bg-emergency border-2 border-emergency shadow-[0_0_15px_rgba(15,118,110,0.3)] flex-shrink-0 mt-0.5"></div>
                    <div>
                      <div className="text-xs text-emergency font-bold uppercase mb-1">
                        Nearest Facility
                      </div>
                      <div className="text-neutral-900 font-bold text-lg">AIIMS Apex Trauma Center</div>
                      <div className="text-sm text-neutral-500 mt-1">3.2 km away • Open 24/7</div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-teal-100/60">
                  <Button variant="emergency" className="w-full rounded-full h-14 text-base shadow-lg shadow-teal-700/20 hover:shadow-teal-700/30 transition-shadow">
                    Get Directions & Contact
                  </Button>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 lg:pl-12">
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 mb-6">
                When every minute matters.
              </h2>
              <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                CareRoute cuts through the noise to locate relevant emergency resources, bypassing
                generic search results to find facilities actually equipped for your specific
                crisis.
              </p>

              <div className="bg-teal-50/80 backdrop-blur-sm border border-teal-200/60 rounded-2xl p-5 flex gap-4 text-sm text-teal-800">
                <ShieldAlert className="text-emergency flex-shrink-0 mt-0.5" size={24} />
                <p className="leading-relaxed">
                  <strong className="text-teal-950 font-bold block mb-1">Safety Notice</strong>
                  CareRoute is a navigation aid, not a medical device. For life-threatening
                  emergencies, always contact local emergency services immediately.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Evidence & Trust Section */}
        <section className="py-32 bg-background">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-neutral-900 mb-6">
                Know where the information came from.
              </h2>
              <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                In healthcare, black-box AI answers are dangerous. CareRoute provides total
                transparency, linking every capability back to its original public source so you can
                trust the recommendation.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-neutral-700">
                  <CheckCircle className="text-success" size={20} />
                  <span>Direct source verification</span>
                </li>
                <li className="flex items-center gap-3 text-neutral-700">
                  <RefreshCw className="text-brand" size={20} />
                  <span>Real-time freshness tracking</span>
                </li>
              </ul>
            </div>

            <div className="bg-surface border border-border shadow-lg rounded-2xl p-6 lg:p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                    <CheckCircle className="text-success" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-900">Cardiology Department</h4>
                    <span className="text-xs text-success font-medium uppercase tracking-wider">
                      Verified Match
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-sm bg-neutral-50 rounded-xl p-5 border border-border/50">
                <div className="grid grid-cols-3 gap-4 border-b border-border/50 pb-4">
                  <div className="text-neutral-500">Source</div>
                  <div className="col-span-2 font-medium text-neutral-900 text-brand hover:underline cursor-pointer">
                    Official Facility Website
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="hidden md:flex items-center gap-2 bg-neutral-100 px-3 py-1.5 rounded-full border border-border">
                    <div className="w-2 h-2 rounded-full bg-brand animate-pulse"></div>
                    <span className="text-xs font-semibold text-neutral-600">Live: Lucknow</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 border-b border-border/50 pb-4">
                  <div className="text-neutral-500">Last checked</div>
                  <div className="col-span-2 font-medium text-neutral-900">2 hours ago</div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-neutral-500">Evidence Quote</div>
                  <div className="col-span-2 text-neutral-700 italic border-l-2 border-brand/30 pl-3">
                    "...our new Department of Cardiology provides 24/7 emergency intervention and
                    routine care..."
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Long-Tail Intelligence & Self-Healing */}
        <section className="py-32 bg-neutral-50 border-t border-border overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-neutral-900 mb-6">
                Even when the web is messy, your answer shouldn't be.
              </h2>
              <p className="text-lg text-neutral-600 leading-relaxed">
                Hospital websites change constantly. Using autonomous data collection powered by
                Bright Data, CareRoute continuously monitors, extracts, and heals its knowledge base
                without human intervention.
              </p>
            </div>

            {/* Timeline Visualization */}
            <div className="relative max-w-4xl mx-auto">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-neutral-200 -translate-y-1/2 z-0"></div>

              <div className="grid grid-cols-4 gap-4 relative z-10">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-surface border border-success text-success flex items-center justify-center mb-4 shadow-sm">
                    <CheckCircle size={20} />
                  </div>
                  <div className="text-sm font-bold text-neutral-900">Healthy</div>
                  <div className="text-xs text-neutral-500 mt-1">Data verified</div>
                </div>

                <div className="flex flex-col items-center text-center mt-12">
                  <div className="w-12 h-12 rounded-full bg-surface border border-warning text-warning-foreground flex items-center justify-center mb-4 shadow-sm">
                    <Activity size={20} />
                  </div>
                  <div className="text-sm font-bold text-neutral-900">Site Changes</div>
                  <div className="text-xs text-neutral-500 mt-1">Layout shift detected</div>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-surface border border-brand text-brand flex items-center justify-center mb-4 shadow-sm">
                    <RefreshCw size={20} />
                  </div>
                  <div className="text-sm font-bold text-neutral-900">AI Repair</div>
                  <div className="text-xs text-neutral-500 mt-1">Autonomous healing</div>
                </div>

                <div className="flex flex-col items-center text-center mt-12">
                  <div className="w-12 h-12 rounded-full bg-surface border border-success text-success flex items-center justify-center mb-4 shadow-sm">
                    <Database size={20} />
                  </div>
                  <div className="text-sm font-bold text-neutral-900">Restored</div>
                  <div className="text-xs text-neutral-500 mt-1">Data verified again</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 9. Final CTA */}
        <section className="py-32 text-center relative overflow-hidden bg-background">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-brand-muted/50 via-background to-background pointer-events-none"></div>
          <div className="relative z-10 max-w-3xl mx-auto px-6">
            <h2 className="text-4xl lg:text-6xl font-bold mb-8 tracking-tight text-neutral-900">
              Find care with clarity.
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/app/search">
                <Button
                  size="lg"
                  className="rounded-full text-lg px-12 py-6 shadow-xl shadow-brand/10"
                >
                  Enter CareRoute
                </Button>
              </Link>
              <Link href="/app/onboard">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full text-lg px-12 py-6 bg-surface"
                >
                  Add a facility
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-surface pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2">
              <Link href="/" className="flex items-center gap-3 mb-4 group">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-light to-brand flex items-center justify-center text-white shadow-md shadow-brand/20 transition-all duration-300 group-hover:scale-105">
                  <HeartPulse size={24} strokeWidth={2.5} />
                </div>
                <span className="font-bold text-xl tracking-tight text-neutral-800">CareRoute</span>
              </Link>
              <p className="text-sm text-neutral-500 max-w-xs">
                Local healthcare intelligence and navigation, powered by verified public data.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-neutral-900 mb-4">Product</h4>
              <ul className="space-y-3 text-sm text-neutral-600">
                <li>
                  <Link href="/app/search" className="hover:text-brand transition-colors">
                    Find Care
                  </Link>
                </li>
                <li>
                  <Link href="/app/emergency" className="hover:text-emergency transition-colors">
                    Emergency
                  </Link>
                </li>
                <li>
                  <Link href="/app/facilities" className="hover:text-brand transition-colors">
                    Facilities
                  </Link>
                </li>
                <li>
                  <Link href="/app/onboard" className="hover:text-brand transition-colors">
                    Add Facility
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-neutral-900 mb-4">Legal & About</h4>
              <ul className="space-y-3 text-sm text-neutral-600">
                <li>
                  <Link href="#how-it-works" className="hover:text-brand transition-colors">
                    How it works
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-brand transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-brand transition-colors">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-brand transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border/60 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
            <p>© {new Date().getFullYear()} CareRoute. Built for the Bright Data Hackathon.</p>
            <p>Not a medical diagnostic tool.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
