import React, { useEffect, useState } from 'react';
import PageHeader from '../../components/PageHeader';
import StatCard from '../../components/StatCard';
import { getAds } from '../../services/adService';
import { getBookings } from '../../services/bookingService';

function AdminDashboardPage() {
  const [stats, setStats] = useState({ ads: 0, bookings: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [adsResponse, bookingsResponse] = await Promise.all([getAds(), getBookings()]);
        const ads = Array.isArray(adsResponse) ? adsResponse : adsResponse?.ads || adsResponse?.data || [];
        const bookings = Array.isArray(bookingsResponse) ? bookingsResponse : bookingsResponse?.bookings || bookingsResponse?.data || [];
        setStats({ ads: ads.length, bookings: bookings.length });
      } catch (err) {
        setError(err?.response?.data?.message || 'Dashboard metrics could not be loaded.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="container page-stack">
      <PageHeader eyebrow="Admin" title="Operations dashboard" description="Quick overview of ads and bookings." />
      {error ? <div className="status-card status-error">{error}</div> : null}
      <section className="stats-grid">
        <StatCard label="Total Ads" value={loading ? '...' : stats.ads} hint="GET /ads" />
        <StatCard label="Total Bookings" value={loading ? '...' : stats.bookings} hint="GET /bookings" />
        <StatCard label="Campaign Health" value={loading ? '...' : 'Live'} hint="Backend connected" />
      </section>
    </div>
  );
}

export default AdminDashboardPage;
