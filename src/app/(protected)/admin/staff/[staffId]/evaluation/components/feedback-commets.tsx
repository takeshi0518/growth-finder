'use client';

import { Icons } from '@/components/icon/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

export default function FeedbackCommets() {
  const [isOpen, setIsOpen] = useState(false);
  const [goodPoint, setGoodPoint] = useState('');
  const [improvementPoint, setImprovementPoint] = useState('');
  const [goodPoints, setGoodPoints] = useState<string[]>([]);
  const [improvementPoints, setImprovementPoints] = useState<string[]>([]);

  const addGoodPoint = () => {
    if (!goodPoint) return;

    setGoodPoints((prev) => [...prev, goodPoint]);

    setGoodPoint('');
  };

  const addImprovementPoint = () => {
    if (!improvementPoint) return;

    setImprovementPoints((prev) => [...prev, improvementPoint]);

    setImprovementPoint('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="fixed bottom-10 lg:bottom-15 right-6 lg:right-10 h-14 lg:h-18 w-14 lg:w-18 rounded-full bg-primary hover:bg-primary/90 z-30">
          <Icons.MessageCirclePlus className="size-6 lg:size-7" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-sm">
            思ったことを入力しよう
          </DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="good">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="good">良かった点</TabsTrigger>
            <TabsTrigger value="improvement">もっと良くなる点</TabsTrigger>
          </TabsList>

          <TabsContent value="good" className="space-y-4 mt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="good-points"
                  className="flex items-center gap-2 text-primary"
                >
                  <Icons.ThumbsUp className="w-4 h-4" />
                  良かった点
                </Label>
                <Textarea
                  id="good-points"
                  value={goodPoint}
                  placeholder="例：笑顔が良かった"
                  onChange={(e) => setGoodPoint(e.target.value)}
                />
              </div>
              <div className="flex justify-around">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                >
                  キャンセル
                </Button>
                <Button type="button" variant="default" onClick={addGoodPoint}>
                  保存
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="improvement" className="space-y-4 mt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="improvement-points"
                  className="flex items-center gap-2 text-primary"
                >
                  <Icons.Sprout className="h-4 w-4" />
                  もっと良くなる点
                </Label>
                <Textarea
                  id="improvement-points"
                  placeholder="例：視線を上げると更によくなる"
                  value={improvementPoint}
                  onChange={(e) => setImprovementPoint(e.target.value)}
                />
              </div>

              <div className="flex justify-around">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                >
                  キャンセル
                </Button>
                <Button
                  type="button"
                  variant="default"
                  onClick={addImprovementPoint}
                >
                  保存
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        <Card className="mt-3">
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Icons.List className="w-4 h-4" />
              コメント一覧
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 p-1">
              <div className="flex items-center gap-2 text-xs mb-2 text-primary">
                <Icons.ThumbsUp className="w-4 h-4" />
                良かった点
              </div>
              <ul className="flex flex-wrap text-xs gap-2">
                {goodPoints.map((point, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 bg-primary/10 rounded-2xl px-2 py-1"
                  >
                    {point}
                    <button
                      type="button"
                      onClick={() =>
                        setGoodPoints((prev) =>
                          prev.filter((_, i) => i !== index)
                        )
                      }
                    >
                      <Icons.X className="w-3 h-3 text-red-500" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 p-1">
              <div className="flex items-center gap-2 text-xs mb-2 text-primary">
                <Icons.Sprout className="h-4 w-4" />
                もっと良くなる点
              </div>
              <ul className="flex flex-wrap text-xs gap-2">
                {improvementPoints.map((point, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 bg-primary/10 rounded-2xl px-2 py-1"
                  >
                    {point}
                    <button
                      type="button"
                      onClick={() =>
                        setImprovementPoints((prev) =>
                          prev.filter((_, i) => i !== index)
                        )
                      }
                    >
                      <Icons.X className="w-3 h-3 text-red-500" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
