// src/pages/PrivacyPolicy.jsx
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  // Function to scroll to top when clicking "Back to Home"
  const handleBackToHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-serif text-gray-800 mb-4">Privacy Policy</h1>
        <p className="text-gray-500 text-sm mb-8">Last updated: April 2026</p>
        
        <div className="space-y-6 text-gray-600">
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Information We Collect</h2>
            <p>At Caballero Casual, we collect information you provide directly to us, such as when you create an account, place an order, or contact us. This may include your name, email address, phone number, shipping address, and payment details.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">2. How We Use Your Information</h2>
            <p>We use your information to process orders, communicate with you about your purchases, personalize your shopping experience, and improve our services. We never sell your personal data to third parties.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">3. Data Security</h2>
            <p>We implement industry-standard security measures to protect your personal information. All transactions are encrypted using SSL technology.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal information. Contact us at <a href="mailto:privacy@caballerocasual.com" className="text-amber-600 hover:underline">privacy@caballerocasual.com</a> for any privacy-related requests.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Contact Us</h2>
            <p>If you have questions about this Privacy Policy, please contact us at <a href="mailto:hello@caballerocasual.com" className="text-amber-600 hover:underline">hello@caballerocasual.com</a>.</p>
          </section>
        </div>
        
        <div className="mt-10 pt-6 border-t border-gray-200 text-center">
          <Link 
            to="/" 
            onClick={handleBackToHome}
            className="text-amber-600 hover:underline inline-flex items-center gap-2"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;