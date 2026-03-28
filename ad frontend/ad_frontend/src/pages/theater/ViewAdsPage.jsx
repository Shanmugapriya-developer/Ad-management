import React, { useEffect, useState } from 'react';
import MediaCard from '../../components/MediaCard';
import PageHeader from '../../components/PageHeader';
import { getAds } from '../../services/adService';
import adLaunch from '../../assets/ad-launch.svg';

function ViewAdsPage() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAds = async () => {
      setLoading(true);
      try {
        const response = await getAds();
        setAds(Array.isArray(response) ? response : response?.ads || response?.data || []);
      } catch (err) {
        setError(err?.response?.data?.message || 'Could not fetch ads.');
      } finally {
        setLoading(false);
      }
    };
    fetchAds();
  }, []);

  return (
    <div className="container page-stack">
      <PageHeader eyebrow="Theater Owner" title="View ads" description="Review campaigns before booking inventory." />
      {loading ? <div className="status-card">Loading ads...</div> : null}
      {error ? <div className="status-card status-error">{error}</div> : null}
      <section className="card-grid">
        {ads.map((ad, index) => (
          <MediaCard key={ad?._id || ad?.id || index} item={{ ...ad, mediaUrl: ad?.mediaUrl || ad?.image || adLaunch, mediaType: ad?.mediaType || 'image' }} />
        ))}
      </section>
    </div>
  );
}

export default ViewAdsPage;
