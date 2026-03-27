import { Icons } from '@/components/icon/icons';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { EvaluationInput } from '@/lib/validations/schemas';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

type EvaluationCommentsProps = {
  register: UseFormRegister<EvaluationInput>;
};

export default function EvaluationComments({
  register,
}: EvaluationCommentsProps) {
  return (
    <div className="mt-6 space-y-6 w-full max-w-200 mx-auto">
      <div className="space-y-2">
        <Label htmlFor="actionPlan">
          <Icons.FaRunning className="w-4 h-4 text-primary" />
          アクションプラン
        </Label>
        <Textarea id="actionPlan" {...register('action_plan')} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="generalComment">
          <Icons.FaRegCommentDots className="w-4 h-4 text-primary" />
          総括コメント
        </Label>
        <Textarea id="generalComment" {...register('total_comment')} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="futureImage">
          <Icons.PiShootingStar className="w-4 h-4 text-primary" />
          3ヶ月後の未来
        </Label>
        <Textarea id="futureImage" {...register('future_vision')} />
      </div>
    </div>
  );
}
