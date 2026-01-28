import Link from 'next/link';
import { Button } from './ui/button';

export default function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold">
          Growth Finder
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="#features"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            機能
          </Link>
          <Link
            href="#usage"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            使い方
          </Link>
          <Link
            href="/login"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Button variant="ghost" size="sm" className="cursor-pointer">
              ログイン
            </Button>
          </Link>
          <Link
            href="/signup"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Button size="sm" className="cursor-pointer">
              新規登録
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
