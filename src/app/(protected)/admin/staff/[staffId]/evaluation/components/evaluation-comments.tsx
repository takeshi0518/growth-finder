import { Icons } from '@/components/icon/icons';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function EvaluationComments() {
  return (
    <div className="mt-6 space-y-6 w-full max-w-200 mx-auto">
      <div className="space-y-2">
        <Label htmlFor="actionPlan">
          <Icons.FaRunning className="w-4 h-4 text-primary" />
          アクションプラン
        </Label>
        <Textarea id="actionPlan" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="generalComment">
          <Icons.FaRegCommentDots className="w-4 h-4 text-primary" />
          総括コメント
        </Label>
        <Textarea id="generalComment" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="futureImage">
          <Icons.PiShootingStar className="w-4 h-4 text-primary" />
          3ヶ月後の未来
        </Label>
        <Textarea id="futureImage" />
      </div>
    </div>
  );
}
