import type { Metadata } from "next";
import Link from "next/link";
import { Instagram, ShoppingBag } from "lucide-react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "한벌 | 매주 하나의 키즈 코디",
    template: "%s | 한벌",
  },
  description: "7일 동안만 주문받는 한 벌의 키즈 코디",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <header className="site-header">
          <Link className="brand" href="/" aria-label="한벌 홈">
            한벌
          </Link>
          <nav className="desktop-nav" aria-label="주요 메뉴">
            <Link href="/">이번 주</Link>
            <Link href="/archive">지난 한 벌</Link>
            <Link href="/about">이용 안내</Link>
          </nav>
          <div className="header-actions">
            <a
              className="icon-button"
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="인스타그램"
              title="인스타그램"
            >
              <Instagram size={19} />
            </a>
            <Link
              className="icon-button"
              href="/orders"
              aria-label="주문 조회"
              title="주문 조회"
            >
              <ShoppingBag size={19} />
            </Link>
          </div>
        </header>
        {children}
        <footer className="site-footer">
          <div>
            <strong>한벌</strong>
            <p>매주 하나의 키즈 코디를 고릅니다.</p>
          </div>
          <div className="footer-links">
            <Link href="/about">이용 안내</Link>
            <Link href="/policies/privacy">개인정보처리방침</Link>
            <Link href="/admin">운영 데모</Link>
          </div>
          <p className="business-note">
            현재 화면은 사업 검증을 위한 데모입니다. 실제 판매 전 사업자 정보,
            통신판매업 신고, 안전·인증 정보를 연결해야 합니다.
          </p>
        </footer>
      </body>
    </html>
  );
}
