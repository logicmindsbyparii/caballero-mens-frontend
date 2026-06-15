import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const TermsOfService = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleBackToHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-serif text-gray-800 mb-4">Terms of Service</h1>
        <p className="text-gray-500 text-sm mb-8">Last updated: April 2026</p>
        
        <div className="space-y-6 text-gray-600">
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Acceptance of Terms</h2>
            <p>By accessing or using the Caballero Casual website, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">2. Products & Pricing</h2>
            <p>We strive to display accurate product information and pricing. However, errors may occur. We reserve the right to correct any errors and cancel orders if necessary. Prices are subject to change without notice.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">3. Orders & Payments</h2>
            <p>When you place an order, you agree to provide current and accurate payment information. We accept major credit cards and digital payment methods. Order confirmation does not guarantee acceptance; we may cancel orders at our discretion.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Shipping & Returns</h2>
            <p>Shipping times are estimates. We offer free shipping on orders above ₹1,999. Returns are accepted within 30 days of delivery, provided items are unused and in original packaging.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Intellectual Property</h2>
            <p>All content on this site (logos, images, text, designs) is the property of Caballero Casual and protected by copyright laws. Unauthorized use is prohibited.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">6. Limitation of Liability</h2>
            <p>To the fullest extent permitted by law, Caballero Casual shall not be liable for any indirect, incidental, or consequential damages arising from your use of our services.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">7. Contact Us</h2>
            <p>Questions about these Terms? Contact us at <a href="mailto:legal@caballerocasual.com" className="text-amber-600 hover:underline">legal@caballerocasual.com</a>.</p>
          </section>
        </div>
        
        <div className="mt-10 pt-6 border-t border-gray-200 text-center">
          <Link to="/" onClick={handleBackToHome} className="text-amber-600 hover:underline inline-flex items-center gap-2">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;