import '../globals.css';
import NavbarWithDropdown from './components/NavbarWithDropdown';
import { SocketProvider } from './context/SocketProvider';


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
          <NavbarWithDropdown />
          <div className='w-full h-full px-10 py-20' >

          {children}
          </div>
        </SocketProvider>
      </body>
    </html>
  );
}
