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
import { EvaluationInput } from '@/lib/validations/schemas';
import { useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { SectionType } from '../../../../../../../../types/evaluations';

type FeedbackCommentsProps = {
  activeCategory: 'skill' | 'hospitality' | 'cleanliness';
  sectionType: SectionType;
  setValue: UseFormSetValue<EvaluationInput>;
};

const categoryLabel = {
  skill: 'スキル',
  hospitality: 'ホスピタリティ',
  cleanliness: 'クレンリネス',
};

const categoryIcon = {
  skill: <Icons.FaHammer className="w-4 h-4" />,
  hospitality: <Icons.FaHandHoldingHeart className="w-4 h-4" />,
  cleanliness: <Icons.MdCleaningServices className="w-4 h-4" />,
};

export default function FeedbackCommets({
  activeCategory,
  sectionType,
  setValue,
}: FeedbackCommentsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [goodPoint, setGoodPoint] = useState('');
  const [improvementPoint, setImprovementPoint] = useState('');
  const [goodPoints, setGoodPoints] = useState<Record<string, string[]>>({
    skill: [],
    hospitality: [],
    cleanliness: [],
  });
  const [improvementPoints, setImprovementPoints] = useState<
    Record<string, string[]>
  >({
    skill: [],
    hospitality: [],
    cleanliness: [],
  });

  const addGoodPoint = () => {
    if (!goodPoint) return;

    const newPoints = [...goodPoints[activeCategory], goodPoint];
    setGoodPoints((prev) => ({
      ...prev,
      [activeCategory]: newPoints,
    }));

    setValue(`${sectionType}.good_points.${activeCategory}`, newPoints);

    setGoodPoint('');
  };

  const addImprovementPoint = () => {
    if (!improvementPoint) return;

    const newPoints = [...improvementPoints[activeCategory], improvementPoint];
    setImprovementPoints((prev) => ({
      ...prev,
      [activeCategory]: newPoints,
    }));

    setValue(`${sectionType}.improvement_points.${activeCategory}`, newPoints);

    setImprovementPoint('');
  };

  console.log(goodPoints);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="fixed bottom-10 lg:bottom-15 right-6 lg:right-10 h-14 lg:h-18 w-14 lg:w-18 rounded-full bg-primary hover:bg-primary/90 z-30">
          <Icons.MessageCirclePlus className="size-6 lg:size-7" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-md text-primary">
            {categoryIcon[activeCategory]}
            {categoryLabel[activeCategory]}
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
                {goodPoints[activeCategory].map((point, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 bg-primary/10 rounded-2xl px-2 py-1"
                  >
                    {point}
                    <button
                      type="button"
                      onClick={() => {
                        const newPoints = goodPoints[activeCategory].filter(
                          (_, i) => i !== index
                        );
                        setGoodPoints((prev) => ({
                          ...prev,
                          [activeCategory]: newPoints,
                        }));
                        setValue(
                          `${sectionType}.good_points.${activeCategory}`,
                          newPoints
                        );
                      }}
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
                {improvementPoints[activeCategory].map((point, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 bg-primary/10 rounded-2xl px-2 py-1"
                  >
                    {point}
                    <button
                      type="button"
                      onClick={() => {
                        const newPoints = improvementPoints[
                          activeCategory
                        ].filter((_, i) => i !== index);
                        setImprovementPoints((prev) => ({
                          ...prev,
                          [activeCategory]: newPoints,
                        }));
                        setValue(
                          `${sectionType}.improvement_points.${activeCategory}`,
                          newPoints
                        );
                      }}
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
