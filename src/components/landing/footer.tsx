import Link from 'next/link';

import Container from './container';
import { Icons } from '../icon/icons';

const footerLinks = {
  sns: [
    {
      label: 'GitHub',
      icon: Icons.FaGithub,
      href: 'https://github.com/takeshi0518',
    },
    {
      label: 'X(Twitter)',
      icon: Icons.FaXTwitter,
      href: 'https://x.com/y_takeshi0518',
    },
  ],
  service: [
    { label: '機能', href: '#features' },
    { label: '使い方', href: '#usage' },
    { label: 'デモ', href: '/demo' },
  ],
  account: [
    { label: 'ログイン', href: '/login' },
    { label: '新規登録', href: '/signup' },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <Container>
        <div className="py-8 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* ブランド情報 */}
            <div>
              <h3 className="font-bold text-lg mb-4">Growth Finder</h3>
              <p className="text-sm text-muted-foreground">
                スタッフの成長を可視化し、
                <br />
                関係性構築を支援する
                <br />
                人材育成ツール
              </p>
            </div>
            {/* SNSリンク */}
            <div>
              <h4 className="font-semibold mb-4">SNS</h4>
              <div className="flex gap-4">
                {footerLinks.sns.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label={link.label}
                      key={link.label}
                    >
                      <Icon className="w-5 h-5" />
                    </Link>
                  );
                })}
              </div>
            </div>
            {/* リンク */}
            <div>
              <h4 className="font-semibold mb-4">サービス</h4>
              <ul className="space-y-2 text-sm">
                {footerLinks.service.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* アカウント */}
            <div>
              <h4 className="font-semibold mb-4">アカウント</h4>
              <ul className="space-y-2 text-sm">
                {footerLinks.account.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
      {/* コピーライト */}
      <div className="border-t mt-8 pt-8 mb-8 text-center text-sm text-muted-foreground">
        <p>
          &copy; {new Date().getFullYear()} Growth Finder. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
