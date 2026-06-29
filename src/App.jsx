import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import QuickViewModal from './components/QuickViewModal';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Wishlist from './pages/Wishlist';
import MyOrders from './pages/MyOrders';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';


import WhatsAppButton from './components/WhatsAppButton';

// Layout with Navbar + Footer
const MainLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
    <QuickViewModal />
    <WhatsAppButton />
  </>
);

// Admin layout (no navbar/footer)
const AdminLayout = ({ children }) => (
  <>
    {children}
    <QuickViewModal />
  </>
);

// Inner App with access to context
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />
      <Route
        path="/shop"
        element={
          <MainLayout>
            <Shop />
          </MainLayout>
        }
      />
      <Route
        path="/about"
        element={
          <MainLayout>
            <About />
          </MainLayout>
        }
      />
      <Route
        path="/contact"
        element={
          <MainLayout>
            <Contact />
          </MainLayout>
        }
      />
      <Route
        path="/cart"
        element={
          <MainLayout>
            <Cart />
          </MainLayout>
        }
      />

      <Route
        path="/wishlist"
        element={
          <MainLayout>
            <Wishlist />
          </MainLayout>
        }
      />
      
      <Route
        path="/my-orders"
        element={
          <MainLayout>
            <MyOrders />
          </MainLayout>
        }
      />
      
      {/* Auth routes */}
      <Route
        path="/login"
        element={
          <MainLayout>
            <Login />
          </MainLayout>
        }
      />
      <Route
        path="/signup"
        element={
          <MainLayout>
            <Signup />
          </MainLayout>
        }
      />

      {/* Admin routes */}
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route
        path="/admin-portal"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <Admin />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route path="/privacy-policy" element={<MainLayout><PrivacyPolicy /></MainLayout>} />
      <Route path="/terms-of-service" element={<MainLayout><TermsOfService /></MainLayout>} />

      {/* Checkout & Order */}
      <Route path="/checkout" element={<MainLayout><Checkout /></MainLayout>} />
      <Route path="/order-success" element={<OrderSuccess />} />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <StoreProvider>
        <AppRoutes />
      </StoreProvider>
    </BrowserRouter>
  );
};

export default App;
