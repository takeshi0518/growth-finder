import Anthropic from '@anthropic-ai/sdk';

export const tools: Anthropic.Tool[] = [
  {
    name: 'getPreviousEvaluation',
    description:
      '対象スタッフの前回の評価を取得する。今回の評価と前回を比較し、具体的にどう変化したかをフィードバックに含めたいときに使う。前回の評価が存在しない場合は null が返る。',
    input_schema: {
      type: 'object',
      properties: {},
      required: [],
    },
  },
  {
    name: 'getEvaluationTrend',
    description:
      '対象スタッフの全期間の評価傾向を取得する。QHC（スキル・ホスピタリティ・クレンリネス）各軸が長期的に伸びているか横ばいか下がっているかを知り、成長の傾向をフィードバックに反映したいときに使う。',
    input_schema: {
      type: 'object',
      properties: {},
      required: [],
    },
  },
];
