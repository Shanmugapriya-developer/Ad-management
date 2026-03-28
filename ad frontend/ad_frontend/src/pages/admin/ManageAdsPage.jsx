import React, { useEffect, useState } from 'react';
import FormField from '../../components/FormField';
import MediaCard from '../../components/MediaCard';
import PageHeader from '../../components/PageHeader';
import { createAd, getAds } from '../../services/adService';
import adCity from '../../assets/ad-city.svg';

const initialForm = {
  title: '',
  description: '',
  category: 'Retail',
  budget: '',
  duration: '',
  mediaUrl: adCity,
  mediaType: 'image',
};

function ManageAdsPage() {
  const [form, setForm] = useState(initialForm);
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchAds = async () => {
    setLoading(true);
    try {
      const response = await getAds();
      setAds(Array.isArray(response) ? response : response?.ads || response?.data || []);
    } catch (err) {
      setError(err?.response?.data?.message || 'Could not load ads.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');
    try {
      await createAd(form);
      setSuccess('Ad created successfully.');
      setForm(initialForm);
      fetchAds();
    } catch (err) {
      setError(err?.response?.data?.message || 'Ad creation failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container page-stack">
      <PageHeader eyebrow="Admin" title="Manage ads" description="Create new ads and view backend ad inventory." />
      <div className="split-layout">
        <div className="panel">
          <h2>Create Ad</h2>
          <form className="form-grid" onSubmit={handleSubmit}>
            <FormField label="Title" name="title" value={form.title} onChange={handleChange} required />
            <FormField label="Description" name="description" as="textarea" rows="4" value={form.description} onChange={handleChange} required />
            <FormField label="Category" name="category" value={form.category} onChange={handleChange} required />
            <FormField label="Budget" name="budget" value={form.budget} onChange={handleChange} required />
            <FormField label="Duration" name="duration" value={form.duration} onChange={handleChange} required />
            <FormField label="Media URL" name="mediaUrl" value={form.mediaUrl} onChange={handleChange} required />
            <FormField label="Media Type" name="mediaType" as="select" value={form.mediaType} onChange={handleChange} options={[{ value: 'image', label: 'Image' }, { value: 'video', label: 'Video' }]} />
            {error ? <div className="status-card status-error">{error}</div> : null}
            {success ? <div className="status-card status-success">{success}</div> : null}
            <button className="button" type="submit" disabled={submitting}>{submitting ? 'Saving...' : 'Create Ad'}</button>
          </form>
        </div>
        <div className="panel">
          <h2>Ad Inventory</h2>
          {loading ? <div className="status-card">Loading ads...</div> : null}
          <div className="card-grid">
            {ads.map((ad, index) => (
              <MediaCard key={ad?._id || ad?.id || index} item={{ ...ad, mediaUrl: ad?.mediaUrl || ad?.image || adCity, mediaType: ad?.mediaType || 'image' }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageAdsPage;
