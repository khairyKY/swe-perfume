import { useState } from 'react';
import { vendorApply } from '../api/auth';
import useAuth from '../hooks/useAuth';

const VendorApplyPage = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({ brandName: '', bio: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('');
    setLoading(true);
    try {
      await vendorApply(form);
      setStatus('Application submitted. Our team will reach out soon.');
      setForm({ brandName: '', bio: '' });
    } catch (error) {
      setStatus('Unable to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-xl bg-surface-container-lowest border border-outline-variant p-8">
        <h1 className="font-headline-lg text-on-surface mb-2">
          Vendor Application
        </h1>
        <p className="text-on-surface-variant mb-6">
          Share your brand story and we will review your request.
        </p>
        {!user ? (
          <p className="text-error">
            Please sign in before submitting a vendor application.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              className="w-full bg-transparent border-0 border-b border-outline-variant py-2 focus:ring-0 focus:border-primary"
              placeholder="Brand Name"
              type="text"
              name="brandName"
              value={form.brandName}
              onChange={handleChange}
              required
            />
            <textarea
              className="w-full bg-transparent border border-outline-variant py-2 px-3 focus:ring-0 focus:border-primary h-32"
              placeholder="Brand Bio"
              name="bio"
              value={form.bio}
              onChange={handleChange}
              required
            />
            {status ? (
              <p className="text-on-surface-variant">{status}</p>
            ) : null}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-on-primary py-3 font-label-caps uppercase tracking-widest hover:bg-stone-800 transition-colors disabled:opacity-60"
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default VendorApplyPage;
