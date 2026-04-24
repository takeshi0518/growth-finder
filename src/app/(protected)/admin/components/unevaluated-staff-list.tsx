'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination';
import { Staff } from '../../../../../types/staff';
import { Icons } from '@/components/icon/icons';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type UnevaluatedStaffCardProps = {
  staff: Staff;
  periodId?: string;
};

type UnevaluatedStaffListProps = {
  unevaluatedStaffLists: Staff[];
  currentEvaluationPeriod?: string;
};

export default function UnevaluatedStaffList({
  unevaluatedStaffLists,
  currentEvaluationPeriod,
}: UnevaluatedStaffListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const startIndex = (currentPage - 1) * pageSize;
  const currentItems = unevaluatedStaffLists.slice(
    startIndex,
    startIndex + pageSize
  );
  const totalPage = Math.ceil(unevaluatedStaffLists.length / pageSize);
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentItems.map((staff) => (
          <UnevaluatedStaffCard
            key={staff.id}
            staff={staff}
            periodId={currentEvaluationPeriod}
          />
        ))}
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="disabled:opacity-50"
            >
              <Icons.ChevronLeft className="w-4 h-4" />
            </button>
          </PaginationItem>
          {[...Array(totalPage)].map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                isActive={currentPage === i + 1}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPage, p + 1))}
              disabled={currentPage === totalPage}
              className="disabled:opacity-50"
            >
              <Icons.ChevronRight className="w-4 h-4" />
            </button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}

function UnevaluatedStaffCard({ staff, periodId }: UnevaluatedStaffCardProps) {
  return (
    <Card>
      <CardContent className="pb-4">
        <div className="flex flex-col justify-center gap-y-5">
          <div className="flex items-center justify-center gap-2">
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
          <Button size="sm" variant="ghost" className="text-primary" asChild>
            <Link
              href={`/admin/staff/${staff.id}/evaluation?periodId=${periodId}`}
            >
              評価する
              <Icons.ArrowBigRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
