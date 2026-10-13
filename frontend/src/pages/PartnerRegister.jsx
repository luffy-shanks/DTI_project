import React, { useState } from 'react';
import { 
  Building2, Sparkles, CheckCircle2, ShieldCheck, Mail, Phone, 
  MapPin, FileText, ArrowRight, AlertCircle 
} from 'lucide-react';
import { api } from '../services/api';

export default function PartnerRegister({ notify }) {
  const [formData, setFormData] = useState({
    businessName: '',
    contactPerson: '',
    email: '',
    phone: '',
    category: 'Hotel / Homestay',
    city: 'Araku Valley',
    state: 'Andhra Pradesh',
    description: '',
    gstOrLicense: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [partnerId, setPartnerId] = useState('');
  const [loading, setLoading] = useState(false);

  const categories = [
    'Hotel / Homestay / Eco-Resort',
    'Tour Operator / Trekking Agency',
    'Transport Provider / Taxi Fleet',
    'Local Certified Guide / Heritage Host',
    'Restaurant / Authentic Food Stall'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.businessName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      notify('Please fill out all mandatory fields', 'error');
      return;
    }

    setLoading(true);
    try {
      const res = await api.registerPartner(formData);
      setPartnerId(res.partnerId);
      setSubmitted(true);
      notify('Partner application submitted successfully!', 'success');
    } catch (err) {
      notify('Error submitting application: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          Official Tourism Partner Onboarding
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-kizunaa-navy-950 font-['Outfit']">
          Grow Your Business with Kizunaa
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">
          Connect directly with thousands of college travelers, families, and solo tourists visiting Andhra Pradesh and Telangana.
        </p>
      </div>

      {submitted ? (
        /* Confirmation State */
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-premium text-center max-w-xl mx-auto space-y-6 animate-fadeIn">
          <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200">
              Registration Ref: {partnerId}
            </span>
            <h2 className="text-2xl font-bold text-slate-900 font-['Outfit']">
              Application Under Review
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
              Thank you, <strong>{formData.businessName}</strong>. To maintain quality standards for our travelers, each applicant undergoes background and license verification before receiving the official Kizunaa Verified Partner badge.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2">
            <p><strong>Next Steps:</strong></p>
            <p className="text-slate-600">1. Our local tourism partner manager will call {formData.phone} within 48 hours.</p>
            <p className="text-slate-600">2. Once verified, your listings will automatically display inside Kizunaa AI itineraries.</p>
          </div>

          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                businessName: '',
                contactPerson: '',
                email: '',
                phone: '',
                category: 'Hotel / Homestay',
                city: 'Araku Valley',
                state: 'Andhra Pradesh',
                description: '',
                gstOrLicense: ''
              });
            }}
            className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50"
          >
            Submit Another Business
          </button>
        </div>
      ) : (
        /* Registration Form */
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-premium space-y-6">
          
          {/* Important Verification Disclaimer */}
          <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-900">
            <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Verification Policy:</p>
              <p className="text-amber-800 leading-relaxed mt-0.5">
                Kizunaa values traveler safety. Submitting this form creates a pending application. No business is displayed with our official verified badge until document review and telephone confirmation are concluded.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Business / Agency Name *
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Araku Eco Coffee Homestay"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full pl-10 pr-3.5 py-3 rounded-2xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Primary Contact Person *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Naidu"
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  className="w-full px-3.5 py-3 rounded-2xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    placeholder="bookings@yourbusiness.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-3.5 py-3 rounded-2xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Phone / WhatsApp Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-10 pr-3.5 py-3 rounded-2xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Service Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-3 rounded-2xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-amber-500 bg-white"
                >
                  {categories.map((c, i) => (
                    <option key={i} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Operating City *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Araku, Vizag, Hyderabad"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3.5 py-3 rounded-2xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  State *
                </label>
                <select
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full px-3.5 py-3 rounded-2xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-amber-500 bg-white"
                >
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Other">Other State</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                GST Number / Tourism Dept License (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. 36AAAAA0000A1Z5 or State Tourism Registration #"
                value={formData.gstOrLicense}
                onChange={(e) => setFormData({ ...formData, gstOrLicense: e.target.value })}
                className="w-full px-3.5 py-3 rounded-2xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Tell us about your property / service &amp; special pricing for students
              </label>
              <textarea
                rows="4"
                placeholder="Describe your rooms, tours, vehicle models, or unique regional dining specialties..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3.5 py-3 rounded-2xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-kizunaa-navy-950 font-bold text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <span>{loading ? 'Submitting Application...' : 'Submit Official Partner Application'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>
        </div>
      )}

    </div>
  );
}
