import { UniPlayer } from "unibot-api/Types/UniPlayer";
import { Store } from "../models/storage";
import { BaseStats, JobID, StatRule } from "../types/stats";
import Logger from "../utils/logger";

class StaterController {
  private currentStats: BaseStats;
  private remainingStatPoints: number;

  constructor(private store: Store, player: UniPlayer) {
    this.currentStats = this.getCurrentStats(player);
    this.remainingStatPoints = this.getRemainingStatPoints(player);
  }

  evaluateStatRules(player: UniPlayer) {
    const rules = this.store.stater.statRules;
    if (rules.length === 0) {
      return;
    }

    for (const rule of rules) {
      this.updateStats(player);
      this.updateRemainingStatPoints(player);
      if (this.remainingStatPoints > 0) {
        if (this.isRuleApplicable(rule, player)) {
          this.useStatPoints(rule.stat, rule.statPoints);
        }
      }
    }
  }

  private isRuleApplicable(rule: StatRule, player: UniPlayer): boolean {
    if (rule.jobID !== "all") {
      const jobID = player.get("jobID");
      if (rule.jobID !== jobID) {
        Logger.info(
          `Skipping rule for ${rule.stat} because player is not ${
            Object.keys(JobID)[rule.jobID]
          }.`
        );
        return false;
      }
    }

    if (this.currentStats[rule.stat] >= rule.statPoints) {
      Logger.info(
        `Skipping rule for ${rule.stat} because it already has ${
          this.currentStats[rule.stat]
        } points.`
      );
      return false;
    }

    return true;
  }

  private useStatPoints(stat: keyof BaseStats, skillTo: number) {
    const newStats: BaseStats = {
      DEX: 0,
      STA: 0,
      INT: 0,
      STR: 0,
    };

    const neededStatPoints = skillTo - this.currentStats[stat];

    if (this.remainingStatPoints < neededStatPoints) {
      newStats[stat] = this.remainingStatPoints;
    } else {
      newStats[stat] = neededStatPoints;
    }

    this.store.unibot.core.LevelUpStat(
      newStats.STR,
      newStats.STA,
      newStats.DEX,
      newStats.INT
    );
    Logger.info(`Used ${newStats[stat]} stat points to level up ${stat}.`);
  }

  private updateStats(player: UniPlayer) {
    const stats = this.getCurrentStats(player);
    this.currentStats = stats;
  }

  private updateRemainingStatPoints(player: UniPlayer) {
    const remainingStatPoints = this.getRemainingStatPoints(player);
    this.remainingStatPoints = remainingStatPoints;
  }

  private getCurrentStats(player: UniPlayer) {
    const baseStats: BaseStats = player.get("baseStats");
    return baseStats;
  }

  private getRemainingStatPoints(player: UniPlayer) {
    const remainingStatPoints: number = player.get("remainingStatPoints");
    return remainingStatPoints;
  }
}

export default StaterController;
