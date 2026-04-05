type SectionScores = {
  skill_score: number;
  skill_max: number;
  hospitality_score: number;
  hospitality_max: number;
  cleanliness_score: number;
  cleanliness_max: number;
};

export const calcRate = (sections: SectionScores[]) => {
  const totalScore = sections.reduce(
    (sum, section) =>
      sum +
      section.skill_score +
      section.hospitality_score +
      section.cleanliness_score,
    0
  );
  const totalMax = sections.reduce(
    (sum, section) =>
      sum +
      section.skill_max +
      section.hospitality_max +
      section.cleanliness_max,
    0
  );

  return Math.floor((totalScore / totalMax) * 100);
};

export const calcRank = (rate: number) => {
  if (rate >= 90) return 'A';
  if (rate >= 70) return 'B';
  if (rate >= 50) return 'C';
  return 'D';
};

export const calcEvaluation = (sections: SectionScores[]) => {
  const rate = calcRate(sections);
  const rank = calcRank(rate);

  return { rate, rank };
};
