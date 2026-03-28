import React, { useEffect, useState } from 'react';
import PageHeader from '../../components/PageHeader';
import { getBookings } from '../../services/bookingService';

function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const response = await getBookings();
        setBookings(Array.isArray(response) ? response : response?.bookings || response?.data || []);
      } catch (err) {
        setError(err?.response?.data?.message || 'Could not fetch bookings.');
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="container page-stack">
      <PageHeader eyebrow="Theater Owner" title="My bookings" description="Bookings returned by backend." />
      {loading ? <div className="status-card">Loading bookings...</div> : null}
      {error ? <div className="status-card status-error">{error}</div> : null}
      <div className="list-stack">
        {bookings.map((booking, index) => (
          <div className="list-card" key={booking?._id || booking?.id || index}>
            <strong>{booking?.adName || booking?.adId || 'Booking'}</strong>
            <span>Theater: {booking?.theaterName || booking?.theaterId || 'N/A'}</span>
            <small>{booking?.startDate || 'Start date pending'} to {booking?.endDate || 'End date pending'}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyBookingsPage;
