import React, { useEffect, useState } from 'react';
import PageHeader from '../../components/PageHeader';
import StatCard from '../../components/StatCard';
import { getAds } from '../../services/adService';
import { getBookings } from '../../services/bookingService';
import { getTheaters } from '../../services/theaterService';

function TheaterDashboardPage() {
  const [stats, setStats] = useState({ theaters: 0, ads: 0, bookings: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [theatersResponse, adsResponse, bookingsResponse] = await Promise.all([getTheaters(), getAds(), getBookings()]);
        const theaters = Array.isArray(theatersResponse) ? theatersResponse : theatersResponse?.theaters || theatersResponse?.data || [];
        const ads = Array.isArray(adsResponse) ? adsResponse : adsResponse?.ads || adsResponse?.data || [];
        const bookings = Array.isArray(bookingsResponse) ? bookingsResponse : bookingsResponse?.bookings || bookingsResponse?.data || [];
        setStats({ theaters: theaters.length, ads: ads.length, bookings: bookings.length });
      } catch (err) {
        setError(err?.response?.data?.message || 'Theater dashboard could not be loaded.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="container page-stack">
      <PageHeader eyebrow="Theater Owner" title="Theater dashboard" description="Track theaters, ads and bookings." />
      {error ? <div className="status-card status-error">{error}</div> : null}
      <section className="stats-grid">
        <StatCard label="My Theaters" value={loading ? '...' : stats.theaters} />
        <StatCard label="Available Ads" value={loading ? '...' : stats.ads} />
        <StatCard label="My Bookings" value={loading ? '...' : stats.bookings} />
      </section>
    </div>
  );
}

export default TheaterDashboardPage;
