'use client';

import { useState } from 'react';
import StaffCard from './staff-card';
import StaffSearch from './staff-search';
import { Staff } from '../../../../../../types/staff';
import { Tables } from '../../../../../../types/supabase';

type EvaluationPeriod = Pick<Tables<'evaluation_periods'>, 'id'> | null;

type StaffListProps = {
  staffs: Staff[];
  selectedPeriod: EvaluationPeriod;
};

export default function StaffList({ staffs, selectedPeriod }: StaffListProps) {
  const [search, setSearch] = useState('');

  const filterdStaffs = staffs.filter((staff) => staff.name.includes(search));
  return (
    <>
      <StaffSearch value={search} onChange={setSearch} />
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">
          合計 {filterdStaffs.length} 人
        </p>
        {filterdStaffs.length === 0 ? (
          <p>
            {search
              ? '検索結果が見つかりませんでした'
              : 'スタッフが登録されていません'}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filterdStaffs.map((staff) => (
              <StaffCard
                key={staff.id}
                staff={staff}
                selectedPeriod={selectedPeriod}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
