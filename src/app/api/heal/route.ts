import { NextResponse } from 'next/server';
import { triggerHealing, approveHealing, pollHealingProgress } from '@/lib/brightdata/healing';
import { ScraperRepository } from '@/lib/db/repositories/scrapers';
import { HealingRepository } from '@/lib/db/repositories/healing';

export async function POST(request: Request) {
  try {
    const { action, scraperId, prompt, url } = await request.json();

    const scraper = ScraperRepository.findByDbId(scraperId);
    if (!scraper) {
      return NextResponse.json({ error: 'Scraper not found' }, { status: 404 });
    }

    if (action === 'trigger') {
      await triggerHealing(scraper.collectorId, prompt, url);
      
      const attempt = HealingRepository.create({
        scraperId: scraper.id,
        prompt,
        status: 'in_progress',
        fieldsBeforeHeal: '{}',
        fieldsAfterHeal: '{}',
        attempt: 1
      });

      return NextResponse.json({ success: true, attemptId: attempt.id });
    }
    
    if (action === 'poll') {
      const progress = await pollHealingProgress(scraper.collectorId);
      return NextResponse.json(progress);
    }
    
    if (action === 'approve') {
      await approveHealing(scraper.collectorId);
      ScraperRepository.updateStatus(scraper.collectorId, 'ready'); // simplified, lastHealthy isn't exposed in our status update directly but we can expand if needed
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

  } catch (err) {
    console.error('Healing API error', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
