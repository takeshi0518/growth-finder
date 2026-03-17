import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function SectionTab() {
  return (
    <Tabs defaultValue="skill" className="mt-8">
      <div className="flex justify-center">
        <TabsList variant="line" className="h-auto w-full max-w-lg">
          <TabsTrigger
            value="skill"
            className="data-[state=active]:after:bg-primary"
          >
            スキル
          </TabsTrigger>
          <TabsTrigger
            value="hospitality"
            className="data-[state=active]:after:bg-primary"
          >
            ホスピタリティ
          </TabsTrigger>
          <TabsTrigger
            value="cleanliness"
            className="data-[state=active]:after:bg-primary"
          >
            クレンリネス
          </TabsTrigger>
        </TabsList>
      </div>
      <div className="flex flex-col items-center space-y-3 mt-4">
        <h2 className="text-sm">スコア基準</h2>
        <div className="grid grid-cols-2 gap-y-1 gap-x-8 text-xs text-muted-foreground">
          <p className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
            指導できる…4点
          </p>
          <p className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
            理解している…3点
          </p>
          <p className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-yellow-500 inline-block" />
            サポートが必要…2点
          </p>
          <p className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
            理解不足…1点
          </p>
        </div>
      </div>
    </Tabs>
  );
}
