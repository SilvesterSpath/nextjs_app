import Navbar from '@/components/Navbar';
import '@/assets/styles/globals.css';
import AuthProvider from '@/components/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import '@/assets/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'PropertyPulse | Find The Perfect Rental',
  description:
    'PropertyPulse is a platform that helps you find the perfect rental property in your area.',
  keywords:
    'property, rental, home, real estate, investment, real estate investment',
};

const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <html lang='en'>
        <body>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ToastContainer />
        </body>
      </html>
    </AuthProvider>
  );
};

export default MainLayout;
