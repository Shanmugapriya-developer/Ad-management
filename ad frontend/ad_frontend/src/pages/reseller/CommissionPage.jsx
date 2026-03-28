import React, { useMemo, useState } from 'react';
import FormField from '../../components/FormField';
import PageHeader from '../../components/PageHeader';

function CommissionPage() {
  const [form, setForm] = useState({ saleValue: '', commissionRate: '12' });

  const commission = useMemo(() => {
    const saleValue = Number(form.saleValue) || 0;
    const rate = Number(form.commissionRate) || 0;
    return ((saleValue * rate) / 100).toFixed(2);
  }, [form]);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <div className="container narrow page-stack">
      <PageHeader eyebrow="Reseller" title="Commission calculator" description="Estimate reseller earnings." />
      <div className="panel">
        <div className="form-grid">
          <FormField label="Sale Value" name="saleValue" value={form.saleValue} onChange={handleChange} />
          <FormField label="Commission Rate (%)" name="commissionRate" value={form.commissionRate} onChange={handleChange} />
        </div>
        <div className="highlight-card">
          <span>Estimated Commission</span>
          <strong>₹{commission}</strong>
        </div>
      </div>
    </div>
  );
}

export default CommissionPage;
