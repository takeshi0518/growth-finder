import { SummaryComment } from '../../../types/evaluations';
import { Icons } from '../icon/icons';
import { Label } from '../ui/label';

type SummaryCommentsProps = {
  summaryComments: SummaryComment;
};

const EMPTY_COMMENT = 'コメントが入力されていません';

export default function SummaryComments({
  summaryComments,
}: SummaryCommentsProps) {
  console.log(summaryComments.action_plan);
  return (
    <div className="mt-6 space-y-6 w-full max-w-200 mx-auto">
      <div className="space-y-2">
        <Label>
          <Icons.FaRunning className="w-4 h-4 text-primary" />
          アクションプラン
        </Label>
        <div className="min-h-10 p-3 border rounded-md text-[10px]">
          {summaryComments.action_plan || EMPTY_COMMENT}
        </div>
      </div>
      <div className="space-y-2">
        <Label>
          <Icons.FaRegCommentDots className="w-4 h-4 text-primary" />
          総括コメント
        </Label>
        <div className="min-h-10 p-3 border rounded-md text-[10px]">
          {summaryComments.total_comment || EMPTY_COMMENT}
        </div>
      </div>
      <div className="space-y-2">
        <Label>
          <Icons.PiShootingStar className="w-4 h-4 text-primary" />
          3ヶ月後の未来
        </Label>
        <div className="min-h-10 p-3 border rounded-md text-[10px]">
          {summaryComments.future_vision || EMPTY_COMMENT}
        </div>
      </div>
    </div>
  );
}
