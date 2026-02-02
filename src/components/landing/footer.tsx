import Link from 'next/link';
import Container from './container';
import { Icons } from '../icon/icons';

export default function Footer() {
  return (
    <footer>
      <div className="border-t bg-background">
        <Container>
          <div className="py-8 md:py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                  <Link
                    href="https://x.com/y_takeshi0518"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="X(Twitter)"
                  >
                    <Icons.FaXTwitter className="w-5 h-5" />
                  </Link>
                  <Link
                    href="https://github.com/takeshi0518"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="GitHub"
                  >
                    <Icons.FaGithub className="w-5 h-5" />
                  </Link>
                </div>
              </div>
              {/* リンク */}
              <div>
                <h4 className="font-semibold mb-4">サービス</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href="#features"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      機能
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#usage"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      使い方
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/demo"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      デモ
                    </Link>
                  </li>
                </ul>
              </div>
              {/* アカウント */}
              <div>
                <h4 className="font-semibold mb-4">アカウント</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href="/login"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      ログイン
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/signup"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      新規登録
                    </Link>
                  </li>
                </ul>
              </div>
              {/* コピーライト */}
            </div>
          </div>
        </Container>
        <div className="border-t mt-8 pt-8 mb-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Growth Finder. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
