import React, { useState } from 'react';
import FormField from '../../components/FormField';
import PageHeader from '../../components/PageHeader';
import { registerUser } from '../../services/userService';

const initialForm = {
  name: '',
  mobile: '',
  email: '',
  password: '',
  role: 'theater_owner',
};

function ManageUsersPage() {
  const [form, setForm] = useState(initialForm);
  const [users, setUsers] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
      const response = await registerUser(form);
      const createdUser = response?.user || response?.data || form;
      setUsers((prev) => [{ ...createdUser, id: Date.now() }, ...prev]);
      setSuccess('User registered successfully.');
      setForm(initialForm);
    } catch (err) {
      setError(err?.response?.data?.message || 'User registration failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container page-stack">
      <PageHeader eyebrow="Admin" title="Manage users" description="Register admin, theater owner and reseller users." />
      <div className="split-layout">
        <div className="panel">
          <h2>Create User</h2>
          <form className="form-grid" onSubmit={handleSubmit}>
            <FormField label="Name" name="name" value={form.name} onChange={handleChange} required />
            <FormField label="Mobile" name="mobile" value={form.mobile} onChange={handleChange} required />
            <FormField label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
            <FormField label="Password" name="password" type="password" value={form.password} onChange={handleChange} required />
            <FormField label="Role" name="role" as="select" value={form.role} onChange={handleChange} options={[{ value: 'admin', label: 'Admin' }, { value: 'theater_owner', label: 'Theater Owner' }, { value: 'reseller', label: 'Reseller' }]} />
            {error ? <div className="status-card status-error">{error}</div> : null}
            {success ? <div className="status-card status-success">{success}</div> : null}
            <button className="button" type="submit" disabled={submitting}>{submitting ? 'Creating...' : 'Register User'}</button>
          </form>
        </div>
        <div className="panel">
          <h2>Recently Created Users</h2>
          {users.length === 0 ? <div className="status-card">No users created in this session yet.</div> : null}
          <div className="list-stack">
            {users.map((user) => (
              <div className="list-card" key={user.id}>
                <strong>{user.name || 'Unnamed User'}</strong>
                <span>{user.email || user.mobile}</span>
                <small>{user.role}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageUsersPage;
