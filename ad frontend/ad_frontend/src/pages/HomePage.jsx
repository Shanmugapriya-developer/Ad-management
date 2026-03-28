import React, { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import MediaCard from '../components/MediaCard';
import { getAds } from '../services/adService';
import adCity from '../assets/ad-city.svg';
import adLaunch from '../assets/ad-launch.svg';
import adPremium from '../assets/ad-premium.svg';
import videoPoster from '../assets/video-poster.svg';

const fallbackAds = [
  { id: '1', title: 'City Lights Retail Launch', description: 'Prime-time cinema audience reach.', category: 'Retail', mediaType: 'image', mediaUrl: adCity, budget: '₹45,000', duration: '2 weeks', status: 'Featured' },
  { id: '2', title: 'Luxury Auto Weekend Spot', description: 'Short cinematic teaser for blockbuster screening.', category: 'Automobile', mediaType: 'video', mediaUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', poster: videoPoster, budget: '₹1,10,000', duration: '45 sec', status: 'Trending' },
  { id: '3', title: 'Festival Season Mega Offer', description: 'Family audience campaign across multiple screens.', category: 'FMCG', mediaType: 'image', mediaUrl: adLaunch, budget: '₹72,000', duration: '3 weeks', status: 'Active' },
  { id: '4', title: 'Premium Brand Storytelling', description: 'Premium theater environment creative.', category: 'Lifestyle', mediaType: 'image', mediaUrl: adPremium, budget: '₹1,80,000', duration: '60 sec', status: 'Premium' },
];

function HomePage() {
  const [ads, setAds] = useState(fallbackAds);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAds = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await getAds();
        const items = Array.isArray(response) ? response : response?.ads || response?.data || [];
        if (items.length) {
          setAds(
            items.map((item, index) => ({
              ...item,
              id: item?._id || item?.id || index,
              mediaUrl: item?.mediaUrl || item?.image || item?.video || fallbackAds[index % fallbackAds.length].mediaUrl,
              mediaType: item?.mediaType || (item?.video ? 'video' : 'image'),
              poster: item?.poster || videoPoster,
            }))
          );
        }
      } catch (err) {
        setError(err?.response?.data?.message || 'Unable to fetch ads. Showing sample ads.');
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  return (
    <div className="container page-stack">
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">Cinema Advertising Platform</span>
          <h1>Run ad operations from one place.</h1>
          <p>Manage campaigns, theater inventory, reseller deals and bookings through a single React frontend connected to your backend.</p>
        </div>
        <div className="hero-panel">
          <div className="hero-stat"><strong>24/7</strong><span>Campaign visibility</span></div>
          <div className="hero-stat"><strong>Role-based</strong><span>Admin, theater owner, reseller</span></div>
          <div className="hero-stat"><strong>Live API</strong><span>Connected to localhost:5000</span></div>
        </div>
      </section>

      <PageHeader eyebrow="Featured Ads" title="Campaign library" description="Browse ad creatives from backend. Both video and image ads are supported." />
      {loading ? <div className="status-card">Loading campaigns...</div> : null}
      {error ? <div className="status-card status-warning">{error}</div> : null}

      <section className="card-grid">
        {ads.map((ad) => <MediaCard key={ad.id} item={ad} />)}
      </section>
    </div>
  );
}

export default HomePage;
