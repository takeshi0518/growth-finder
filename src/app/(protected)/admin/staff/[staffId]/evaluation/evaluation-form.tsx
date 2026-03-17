'use client';

import { Icons } from '@/components/icon/icons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function EvaluationForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icons.ClipboardPenLine className="w-4 h-4" />
          各セクション評価
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="grid grid-cols-2 sm:grid-cols-4 h-auto w-full">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-primary/10 data-[state=active]:shadow-none!"
            >
              総合
            </TabsTrigger>
            <TabsTrigger
              value="basic"
              className="data-[state=active]:bg-primary/10 data-[state=active]:shadow-none!"
            >
              基本動作
            </TabsTrigger>
            <TabsTrigger
              value="cashier"
              className="data-[state=active]:bg-primary/10 data-[state=active]:shadow-none!"
            >
              バリスタ
            </TabsTrigger>
            <TabsTrigger
              value="barista"
              className="data-[state=active]:bg-primary/10 data-[state=active]:shadow-none!"
            >
              キャッシャー
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all"></TabsContent>
          <TabsContent value="basic"></TabsContent>
          <TabsContent value="cashier"></TabsContent>
          <TabsContent value="barista"></TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
