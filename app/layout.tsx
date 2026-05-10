import Footer from '@/components/Footer';
import Header from '@/components/Header';
import './globals.css';
import { pretendard } from './fonts';
import ThemeProvider from '@/components/ThemeProvider';
import ThemeToggle from '@/components/common/ThemeToggleBtn';
import ScrollToTopBtn from '@/components/button/ScrollToTop';
// import KakaoScript from './services/KakaoScript';

// declare global {
//   interface Window {
//     Kakao: any; // eslint-disable-line @typescript-eslint/no-explicit-any
//   }
// }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body className="--font-pretendard relative">
        <ThemeProvider>
          <Header />
          <main className="pt-32">
            {children}
            {/* <KakaoScript /> */}
          </main>
          <div className="flex flex-col right-12 bottom-10 gap-7.5 absolute">
            <ScrollToTopBtn />
            <ThemeToggle />
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
