export type BaseStats = {
  DEX: number;
  STA: number;
  INT: number;
  STR: number;
};

export type BonusStats = {
  bonusDEX: number;
  bonusSTA: number;
  bonusINT: number;
  bonusSTR: number;
};

export enum Stat {
  STR = "STR",
  STA = "STA",
  DEX = "DEX",
  INT = "INT",
}

export enum JobID {
  Vagrant = 0,
  Mercenary = 1,
  Acrobat = 2,
  Assist = 3,
  Magician = 4,
  Knight = 6,
  Blade = 7,
  Jester = 8,
  Ranger = 9,
  Ringmaster = 10,
  Billposter = 11,
  Psykeeper = 12,
  Elementor = 13,
}

export type StatRule = {
  stat: Stat;
  statPoints: number;
  jobID: JobID | "all";
};
