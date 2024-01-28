import {
  ConfiguredElement,
  ScriptConfig,
  UniAccordion,
  UniIterable,
} from "unibot-api/ScriptConfig";
import { JobID, Stat, StatRule } from "../types/stats";
import { enumKeys } from "../utils/enum";

class StaterView {
  private section: UniAccordion;
  private statIterable: UniIterable;

  private statLabel = "Stat";
  private statPointsLabel = "Stat Points";
  private jobLabel = "Job";

  constructor(private scriptConfig: ScriptConfig) {
    const { section, statIterable } = this.defineSection();

    this.section = section;
    this.statIterable = statIterable;
  }

  get() {
    return {
      statRules: this.getStatRules(),
    };
  }

  private getStatRules() {
    const statRules: StatRule[] = [];

    for (const element of this.statIterable.elements) {
      const stat: Stat | "none" = this.getValueForLabel(
        element,
        this.statLabel
      );

      if (stat === "none") {
        continue;
      }

      const statPoints = parseInt(
        this.getValueForLabel(element, this.statPointsLabel)
      );

      const job: string = this.getValueForLabel(element, this.jobLabel);
      let jobID: JobID | "all";
      if (job === "all") {
        jobID = "all";
      } else {
        jobID = JobID[job as keyof typeof JobID];
      }

      statRules.push({
        stat,
        statPoints,
        jobID,
      });
    }

    return statRules;
  }

  private getValueForLabel(iterableElement: ConfiguredElement, label: string) {
    return (
      iterableElement.values
        .find((element) => element.GetLabel() === label)
        ?.GetValue() ?? null
    );
  }

  private defineSection() {
    const section = this.scriptConfig.AddAccordion({
      label: "Statting Settings",
    });

    const statIterable = this.scriptConfig.CreateIterable({
      _parent: section,
      label: "Statting Entry",
    });

    statIterable.AddToShape("UniComboBox", {
      values: ["none", ...Object.values(Stat)],
      defaultValue: "none",
      label: this.statLabel,
    });

    statIterable.AddToShape("UniSlider", {
      label: this.statPointsLabel,
      defaultValue: 40,
      minValue: 1,
      maxValue: 999,
      tooltip:
        "This number will set the amount of stat points the script will try to reach before continuing to the next stat in the list.",
    });

    statIterable.AddToShape("UniComboBox", {
      values: ["all", ...enumKeys(JobID)],
      defaultValue: "all",
      label: this.jobLabel,
      tooltip:
        "This rule will only be applied to the selected job. If you want to apply this rule to all jobs, select 'all'.",
    });

    return {
      section,
      statIterable,
    };
  }
}

export default StaterView;
