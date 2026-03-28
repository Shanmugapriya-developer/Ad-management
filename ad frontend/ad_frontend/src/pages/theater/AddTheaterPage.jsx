import React, { useState } from 'react';
import FormField from '../../components/FormField';
import PageHeader from '../../components/PageHeader';
import { createScreen } from '../../services/screenService';
import { createTheater } from '../../services/theaterService';

function AddTheaterPage() {
  const [theaterForm, setTheaterForm] = useState({ name: '', city: '', address: '', seats: '' });
  const [screenForm, setScreenForm] = useState({ theaterId: '', name: '', screenType: '2D', capacity: '' });
  const [loadingTheater, setLoadingTheater] = useState(false);
  const [loadingScreen, setLoadingScreen] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleTheaterChange = (e) => setTheaterForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleScreenChange = (e) => setScreenForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const submitTheater = async (e) => {
    e.preventDefault();
    setLoadingTheater(true);
    setError('');
    setSuccess('');
    try {
      const response = await createTheater(theaterForm);
      const createdId = response?.theater?._id || response?.data?._id || response?._id || '';
      setScreenForm((prev) => ({ ...prev, theaterId: createdId }));
      setSuccess('Theater added successfully. Now add screen.');
      setTheaterForm({ name: '', city: '', address: '', seats: '' });
    } catch (err) {
      setError(err?.response?.data?.message || 'Theater creation failed.');
    } finally {
      setLoadingTheater(false);
    }
  };

  const submitScreen = async (e) => {
    e.preventDefault();
    setLoadingScreen(true);
    setError('');
    setSuccess('');
    try {
      await createScreen(screenForm);
      setSuccess('Screen created successfully.');
      setScreenForm({ theaterId: '', name: '', screenType: '2D', capacity: '' });
    } catch (err) {
      setError(err?.response?.data?.message || 'Screen creation failed.');
    } finally {
      setLoadingScreen(false);
    }
  };

  return (
    <div className="container page-stack">
      <PageHeader eyebrow="Theater Owner" title="Add theater" description="Create theaters and screens." />
      <div className="split-layout">
        <div className="panel">
          <h2>Create Theater</h2>
          <form className="form-grid" onSubmit={submitTheater}>
            <FormField label="Theater Name" name="name" value={theaterForm.name} onChange={handleTheaterChange} required />
            <FormField label="City" name="city" value={theaterForm.city} onChange={handleTheaterChange} required />
            <FormField label="Address" name="address" as="textarea" rows="4" value={theaterForm.address} onChange={handleTheaterChange} required />
            <FormField label="Seats" name="seats" value={theaterForm.seats} onChange={handleTheaterChange} required />
            {error ? <div className="status-card status-error">{error}</div> : null}
            {success ? <div className="status-card status-success">{success}</div> : null}
            <button className="button" type="submit" disabled={loadingTheater}>{loadingTheater ? 'Saving...' : 'Add Theater'}</button>
          </form>
        </div>
        <div className="panel">
          <h2>Add Screen</h2>
          <form className="form-grid" onSubmit={submitScreen}>
            <FormField label="Theater ID" name="theaterId" value={screenForm.theaterId} onChange={handleScreenChange} required />
            <FormField label="Screen Name" name="name" value={screenForm.name} onChange={handleScreenChange} required />
            <FormField label="Screen Type" name="screenType" as="select" value={screenForm.screenType} onChange={handleScreenChange} options={[{ value: '2D', label: '2D' }, { value: '3D', label: '3D' }, { value: 'IMAX', label: 'IMAX' }]} />
            <FormField label="Capacity" name="capacity" value={screenForm.capacity} onChange={handleScreenChange} required />
            <button className="button button-secondary" type="submit" disabled={loadingScreen}>{loadingScreen ? 'Saving...' : 'Add Screen'}</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddTheaterPage;
