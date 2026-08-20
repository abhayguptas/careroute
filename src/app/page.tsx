'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldAlert, HeartPulse, Search, Map, Database, CheckCircle, RefreshCw, Zap } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 h-20 bg-background/80 backdrop-blur-md z-50 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/brand/careroute-logo.svg" alt="CareRoute" className="h-10" />
          </div>
          <div className="hidden md:flex items-center gap-8 font-medium text-slate-300">
            <Link href="/app/search" className="hover:text-white transition-colors">Find Care</Link>
            <Link href="/app/emergency" className="text-emergency hover:text-emergency-foreground transition-colors">Emergency</Link>
            <Link href="/app/facilities" className="hover:text-white transition-colors">Facilities</Link>
            <Link href="#how-it-works" className="hover:text-white transition-colors">How it works</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/app/onboard" className="hidden lg:block text-sm font-medium text-slate-300 hover:text-white transition-colors">Add Facility</Link>
            <Link href="/app">
              <Button>Open CareRoute</Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        {/* 1. Hero Section */}
        <section className="relative pt-24 pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand/10 via-background to-background"></div>
          <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-border text-xs font-bold tracking-widest text-slate-400 mb-8 uppercase">
                <span className="w-2 h-2 rounded-full bg-brand"></span>
                Local Healthcare Intelligence
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-white mb-6">
                Find the right care.<br />
                <span className="text-slate-500">Not just a hospital.</span>
              </h1>
              <p className="text-lg text-slate-400 mb-10 max-w-lg leading-relaxed">
                CareRoute turns fragmented public healthcare information into clear, location-aware options you can act on. Powered by evidence-first data infrastructure.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/app/search">
                  <Button size="lg" className="w-full sm:w-auto text-lg px-8">Find Care</Button>
                </Link>
                <Link href="#how-it-works">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto text-lg px-8">Explore how it works</Button>
                </Link>
              </div>
            </div>

            {/* Interactive Product Preview */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-tr from-brand/30 to-background rounded-2xl blur-2xl opacity-50"></div>
              <div className="relative glass-panel rounded-2xl border border-border shadow-2xl overflow-hidden bg-neutral-950">
                <div className="p-4 border-b border-border bg-neutral-900 flex items-center gap-3">
                  <Search size={18} className="text-slate-400" />
                  <span className="text-white font-medium">Need emergency trauma care in Lucknow</span>
                </div>
                <div className="p-6 space-y-4">
                  {/* Fake result 1 */}
                  <div className="bg-neutral-900 border border-emergency/30 rounded-lg p-4 shadow-[0_0_15px_rgba(225,29,72,0.05)] relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-emergency"></div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-white text-lg">Sanjay Gandhi Trauma Centre</h3>
                      <span className="text-xs font-bold text-emergency bg-emergency/10 px-2 py-1 rounded">2.4 km away</span>
                    </div>
                    <div className="flex gap-2 mb-3">
                      <span className="text-xs bg-neutral-800 text-slate-300 px-2 py-1 rounded border border-neutral-700">Emergency Hospital</span>
                      <span className="text-xs bg-neutral-800 text-slate-300 px-2 py-1 rounded border border-neutral-700">Trauma Centre</span>
                      <span className="text-xs bg-neutral-800 text-slate-300 px-2 py-1 rounded border border-neutral-700">Ambulance</span>
                    </div>
                    <div className="flex items-center justify-between text-xs border-t border-border pt-3 mt-2">
                      <div className="flex items-center gap-1 text-green-500">
                        <CheckCircle size={14} /> <span>Verified Source</span>
                      </div>
                      <span className="text-slate-500">Last checked: 2h ago</span>
                    </div>
                  </div>
                  {/* Fake result 2 */}
                  <div className="bg-neutral-900 border border-border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-white text-lg">King George's Medical University</h3>
                      <span className="text-xs font-bold text-slate-400">4.1 km away</span>
                    </div>
                    <div className="flex gap-2 mb-3">
                      <span className="text-xs bg-neutral-800 text-slate-300 px-2 py-1 rounded border border-neutral-700">Government</span>
                      <span className="text-xs bg-neutral-800 text-slate-300 px-2 py-1 rounded border border-neutral-700">Level 1 Trauma</span>
                    </div>
                     <div className="flex items-center justify-between text-xs border-t border-border pt-3 mt-2">
                      <div className="flex items-center gap-1 text-green-500">
                        <CheckCircle size={14} /> <span>Verified Source</span>
                      </div>
                      <span className="text-slate-500">Last checked: 5h ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. The Problem */}
        <section id="how-it-works" className="py-24 bg-neutral-950 border-t border-border">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Healthcare information is fragmented.</h2>
            <p className="text-xl text-slate-400 mb-16 leading-relaxed">
              When you need care, answers are scattered across hospital websites, government portals, public directories, and specialty pages. Finding what you need shouldn't be a research project.
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 opacity-70">
              <div className="glass-panel p-4 rounded-xl rotate-[-5deg]">Hospital Website</div>
              <div className="glass-panel p-4 rounded-xl rotate-[2deg]">Gov Directory</div>
              <div className="glass-panel p-4 rounded-xl rotate-[-3deg]">Specialty Page</div>
              <div className="glass-panel p-4 rounded-xl rotate-[6deg]">Local Clinic</div>
            </div>
          </div>
        </section>

        {/* 3. How CareRoute Works */}
        <section className="py-24 border-t border-border bg-neutral-900">
           <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">How CareRoute Works</h2>
                <p className="text-slate-400 text-lg">We turn chaos into clear, actionable intelligence.</p>
              </div>

              <div className="grid md:grid-cols-4 gap-8 relative">
                <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-neutral-800 -translate-y-1/2 z-0"></div>
                
                {[
                  { title: "Natural Request", desc: "\"I need dialysis near me.\"", icon: Search },
                  { title: "Location Aware", desc: "Maps to your current city.", icon: Map },
                  { title: "Intelligence", desc: "Matches capabilities, not just keywords.", icon: Zap },
                  { title: "Verified Options", desc: "Ranked results with evidence.", icon: CheckCircle }
                ].map((step, i) => (
                  <div key={i} className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-2xl bg-neutral-950 border border-border flex items-center justify-center mb-6 shadow-xl">
                      <step.icon size={24} className="text-brand" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-slate-400">{step.desc}</p>
                  </div>
                ))}
              </div>
           </div>
        </section>

        {/* 8. Dynamic Data Infrastructure */}
        <section className="py-32 relative overflow-hidden bg-background">
          <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
               <div className="glass-panel p-8 rounded-2xl border border-border">
                  <div className="flex items-center justify-between mb-6">
                     <span className="text-slate-400 font-mono text-sm">Target URL</span>
                     <ArrowRight className="text-slate-600" />
                     <span className="text-brand font-mono text-sm">CareRoute DB</span>
                  </div>
                  <div className="space-y-3 font-mono text-sm bg-neutral-950 p-4 rounded border border-neutral-800 overflow-hidden">
                    <div className="text-slate-500">{"{"}</div>
                    <div className="pl-4"><span className="text-teal-400">"facility_name"</span>: <span className="text-amber-300">"City Hospital"</span>,</div>
                    <div className="pl-4"><span className="text-teal-400">"emergency_available"</span>: <span className="text-purple-400">true</span>,</div>
                    <div className="pl-4"><span className="text-teal-400">"departments"</span>: <span className="text-slate-400">["Cardiology", "Neurology"]</span></div>
                    <div className="text-slate-500">{"}"}</div>
                  </div>
               </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Dynamic Data Infrastructure</h2>
              <p className="text-lg text-slate-400 mb-6 leading-relaxed">
                CareRoute can onboard facilities that are difficult to discover or structurally inconsistent. Powered by Bright Data's AI Flow, we convert unstructured hospital websites into verified JSON schemas autonomously.
              </p>
              <ul className="space-y-4 text-slate-300">
                <li className="flex items-center gap-3"><CheckCircle className="text-green-500" size={20}/> <span>Website unstructured data</span></li>
                <li className="flex items-center gap-3"><CheckCircle className="text-green-500" size={20}/> <span>AI schema extraction & validation</span></li>
                <li className="flex items-center gap-3"><CheckCircle className="text-green-500" size={20}/> <span>Structured CareRoute intelligence</span></li>
              </ul>
            </div>
          </div>
        </section>

        {/* 9. Self-Healing */}
        <section className="py-24 bg-neutral-950 border-t border-b border-border">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <RefreshCw size={48} className="mx-auto text-brand mb-6" />
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Self-Healing Infrastructure</h2>
            <p className="text-lg text-slate-400 leading-relaxed mb-12">
              Websites change. Departments move. When a data extraction fails due to a layout shift, CareRoute detects the anomaly, autonomously triggers a healing process, repairs the scraper, and restores the data—without human intervention.
            </p>
            <div className="flex items-center justify-center gap-4 font-mono text-sm">
              <span className="bg-neutral-900 px-3 py-1 rounded text-slate-300">Website Changes</span>
              <ArrowRight className="text-slate-600" size={16}/>
              <span className="bg-red-500/10 text-red-500 px-3 py-1 rounded border border-red-500/30">Extraction Failure</span>
              <ArrowRight className="text-slate-600" size={16}/>
              <span className="bg-amber-500/10 text-amber-500 px-3 py-1 rounded border border-amber-500/30">AI Repair</span>
              <ArrowRight className="text-slate-600" size={16}/>
              <span className="bg-green-500/10 text-green-500 px-3 py-1 rounded border border-green-500/30">Data Restored</span>
            </div>
          </div>
        </section>

        {/* 10. Final CTA */}
        <section className="py-32 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-brand/20 via-background to-background"></div>
          <div className="relative z-10 max-w-3xl mx-auto px-6">
            <h2 className="text-4xl lg:text-5xl font-bold mb-8">Find care with clarity.</h2>
            <Link href="/app/search">
              <Button size="lg" className="text-lg px-12 py-6 rounded-full shadow-2xl shadow-brand/20">Enter CareRoute</Button>
            </Link>
          </div>
        </section>
      </main>
      
      <footer className="border-t border-border bg-neutral-950 py-12 text-center text-slate-500 text-sm">
        <div className="flex items-center justify-center gap-2 mb-4">
          <img src="/brand/careroute-mark.svg" className="h-6 grayscale opacity-50" alt="Logo" />
          <span className="font-bold tracking-tight">CareRoute</span>
        </div>
        <p>Built for the Bright Data Hackathon.</p>
      </footer>
    </div>
  );
}
