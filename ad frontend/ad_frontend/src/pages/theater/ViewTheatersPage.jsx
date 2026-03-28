import React, { useEffect, useState } from 'react';
import PageHeader from '../../components/PageHeader';
import { getTheaters } from '../../services/theaterService';

function ViewTheatersPage() {
  const [theaters, setTheaters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTheaters = async () => {
      setLoading(true);
      try {
        const response = await getTheaters();
        setTheaters(Array.isArray(response) ? response : response?.theaters || response?.data || []);
      } catch (err) {
        setError(err?.response?.data?.message || 'Could not fetch theaters.');
      } finally {
        setLoading(false);
      }
    };
    fetchTheaters();
  }, []);

  return (
    <div className="container page-stack">
      <PageHeader eyebrow="Theater Owner" title="View theaters" description="Theaters fetched from backend." />
      {loading ? <div className="status-card">Loading theaters...</div> : null}
      {error ? <div className="status-card status-error">{error}</div> : null}
      <div className="list-stack">
        {theaters.map((theater, index) => (
          <div className="list-card" key={theater?._id || theater?.id || index}>
            <strong>{theater?.name || 'Unnamed Theater'}</strong>
            <span>{theater?.city || 'Unknown City'}</span>
            <small>{theater?.address || 'Address not available'}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewTheatersPage;
