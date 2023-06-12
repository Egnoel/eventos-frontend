import '../globals.css';
import './styles.css';

export const metadata = {
  title: 'Sign',
  description: 'Access to the application',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <main className="flex items-center justify-center h-calc">
          <div className="screen">
            <div className="screen__content">{children}</div>
            <div className="screen__background">
              <span className="screen__background__shape screen__background__shape4"></span>
              <span className="screen__background__shape screen__background__shape3"></span>
              <span className="screen__background__shape screen__background__shape2"></span>
              <span className="screen__background__shape screen__background__shape1"></span>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
