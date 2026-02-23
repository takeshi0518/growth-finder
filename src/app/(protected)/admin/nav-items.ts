import { Icons } from '@/components/icon/icons';

export const adminNavItems = [
  { href: '/admin', label: 'ダッシュボード', icon: Icons.Gauge },
  { href: '/admin/staff', label: 'スタッフ管理', icon: Icons.Users },
  { href: '/admin/setting', label: '設定', icon: Icons.Settings },
] as const;
