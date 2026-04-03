'use client';

import { Icons } from '@/components/icon/icons';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SectionTab from './section-tab';
import { Button } from '@/components/ui/button';
import {
  EvaluationItemConstant,
  FormattedEvaluation,
} from '../../../../../../../../types/evaluations';
import EvaluationComments from './evaluation-comments';
import { useForm } from 'react-hook-form';
import { EvaluationInput, evaluationSchema } from '@/lib/validations/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { getErrorMessage } from '@/lib/utils/error-message';
import LoaderCircleIcon from '@/components/shared/loader-circle';
import { addEvaluations, saveDraft } from '../actions';
import { TOTAL_EVALUATION_ITEMS } from '@/lib/constants/evaluation-items';
import {
  SectionType,
  Category,
} from '../../../../../../../../types/evaluations';

const SECTION_TYPES: SectionType[] = ['basic', 'barista', 'cashier'];
const CATEGORIES: Category[] = ['skill', 'hospitality', 'cleanliness'];

type EvaluationFormProps = {
  staffId: string;
  periodId: string;
  existingEvaluationData: FormattedEvaluation | null;
  existingComments: {
    action_plan: string | null;
    total_comment: string | null;
    future_vision: string | null;
  } | null;
  basicSkillItems: EvaluationItemConstant[];
  basicHospitalityItems: EvaluationItemConstant[];
  basicCleanlinessItems: EvaluationItemConstant[];
  cashierSkillItems: EvaluationItemConstant[];
  cashierHospitalityItems: EvaluationItemConstant[];
  cashierCleanlinessItems: EvaluationItemConstant[];
  baristaSkillItems: EvaluationItemConstant[];
  baristaHospitalityItems: EvaluationItemConstant[];
  baristaCleanliness: EvaluationItemConstant[];
};

export default function EvaluationForm({
  staffId,
  periodId,
  existingComments,
  existingEvaluationData,
  basicSkillItems,
  basicHospitalityItems,
  basicCleanlinessItems,
  cashierSkillItems,
  cashierHospitalityItems,
  cashierCleanlinessItems,
  baristaSkillItems,
  baristaHospitalityItems,
  baristaCleanliness,
}: EvaluationFormProps) {
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<EvaluationInput>({
    resolver: zodResolver(evaluationSchema),
    defaultValues: existingEvaluationData
      ? {
          ...existingEvaluationData,
          action_plan: existingComments?.action_plan ?? '',
          total_comment: existingComments?.total_comment ?? '',
          future_vision: existingComments?.future_vision ?? '',
        }
      : {
          basic: {
            skill: {},
            hospitality: {},
            cleanliness: {},
            good_points: [],
            improvement_points: [],
          },
          barista: {
            skill: {},
            hospitality: {},
            cleanliness: {},
            good_points: [],
            improvement_points: [],
          },
          cashier: {
            skill: {},
            hospitality: {},
            cleanliness: {},
            good_points: [],
            improvement_points: [],
          },
          action_plan: '',
          total_comment: '',
          future_vision: '',
        },
  });

  const countScoredItems = () => {
    let result = 0;

    for (const section of SECTION_TYPES) {
      for (const category of CATEGORIES) {
        result += Object.keys(watch(`${section}.${category}`)).length;
      }
    }
    return result;
  };

  const validateEvaluation = () => {
    const currentEvaluationItems = countScoredItems();
    return TOTAL_EVALUATION_ITEMS === currentEvaluationItems;
  };

  const onSubmit = async (data: EvaluationInput) => {
    if (!validateEvaluation()) {
      toast.error('未評価項目があります');
      return;
    }
    try {
      await addEvaluations(data, staffId, periodId);
      toast.success('評価を登録しました');
    } catch (error) {
      toast.error('評価の登録に失敗しました', {
        description: getErrorMessage(error),
      });
    }
  };

  const saveDraftEvaluations = async () => {
    const draftEvaluations = watch();
    try {
      await saveDraft(draftEvaluations, staffId, periodId);
      toast.success('評価を下書き保存しました');
    } catch (error) {
      toast.error('評価の下書きに失敗しました', {
        description: getErrorMessage(error),
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icons.ClipboardPenLine className="w-4 h-4" />
          各セクション評価入力
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="mb-6">
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
                value="barista"
                className="data-[state=active]:bg-primary/10 data-[state=active]:shadow-none!"
              >
                バリスタ
              </TabsTrigger>
              <TabsTrigger
                value="cashier"
                className="data-[state=active]:bg-primary/10 data-[state=active]:shadow-none!"
              >
                キャッシャー
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <EvaluationComments register={register} />
            </TabsContent>
            <TabsContent value="basic">
              <SectionTab
                skillItems={basicSkillItems}
                hospitalityItems={basicHospitalityItems}
                cleanlinessItems={basicCleanlinessItems}
                setValue={setValue}
                watch={watch}
                sectionType="basic"
              />
            </TabsContent>
            <TabsContent value="cashier">
              <SectionTab
                skillItems={cashierSkillItems}
                hospitalityItems={cashierHospitalityItems}
                cleanlinessItems={cashierCleanlinessItems}
                setValue={setValue}
                watch={watch}
                sectionType="cashier"
              />
            </TabsContent>
            <TabsContent value="barista">
              <SectionTab
                skillItems={baristaSkillItems}
                hospitalityItems={baristaHospitalityItems}
                cleanlinessItems={baristaCleanliness}
                setValue={setValue}
                watch={watch}
                sectionType="barista"
              />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-around">
          <Button
            variant="secondary"
            type="button"
            onClick={saveDraftEvaluations}
          >
            下書き
          </Button>
          <Button variant="default" type="submit" disabled={isSubmitting}>
            {isSubmitting ? <LoaderCircleIcon /> : '保存'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
