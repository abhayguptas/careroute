'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Building2,
  MapPin,
  Phone,
  ExternalLink,
  ArrowLeft,
  Clock,
  ShieldCheck,
  Database,
  Calendar,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { EvidencePanel } from '@/components/ui/EvidencePanel';

export default function FacilityDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  return (
    <div className="max-w-5xl mx-auto pb-24">
      <button
        onClick={() => router.back()}
        className="flex items-center text-neutral-500 hover:text-neutral-900 mb-8 transition-colors font-medium"
      >
        <ArrowLeft size={16} className="mr-2" /> Back to Results
      </button>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-10">
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h1 className="text-3xl lg:text-4xl font-bold text-neutral-900 tracking-tight">
              Fortis Escorts Heart Institute
            </h1>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              Private
            </Badge>
            <Badge variant="success">
              <ShieldCheck size={12} className="mr-1" /> Verified
            </Badge>
          </div>
          <p className="text-neutral-500 flex items-center gap-2 text-lg font-medium">
            <MapPin size={18} /> Okhla Road, New Delhi, Delhi 110025
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <Button variant="outline" className="flex-1 md:flex-none bg-surface">
            <Phone size={16} className="mr-2" /> Call
          </Button>
          <Button variant="primary" className="flex-1 md:flex-none">
            <MapPin size={16} className="mr-2" /> Directions
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-xl font-bold text-neutral-900 mb-4">Healthcare Capabilities</h2>
            <Card>
              <CardContent className="p-0">
                <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border">
                  <div className="p-6">
                    <h3 className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-4">
                      Departments
                    </h3>
                    <ul className="space-y-3">
                      {['Cardiology', 'Neurology', 'Orthopedics', 'Urology'].map((dept) => (
                        <li key={dept} className="flex items-center gap-3 text-neutral-700 font-medium">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand"></div> {dept}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-6">
                    <h3 className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-4">
                      Services
                    </h3>
                    <ul className="space-y-3">
                      {['Blood Bank', '24/7 Pharmacy', 'ICU', 'Pathology Lab'].map((srv) => (
                        <li key={srv} className="flex items-center gap-3 text-neutral-700 font-medium">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand"></div> {srv}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-xl font-bold text-neutral-900 mb-4">Provenance & Evidence</h2>
            <div className="space-y-4">
              <EvidencePanel
                field="Emergency Capabilities"
                value="24/7 Trauma & Cardiac Emergency"
                sourceUrl="#"
                evidenceText="The Emergency Department is equipped to handle all medical and surgical emergencies including poly-trauma and cardiac arrest, open 24x7."
                lastChecked="2 hours ago"
              />
              <EvidencePanel
                field="Blood Bank"
                value="Available"
                sourceUrl="#"
                evidenceText="Our NABH accredited blood bank operates round the clock."
                lastChecked="2 hours ago"
              />
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">
                Quick Info
              </h3>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-start gap-3">
                <Clock className="text-neutral-400 mt-0.5" size={18} />
                <div>
                  <p className="font-bold text-neutral-900">OPD Hours</p>
                  <p className="text-sm text-neutral-500">Mon-Sat: 8:00 AM - 8:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="text-neutral-400 mt-0.5" size={18} />
                <div>
                  <p className="font-bold text-neutral-900">Appointments</p>
                  <a
                    href="#"
                    className="text-sm text-brand hover:underline flex items-center gap-1"
                  >
                    Book Online <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-dashed">
            <CardHeader className="pb-2">
              <h3 className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                <Database size={16} /> Infrastructure Data
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-xs font-mono text-neutral-500">
                <div className="flex justify-between">
                  <span>Collector ID</span>
                  <span className="text-brand font-medium">c_8f7d6a5b</span>
                </div>
                <div className="flex justify-between">
                  <span>Last Scrape Run</span>
                  <span className="text-neutral-800 font-medium">Today, 09:41 AM</span>
                </div>
                <div className="flex justify-between">
                  <span>Data Quality</span>
                  <span className="text-success font-medium">100% (Healed)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
