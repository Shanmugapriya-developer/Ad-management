import React, { useState } from 'react';
import FormField from '../../components/FormField';
import PageHeader from '../../components/PageHeader';
import { sellAds } from '../../services/resellerService';

function SellAdsPage() {
  const [form, setForm] = useState({ adId: '', clientName: '', salePrice: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');
    try {
      await sellAds(form);
      setSuccess('Ad inventory sold successfully.');
      setForm({ adId: '', clientName: '', salePrice: '' });
    } catch (err) {
      setError(err?.response?.data?.message || 'Could not sell ads.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container narrow page-stack">
      <PageHeader eyebrow="Reseller" title="Sell ads" description="Capture reseller sales through backend." />
      <div className="panel">
        <form className="form-grid" onSubmit={handleSubmit}>
          <FormField label="Ad ID" name="adId" value={form.adId} onChange={handleChange} required />
          <FormField label="Client Name" name="clientName" value={form.clientName} onChange={handleChange} required />
          <FormField label="Sale Price" name="salePrice" value={form.salePrice} onChange={handleChange} required />
          {error ? <div className="status-card status-error">{error}</div> : null}
          {success ? <div className="status-card status-success">{success}</div> : null}
          <button className="button" type="submit" disabled={submitting}>{submitting ? 'Processing...' : 'Sell Ads'}</button>
        </form>
      </div>
    </div>
  );
}

export default SellAdsPage;
