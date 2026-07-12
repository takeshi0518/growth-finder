import { Rank, SectionType } from '../../../types/evaluations';

export type SectionScores = {
  section_type: SectionType;
  skill_score: number;
  skill_max: number;
  hospitality_score: number;
  hospitality_max: number;
  cleanliness_score: number;
  cleanliness_max: number;
};

export const calcRate = (sections: SectionScores[]) => {
  const totalSkillScore = sections.reduce((sum, s) => sum + s.skill_score, 0);
  const totalHospitalityScore = sections.reduce(
    (sum, s) => sum + s.hospitality_score,
    0
  );
  const totalCleanlinessScore = sections.reduce(
    (sum, s) => sum + s.cleanliness_score,
    0
  );
  const totalSkillMax = sections.reduce((sum, s) => sum + s.skill_max, 0);
  const totalHospitalityMax = sections.reduce(
    (sum, s) => sum + s.hospitality_max,
    0
  );
  const totalCleanlinessMax = sections.reduce(
    (sum, s) => sum + s.cleanliness_max,
    0
  );
  const totalScore =
    totalSkillScore + totalHospitalityScore + totalCleanlinessScore;
  const totalMax = totalSkillMax + totalHospitalityMax + totalCleanlinessMax;

  return {
    skillScore: totalSkillScore,
    hospitalityScore: totalHospitalityScore,
    cleanlinessScore: totalCleanlinessScore,
    skillRate:
      totalSkillMax > 0
        ? Math.floor((totalSkillScore / totalSkillMax) * 100)
        : 0,
    hospitalityRate: totalHospitalityMax
      ? Math.floor((totalHospitalityScore / totalHospitalityMax) * 100)
      : 0,
    cleanlinessRate: totalCleanlinessMax
      ? Math.floor((totalCleanlinessScore / totalCleanlinessMax) * 100)
      : 0,
    totalScore,
    totalRate: totalMax > 0 ? Math.floor((totalScore / totalMax) * 100) : 0,
  };
};

export const calcRank = (rate: number): Rank => {
  if (rate >= 90) return 'A';
  if (rate >= 70) return 'B';
  if (rate >= 50) return 'C';
  return 'D';
};

export const calcEvaluation = (sections: SectionScores[]) => {
  const {
    totalRate: rate,
    skillRate,
    hospitalityRate,
    cleanlinessRate,
  } = calcRate(sections);

  const rank = calcRank(rate);

  const sectionRates = sections.map((section) => {
    const { totalRate, skillRate, hospitalityRate, cleanlinessRate } = calcRate(
      [section]
    );

    return {
      sectionType: section.section_type,
      rate: totalRate,
      rank: calcRank(totalRate),
      skillRate,
      hospitalityRate,
      cleanlinessRate,
    };
  });

  return {
    rate,
    rank,
    skillRate,
    hospitalityRate,
    cleanlinessRate,
    sectionRates,
  };
};
