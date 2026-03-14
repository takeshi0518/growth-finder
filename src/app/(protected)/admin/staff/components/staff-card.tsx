'use client';

import { Icons } from '@/components/icon/icons';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

import StaffCardMenu from './staff-card-menu';
import { Staff } from '../../../../../../types/staff';
import { Tables } from '../../../../../../types/supabase';

type EvaluationPeriod = Pick<Tables<'evaluation_periods'>, 'id'> | null;

type StaffCardProps = {
  staff: Staff;
  selectedPeriod: EvaluationPeriod;
};

export default function StaffCard({ staff, selectedPeriod }: StaffCardProps) {
  return (
    <Card className="relative">
      <CardContent className="pb-4">
        <div className="absolute top-3 right-3">
          <StaffCardMenu staff={staff} selectedPeriod={selectedPeriod} />
        </div>

        <div className="flex justify-center items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-card flex items-center justify-center overflow-hidden shrink-0">
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
            <span className="font-medium text-sm">{staff.name}</span>
          </div>
        </div>

        <div className="mt-3 space-y-1 text-xs text-muted-foreground">
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
