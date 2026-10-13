import React, { useState } from 'react';
import { 
  Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2, 
  Sparkles, Clock, ShieldCheck 
} from 'lucide-react';
import { api } from '../services/api';

export default function Contact({ notify }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Trip Inquiry',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      notify('Please fill in all required fields', 'error');
      return;
    }

    setLoading(true);
    try {
      const res = await api.submitContact(formData);
      setTicketId(res.ticketId);
      setSubmitted(true);
      notify('Your message has been sent successfully!', 'success');
    } catch (err) {
      notify('Failed to send message: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-kizunaa-navy-950 font-['Outfit']">
          We’re Here for Your Journey
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">
          Have feedback on our AI itineraries, need help planning a college group trip, or looking to partner? Reach out to the Kizunaa crew.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Information Card */}
        <div className="md:col-span-5 bg-gradient-to-br from-kizunaa-navy-950 to-kizunaa-navy-900 text-white rounded-3xl p-8 space-y-6 shadow-2xl relative overflow-hidden">
          <div className="space-y-2">
            <h3 className="text-xl font-bold font-['Outfit'] text-white">Kizunaa Travel Desk</h3>
            <p className="text-xs text-slate-300">
              Dedicated support for travelers, student clubs, and tourism partners across South India.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-white/10 text-amber-400 shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-white block">Regional Headquarters:</span>
                <span className="text-slate-300">Visakhapatnam &amp; Hyderabad Tech Hubs, India</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-white/10 text-amber-400 shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-white block">Email Support:</span>
                <span className="text-slate-300">support@kizunaa.travel</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-white/10 text-amber-400 shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-white block">Response Time:</span>
                <span className="text-slate-300">Typically within 4 business hours</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 text-[11px] text-amber-200/90 leading-relaxed">
            ⚡ Are you a college travel club president? Mention your student council ID in the message for priority group bookings and exclusive dorm vouchers!
          </div>
        </div>

        {/* Right Contact Form */}
        <div className="md:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-premium">
          {submitted ? (
            <div className="text-center py-8 space-y-4 animate-fadeIn">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200">
                  Ticket #{ticketId}
                </span>
                <h3 className="text-xl font-bold text-slate-900 font-['Outfit'] mt-2">
                  Message Dispatched!
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Thank you, {formData.name}. Our team has received your inquiry and will respond to {formData.email} shortly.
                </p>
              </div>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', subject: 'General Trip Inquiry', message: '' });
                }}
                className="px-5 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Gowtham Kudipudi"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Subject / Category
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-amber-500 bg-white"
                >
                  <option value="General Trip Inquiry">General Trip Inquiry</option>
                  <option value="College Club / Group Booking">College Club / Group Booking</option>
                  <option value="Partner Collaboration">Partner Collaboration</option>
                  <option value="Feedback / Bug Report">Feedback / Bug Report</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Your Message *
                </label>
                <textarea
                  rows="4"
                  required
                  placeholder="How can Kizunaa help you plan your next Indian adventure?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-kizunaa-navy-950 hover:bg-kizunaa-navy-900 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <span>{loading ? 'Sending Message...' : 'Send Message to Kizunaa'}</span>
                <Send className="w-3.5 h-3.5 text-amber-400" />
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
}
