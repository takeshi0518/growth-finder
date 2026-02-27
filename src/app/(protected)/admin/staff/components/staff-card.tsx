'use client';

import { Icons } from '@/components/icon/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';

type Staff = {
  id: string;
  name: string;
  role: string;
  store_name: string;
  avatar_url: string | null;
};
type StaffCardProps = {
  staff: Staff;
};

export default function StaffCard({ staff }: StaffCardProps) {
  return (
    <Card className="relative">
      <CardContent className="pb-4">
        <div className="absolute top-3 right-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8">
                <Icons.EllipsisVerticalIcon className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Icons.FileText className="mr-2 size-4" />
                詳細
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Icons.ClipboardList className="mr-2 size-4" />
                評価
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Icons.Pencil className="mr-2 size-4" />
                編集
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Icons.Trash2 className="mr-2 size-4" />
                削除
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex justify-center items-center">
          <div className="flex items-center gap-2">
            <div className="w-15 h-15 rounded-full bg-card flex items-center justify-center overflow-hidden shrink-0">
              {staff.avatar_url ? (
                <Image
                  src={staff.avatar_url}
                  alt={staff.name}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              ) : (
                <Icons.UserCircle className="h-10 w-10 text-muted-foreground" />
              )}
            </div>
            <span className="font-medium text-sm lg:text-xl">{staff.name}</span>
          </div>
        </div>

        <div className="mt-3 space-y-1 text-xs lg:text-lg text-muted-foreground">
          <p>役職 {staff.role}</p>
          <p>店舗名 {staff.store_name}</p>
        </div>
        {/* 現在の評価はダミー */}
        <div className="mt-3 pt-3 border-t space-y-2">
          <p className="text-xs font-medium text-muted-foreground">
            現在の評価
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-muted-foreground mt-1 bg-primary/10 rounded-xl p-2">
              総合評価: B
            </span>
            <span className="text-xs text-muted-foreground mt-1 bg-primary/10 rounded-xl p-2">
              総合達成率78%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
