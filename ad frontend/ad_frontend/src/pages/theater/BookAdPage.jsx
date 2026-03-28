import React, { useState } from 'react';
import FormField from '../../components/FormField';
import PageHeader from '../../components/PageHeader';
import { createBooking } from '../../services/bookingService';
import { createPayment } from '../../services/paymentService';
import { createQuotation } from '../../services/quotationService';

function BookAdPage() {
  const [quotationForm, setQuotationForm] = useState({ adId: '', theaterId: '', requestedBudget: '', notes: '' });
  const [bookingForm, setBookingForm] = useState({ adId: '', theaterId: '', screenId: '', startDate: '', endDate: '' });
  const [paymentForm, setPaymentForm] = useState({ bookingId: '', amount: '', paymentMethod: 'UPI' });
  const [loading, setLoading] = useState({ quotation: false, booking: false, payment: false });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const updateForm = (setter) => (e) => setter((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleQuotation = async (e) => {
    e.preventDefault();
    setLoading((prev) => ({ ...prev, quotation: true }));
    setError('');
    setSuccess('');
    try {
      await createQuotation(quotationForm);
      setSuccess('Quotation requested successfully.');
      setQuotationForm({ adId: '', theaterId: '', requestedBudget: '', notes: '' });
    } catch (err) {
      setError(err?.response?.data?.message || 'Quotation request failed.');
    } finally {
      setLoading((prev) => ({ ...prev, quotation: false }));
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading((prev) => ({ ...prev, booking: true }));
    setError('');
    setSuccess('');
    try {
      const response = await createBooking(bookingForm);
      const bookingId = response?.booking?._id || response?.data?._id || response?._id || '';
      setPaymentForm((prev) => ({ ...prev, bookingId }));
      setSuccess('Booking created successfully. Complete payment below.');
      setBookingForm({ adId: '', theaterId: '', screenId: '', startDate: '', endDate: '' });
    } catch (err) {
      setError(err?.response?.data?.message || 'Booking failed.');
    } finally {
      setLoading((prev) => ({ ...prev, booking: false }));
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading((prev) => ({ ...prev, payment: true }));
    setError('');
    setSuccess('');
    try {
      await createPayment(paymentForm);
      setSuccess('Payment submitted successfully.');
      setPaymentForm({ bookingId: '', amount: '', paymentMethod: 'UPI' });
    } catch (err) {
      setError(err?.response?.data?.message || 'Payment failed.');
    } finally {
      setLoading((prev) => ({ ...prev, payment: false }));
    }
  };

  return (
    <div className="container page-stack">
      <PageHeader eyebrow="Theater Owner" title="Book ad inventory" description="Quotation, booking and payment flow connected to backend." />
      {error ? <div className="status-card status-error">{error}</div> : null}
      {success ? <div className="status-card status-success">{success}</div> : null}
      <div className="three-up-layout">
        <div className="panel">
          <h2>Request Quotation</h2>
          <form className="form-grid" onSubmit={handleQuotation}>
            <FormField label="Ad ID" name="adId" value={quotationForm.adId} onChange={updateForm(setQuotationForm)} required />
            <FormField label="Theater ID" name="theaterId" value={quotationForm.theaterId} onChange={updateForm(setQuotationForm)} required />
            <FormField label="Requested Budget" name="requestedBudget" value={quotationForm.requestedBudget} onChange={updateForm(setQuotationForm)} required />
            <FormField label="Notes" name="notes" as="textarea" rows="4" value={quotationForm.notes} onChange={updateForm(setQuotationForm)} />
            <button className="button" type="submit" disabled={loading.quotation}>{loading.quotation ? 'Submitting...' : 'Request Quotation'}</button>
          </form>
        </div>
        <div className="panel">
          <h2>Create Booking</h2>
          <form className="form-grid" onSubmit={handleBooking}>
            <FormField label="Ad ID" name="adId" value={bookingForm.adId} onChange={updateForm(setBookingForm)} required />
            <FormField label="Theater ID" name="theaterId" value={bookingForm.theaterId} onChange={updateForm(setBookingForm)} required />
            <FormField label="Screen ID" name="screenId" value={bookingForm.screenId} onChange={updateForm(setBookingForm)} required />
            <FormField label="Start Date" name="startDate" type="date" value={bookingForm.startDate} onChange={updateForm(setBookingForm)} required />
            <FormField label="End Date" name="endDate" type="date" value={bookingForm.endDate} onChange={updateForm(setBookingForm)} required />
            <button className="button" type="submit" disabled={loading.booking}>{loading.booking ? 'Creating...' : 'Create Booking'}</button>
          </form>
        </div>
        <div className="panel">
          <h2>Submit Payment</h2>
          <form className="form-grid" onSubmit={handlePayment}>
            <FormField label="Booking ID" name="bookingId" value={paymentForm.bookingId} onChange={updateForm(setPaymentForm)} required />
            <FormField label="Amount" name="amount" value={paymentForm.amount} onChange={updateForm(setPaymentForm)} required />
            <FormField label="Method" name="paymentMethod" as="select" value={paymentForm.paymentMethod} onChange={updateForm(setPaymentForm)} options={[{ value: 'UPI', label: 'UPI' }, { value: 'Card', label: 'Card' }, { value: 'Netbanking', label: 'Netbanking' }]} />
            <button className="button button-secondary" type="submit" disabled={loading.payment}>{loading.payment ? 'Processing...' : 'Submit Payment'}</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookAdPage;
