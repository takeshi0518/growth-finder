import { SECTION_ITEMS } from '../src/lib/constants/evaluation-items';

type SectionType = 'basic' | 'barista' | 'cashier';

const ORG_ID = '11111111-1111-1111-1111-111111111111';

const SECTION_IDS: Record<string, Record<SectionType, string>> = {
  staffA: {
    basic: 'a1a1a1a1-a1a1-a1a1-a1a1-a1a1a1a1a1a1',
    barista: 'a2a2a2a2-a2a2-a2a2-a2a2-a2a2a2a2a2a2',
    cashier: 'a3a3a3a3-a3a3-a3a3-a3a3-a3a3a3a3a3a3',
  },
  staffB: {
    basic: 'b1b1b1b1-b1b1-b1b1-b1b1-b1b1b1b1b1b1',
    barista: 'b2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b2b2',
    cashier: 'b3b3b3b3-b3b3-b3b3-b3b3-b3b3b3b3b3b3',
  },
};

const generateSeed = (sectionId: string, sectionType: SectionType): string => {
  let sql = '';
  const categories = ['skill', 'hospitality', 'cleanliness'] as const;

  for (const category of categories) {
    const items = SECTION_ITEMS[sectionType][category];
    for (const item of items) {
      sql += `
INSERT INTO evaluation_items (
  id,
  organization_id,
  evaluation_section_id,
  item_name,
  category,
  score
) VALUES (
  gen_random_uuid(),
  '${ORG_ID}',
  '${sectionId}',
  '${item.item_name}',
  '${category}',
  3
);\n`;
    }
  }

  return sql;
};

console.log(generateSeed(SECTION_IDS.staffA.basic, 'basic'));
console.log(generateSeed(SECTION_IDS.staffA.cashier, 'cashier'));
console.log(generateSeed(SECTION_IDS.staffA.barista, 'barista'));

console.log(generateSeed(SECTION_IDS.staffB.basic, 'basic'));
console.log(generateSeed(SECTION_IDS.staffB.cashier, 'cashier'));
console.log(generateSeed(SECTION_IDS.staffB.barista, 'barista'));
