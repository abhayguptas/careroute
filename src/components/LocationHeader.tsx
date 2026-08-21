'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Navigation } from 'lucide-react';

export function LocationHeader() {
  const [location, setLocation] = useState('Lucknow');
  const [isAsking, setIsAsking] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('careroute_location');
    if (saved) {
      setLocation(saved);
    } else {
      // If no saved location, we can try to ask automatically, or just wait for them to click.
      // Let's ask automatically on first load.
      requestLocation();
    }
  }, []);

  const requestLocation = () => {
    if (!navigator.geolocation) {
      console.warn('Geolocation is not supported by your browser');
      return;
    }

    setIsAsking(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // In a real app, we would reverse geocode these coordinates.
        // For the hackathon vertical slice (Lucknow), we'll just snap to Lucknow.
        const locName = 'Lucknow (GPS)';
        setLocation(locName);
        localStorage.setItem('careroute_location', locName);
        setIsAsking(false);
      },
      (error) => {
        console.warn('Geolocation error:', error);
        setIsAsking(false);
      }
    );
  };

  return (
    <button 
      onClick={requestLocation}
      className="flex items-center gap-2 text-sm text-neutral-600 bg-surface px-4 py-1.5 rounded-full border border-border shadow-sm hover:bg-neutral-50 transition-colors"
    >
      <MapPin size={14} className="text-brand" /> 
      {isAsking ? 'Locating...' : location}
      {!isAsking && <Navigation size={12} className="text-neutral-400 ml-1" />}
    </button>
  );
}
