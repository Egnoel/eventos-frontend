import '../globals.css';
import Navbar from './components/Navbar';
import { SocketProvider } from './context/SocketProvider';
import { ToastContainer } from 'react-toastify';

export const metadata = {
  title: 'Kamba Eventos',
  description: 'Create, Share and participate in the best events available',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col bg-[#f0f5fb]">
        <SocketProvider>
          <ToastContainer />
          <Navbar />
          {children}
        </SocketProvider>
      </body>
    </html>
  );
}
