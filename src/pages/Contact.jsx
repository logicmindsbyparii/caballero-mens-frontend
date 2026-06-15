import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Check } from 'lucide-react';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <main className="min-h-screen pt-20">
      {/* Header */}
      <section className="border-b border-beige py-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <p className="section-subtitle mb-3">Get in Touch</p>
          <h1 className="section-title mb-3">Contact Us</h1>
          <div className="luxury-divider" />
          <p className="text-muted text-sm mt-6 leading-relaxed">
            Whether you have a question about our products, sizing, orders, or anything else —
            our team is here to help.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="font-serif text-2xl text-charcoal font-semibold">We'd love to hear from you</h2>
              <p className="text-muted text-sm leading-relaxed">
                Visit us at our store or reach out through any of our contact channels. We typically respond within 24 hours.
              </p>

              {[
                { Icon: MapPin, label: 'Visit Us', value: '123 Fashion Street, Ring Road, Surat, Gujarat 395007' },
                { Icon: Phone, label: 'Call Us', value: '+91 98765 43210', href: 'tel:+919876543210' },
                { Icon: Mail, label: 'Email Us', value: 'hello@caballerocasual.com', href: 'mailto:hello@caballerocasual.com' },
                { Icon: Clock, label: 'Store Hours', value: 'Mon – Sat: 10:00 AM – 8:00 PM' },
              ].map(({ Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4 p-4 rounded-xl border border-beige hover:border-brown transition-colors duration-300 group">
                  <div className="w-10 h-10 bg-brown/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-brown/20 transition-colors">
                    <Icon size={17} className="text-brown" />
                  </div>
                  <div>
                    <p className="text-xs tracking-widest uppercase font-medium text-muted mb-1">{label}</p>
                    {href ? (
                      <a href={href} className="text-sm text-charcoal hover:text-brown transition-colors">{value}</a>
                    ) : (
                      <p className="text-sm text-charcoal">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-[#c24b10] rounded-2xl p-8 border border-beige">
                {sent && (
                  <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-6 text-sm">
                    <Check size={15} />
                    Message sent! We'll get back to you soon.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs tracking-widest uppercase font-medium text-charcoal mb-2">Name *</label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Your full name"
                        className="w-full px-4 py-3 text-sm border border-beige rounded-xl bg-white focus:outline-none focus:border-brown transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs tracking-widest uppercase font-medium text-charcoal mb-2">Email *</label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 text-sm border border-beige rounded-xl bg-white focus:outline-none focus:border-brown transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs tracking-widest uppercase font-medium text-charcoal mb-2">Subject</label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      placeholder="What is this about?"
                      className="w-full px-4 py-3 text-sm border border-beige rounded-xl bg-white focus:outline-none focus:border-brown transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs tracking-widest uppercase font-medium text-charcoal mb-2">Message *</label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us how we can help..."
                      className="w-full px-4 py-3 text-sm border border-beige rounded-xl bg-white focus:outline-none focus:border-brown transition-colors resize-none"
                    />
                  </div>

                  <button
                    id="contact-submit-btn"
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-charcoal text-white text-sm tracking-widest uppercase font-medium rounded-xl hover:bg-brown transition-colors duration-300 disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={14} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
