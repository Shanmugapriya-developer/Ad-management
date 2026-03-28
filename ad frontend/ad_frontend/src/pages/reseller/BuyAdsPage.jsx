import React, { useState } from 'react';
import FormField from '../../components/FormField';
import PageHeader from '../../components/PageHeader';
import { buyAds } from '../../services/resellerService';

function BuyAdsPage() {
  const [form, setForm] = useState({ adId: '', quantity: '', purchasePrice: '' });
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
      await buyAds(form);
      setSuccess('Ad inventory purchased successfully.');
      setForm({ adId: '', quantity: '', purchasePrice: '' });
    } catch (err) {
      setError(err?.response?.data?.message || 'Could not buy ads.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container narrow page-stack">
      <PageHeader eyebrow="Reseller" title="Buy ads" description="Purchase ad slots through reseller buy API." />
      <div className="panel">
        <form className="form-grid" onSubmit={handleSubmit}>
          <FormField label="Ad ID" name="adId" value={form.adId} onChange={handleChange} required />
          <FormField label="Quantity" name="quantity" value={form.quantity} onChange={handleChange} required />
          <FormField label="Purchase Price" name="purchasePrice" value={form.purchasePrice} onChange={handleChange} required />
          {error ? <div className="status-card status-error">{error}</div> : null}
          {success ? <div className="status-card status-success">{success}</div> : null}
          <button className="button" type="submit" disabled={submitting}>{submitting ? 'Processing...' : 'Buy Ads'}</button>
        </form>
      </div>
    </div>
  );
}

export default BuyAdsPage;
