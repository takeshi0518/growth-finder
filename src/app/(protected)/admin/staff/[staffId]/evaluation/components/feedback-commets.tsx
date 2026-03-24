'use client';

import { Icons } from '@/components/icon/icons';
import { Button } from '@/components/ui/button';
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
            <form className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="good-points"
                  className="flex items-center gap-2 text-primary"
                >
                  <Icons.ThumbsUp className="w-4 h-4" />
                  良かった点
                </Label>
                <Textarea id="good-points" placeholder="例：笑顔が良かった" />
              </div>
              <div className="flex justify-around">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                >
                  キャンセル
                </Button>
                <Button variant="default">保存</Button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="improvement" className="space-y-4 mt-6">
            <form className="space-y-4">
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
                <Button variant="default">保存</Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
