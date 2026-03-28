import React, { useEffect, useState } from 'react';
import PageHeader from '../../components/PageHeader';
import StatCard from '../../components/StatCard';
import { getAds } from '../../services/adService';
import { getBookings } from '../../services/bookingService';

function ResellerDashboardPage() {
  const [stats, setStats] = useState({ ads: 0, bookings: 0, commission: '12%' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [adsResponse, bookingsResponse] = await Promise.all([getAds(), getBookings()]);
        const ads = Array.isArray(adsResponse) ? adsResponse : adsResponse?.ads || adsResponse?.data || [];
        const bookings = Array.isArray(bookingsResponse) ? bookingsResponse : bookingsResponse?.bookings || bookingsResponse?.data || [];
        setStats({ ads: ads.length, bookings: bookings.length, commission: '12%' });
      } catch (err) {
        setError(err?.response?.data?.message || 'Reseller dashboard could not be loaded.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="container page-stack">
      <PageHeader eyebrow="Reseller" title="Reseller dashboard" description="Monitor inventory, bookings and commission." />
      {error ? <div className="status-card status-error">{error}</div> : null}
      <section className="stats-grid">
        <StatCard label="Ad Inventory" value={loading ? '...' : stats.ads} />
        <StatCard label="Dealable Bookings" value={loading ? '...' : stats.bookings} />
        <StatCard label="Commission" value={loading ? '...' : stats.commission} />
      </section>
    </div>
  );
}

export default ResellerDashboardPage;
