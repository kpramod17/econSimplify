import type { Chapter } from "@shared/types";

export const CHAPTERS: Chapter[] = [
  { id: 1, name: "Thinking Like an Economist", shortName: "Econ Thinking" },
  { id: 2, name: "Comparative Advantage", shortName: "Comp. Advantage" },
  { id: 3, name: "Supply and Demand", shortName: "Supply & Demand" },
  { id: 4, name: "Elasticity", shortName: "Elasticity" },
  { id: 5, name: "Demand", shortName: "Demand" },
  { id: 6, name: "Perfectly Competitive Supply", shortName: "Perfect Competition" },
  { id: 7, name: "Efficiency, Exchange, and the Invisible Hand in Action", shortName: "Invisible Hand" },
  { id: 8, name: "Monopoly, Oligopoly, and Monopolistic Competition", shortName: "Market Power" },
  { id: 9, name: "Games and Strategic Behaviour", shortName: "Game Theory" },
  { id: 10, name: "Behavioural Economics", shortName: "Behavioural Econ" },
  { id: 11, name: "Externalities, Property Rights, and the Environment", shortName: "Externalities" },
  { id: 12, name: "The Economics of Information", shortName: "Info Economics" },
  { id: 13, name: "Labour Markets, Poverty, and Income Distribution", shortName: "Labour Markets" },
  { id: 14, name: "Public Goods and Tax Policy", shortName: "Public Goods" },
  { id: 15, name: "International Trade and Trade Policy", shortName: "Trade Policy" },
];

export const CHAPTER_COLORS: Record<number, string> = {
  1: "bg-blue-100 text-blue-800 border-blue-200",
  2: "bg-emerald-100 text-emerald-800 border-emerald-200",
  3: "bg-amber-100 text-amber-800 border-amber-200",
  4: "bg-rose-100 text-rose-800 border-rose-200",
  5: "bg-violet-100 text-violet-800 border-violet-200",
  6: "bg-cyan-100 text-cyan-800 border-cyan-200",
  7: "bg-orange-100 text-orange-800 border-orange-200",
  8: "bg-red-100 text-red-800 border-red-200",
  9: "bg-indigo-100 text-indigo-800 border-indigo-200",
  10: "bg-pink-100 text-pink-800 border-pink-200",
  11: "bg-green-100 text-green-800 border-green-200",
  12: "bg-purple-100 text-purple-800 border-purple-200",
  13: "bg-yellow-100 text-yellow-800 border-yellow-200",
  14: "bg-teal-100 text-teal-800 border-teal-200",
  15: "bg-sky-100 text-sky-800 border-sky-200",
};
