import { EvaluationItemConstant } from '../../../types/evaluations';

export const SCORE_OPTIONS = [1, 2, 3, 4] as const;

export const BASIC_SKILL_ITEMS: EvaluationItemConstant[] = [
  {
    item_name: '経営理念に沿った行動',
    category: 'skill',
    check_points: ['内容を理解して自らどう行動するか目標にできている'],
  },
  {
    item_name: '出退勤ができる',
    category: 'skill',
    check_points: ['打刻ルールを理解できている'],
  },
  {
    item_name: 'シフトを期限内に提出できる',
    category: 'skill',
    check_points: ['遅れる場合の対応'],
  },
  {
    item_name: '早退、欠勤の連絡ができる',
    category: 'skill',
    check_points: ['当日の場合は電話で連絡', '体調が悪い場合は無理をしない'],
  },
  {
    item_name: '自店舗の正しい情報',
    category: 'skill',
    check_points: ['電話番号', '住所', '営業時間'],
  },
  {
    item_name: '守秘義務を理解し守っている',
    category: 'skill',
    check_points: ['売上', 'マニュアル', 'お客様情報'],
  },
  {
    item_name: 'シフトインのときのコーヒーテイスティング',
    category: 'skill',
    check_points: ['銘柄確認', '味わい確認'],
  },
  {
    item_name: '電話番号対応ができる',
    category: 'skill',
    check_points: ['お客様対応', '関係者対応', '保留ボタン'],
  },
];

export const BASIC_HOSPITALITY_ITEMS: EvaluationItemConstant[] = [
  {
    item_name: 'アレルギー対応',
    category: 'hospitality',
    check_points: ['アレルギー一覧表の取扱い', 'コンタミネーションの理解'],
  },
  {
    item_name: '接客用語に間違いは無いか',
    category: 'hospitality',
    check_points: ['正しい言葉遣い'],
  },
  {
    item_name: 'クレーム対応',
    category: 'hospitality',
    check_points: ['責任者への報連相', '謝罪の言葉がある'],
  },
  {
    item_name: '従業員同士の声掛け',
    category: 'hospitality',
    check_points: ['周りの人へのコミュニケーションがある'],
  },
  {
    item_name: '仲間とのやり取り',
    category: 'hospitality',
    check_points: ['雰囲気作り'],
  },
];

export const BASIC_CLEANLINESS_ITEMS: EvaluationItemConstant[] = [
  {
    item_name: 'ドレスコードを遵守している',
    category: 'cleanliness',
    check_points: ['髪が目、頬、肩にかかっていない', '爪'],
  },
  {
    item_name: '正しい手洗いができる',
    category: 'cleanliness',
    check_points: ['手の甲や指と指の間もきれいに洗浄している'],
  },
  {
    item_name: '店内環境の整備',
    category: 'cleanliness',
    check_points: [
      '客席の整理整頓/清掃',
      '室温をチェックしている',
      'BGMの音量をチェックしている',
    ],
  },
  {
    item_name: '腸内検査は毎回提出している',
    category: 'cleanliness',
    check_points: ['期限内に提出しているか'],
  },
  {
    item_name: '厨房内は走らない',
    category: 'cleanliness',
    check_points: ['早歩きをしている', '急なターンや振り返りが無い'],
  },
  {
    item_name: '周囲の安全確認',
    category: 'cleanliness',
    check_points: [
      '移動前に周囲を確認する',
      'お湯、水など持っていた時は声を掛けている',
    ],
  },
];

export const CASHIER_SKILL_ITEMS: EvaluationItemConstant[] = [
  {
    item_name: 'POSレジの基本動作',
    category: 'skill',
    check_points: ['正確に商品を登録できる'],
  },
  {
    item_name: '現金での決済ができる',
    category: 'skill',
    check_points: ['正確な金銭の授受'],
  },
  {
    item_name: 'キャッシュレス決済ができる',
    category: 'skill',
    check_points: ['クレジット', '電子マネー', 'QR'],
  },
  {
    item_name: '領収書の発行',
    category: 'skill',
    check_points: ['手書き発行の際は登録番号を記載'],
  },
  {
    item_name: '商品券の取扱い',
    category: 'skill',
    check_points: ['使用不可の商品券を覚えている'],
  },
];

export const CASHIER_HOSPITALITY_ITEMS: EvaluationItemConstant[] = [
  {
    item_name: '感じの良いあいさつ',
    category: 'hospitality',
    check_points: ['笑顔', '声のトーン', '入退店時の挨拶'],
  },
  {
    item_name: '感じの良い話し方',
    category: 'hospitality',
    check_points: ['言葉遣い', 'アイコンタクト', '返事、頷きがある'],
  },
  {
    item_name: '立ち振舞い',
    category: 'hospitality',
    check_points: ['表情', '姿勢', '丁寧な所作'],
  },
  {
    item_name: '心のこもった感謝の言葉',
    category: 'hospitality',
    check_points: ['笑顔', 'アイコンタクト', '声のトーン'],
  },
  {
    item_name: 'お客様に沿ったおすすめ',
    category: 'hospitality',
    check_points: ['商品の案内', 'お客様の要望を汲み取れる'],
  },
  {
    item_name: 'バリスタとの連携',
    category: 'hospitality',
    check_points: ['アイコンタクトを取りスムーズなオペレーションができる'],
  },
];

export const CASHIER_CLEANLINESS: EvaluationItemConstant[] = [
  {
    item_name: 'ショーケース内の整理整頓',
    category: 'cleanliness',
    check_points: ['パンくず、ガラス面の指紋の清掃'],
  },
  {
    item_name: 'POSレジ周りの整理整頓',
    category: 'cleanliness',
    check_points: ['ハサミやペンなど散乱していない'],
  },
  {
    item_name: 'POSレジ周りの清掃',
    category: 'cleanliness',
    check_points: ['POSレジのホコリがない', 'ショーケース上部のホコリがない'],
  },
  {
    item_name: '提供時の消費期限の確認',
    category: 'cleanliness',
    check_points: ['販売前に確認している'],
  },
  {
    item_name: '異物混入に対しての意識',
    category: 'cleanliness',
    check_points: ['作業台にゴミがない'],
  },
  {
    item_name: '動線、転倒防止への配慮',
    category: 'cleanliness',
    check_points: ['お客様の足元に水滴などがないか', '障害物がないか'],
  },
  {
    item_name: 'お客様情報の保護',
    category: 'cleanliness',
    check_points: ['クレジット情報を盗み見ていない'],
  },
];

export const BARISTA_SKILL_ITEMS: EvaluationItemConstant[] = [
  {
    item_name: 'ラテ作成/ドージング',
    category: 'skill',
    check_points: ['ポータフィルターの状態'],
  },
  {
    item_name: 'ラテ作成/タンピング',
    category: 'skill',
    check_points: ['粉をならし垂直に力をかけている'],
  },
  {
    item_name: 'ラテ作成/エスプレッソ抽出',
    category: 'skill',
    check_points: ['抽出後のエスプレッソの状態確認'],
  },
  {
    item_name: 'ラテ作成/適切なスチーミング',
    category: 'skill',
    check_points: ['ワンズの角度', 'ノズルの位置'],
  },
  {
    item_name: 'ラテ作成/スチームミルクの仕上がり',
    category: 'skill',
    check_points: ['温度', 'キメの細やかさ'],
  },
  {
    item_name: 'ラテ作成/見た目',
    category: 'skill',
    check_points: ['見た目のきれいさ', 'ツヤがあるか'],
  },
  {
    item_name: '商品を正しい順番で作成できている',
    category: 'skill',
    check_points: ['注文を確認して順番に作成できる'],
  },
  {
    item_name: '全商品を作成できる',
    category: 'skill',
    check_points: ['ドリンク類', 'フード類'],
  },
  {
    item_name: '機械の操作ができる',
    category: 'skill',
    check_points: ['エスプレッソ', 'ドリップ', 'オーブン', '電子レンジ'],
  },
];

export const BARISTA_HOSPITALITY_ITEMS: EvaluationItemConstant[] = [
  {
    item_name: '立ち振舞い',
    category: 'hospitality',
    check_points: ['表情', '姿勢', '丁寧な所作', '作業音が小さい'],
  },
  {
    item_name: '感じの良い提供',
    category: 'hospitality',
    check_points: ['笑顔', 'アイコンタクト', '声のトーン', '挨拶'],
  },
  {
    item_name: 'お見送り',
    category: 'hospitality',
    check_points: ['お客様が振り返るまで視線を残している'],
  },
  {
    item_name: '声掛け',
    category: 'hospitality',
    check_points: ['お客様へ提案できている', '困っているお客様への声掛け'],
  },
  {
    item_name: '強力したオペレーション',
    category: 'hospitality',
    check_points: ['報連相ができる'],
  },
];

export const BARISTA_CLEANLINESS: EvaluationItemConstant[] = [
  {
    item_name: '消費期限の確認',
    category: 'cleanliness',
    check_points: ['常に消費期限をチェックしている', '先入先出を理解している'],
  },
  {
    item_name: '作業台の清潔さ',
    category: 'cleanliness',
    check_points: ['汚れはすぐに拭いている', '片付けながら作業できる'],
  },
  {
    item_name: '顔、髪に触れていない',
    category: 'cleanliness',
    check_points: [
      '触れてしまった場合には手洗いをして、清潔な状態を維持している',
    ],
  },
  {
    item_name: '異物混入への意識',
    category: 'cleanliness',
    check_points: ['ゴミなどが作業台に無い', '調理器具、容器などの破損がない'],
  },
];
