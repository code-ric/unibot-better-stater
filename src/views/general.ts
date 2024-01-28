import {
  ScriptConfig,
  UniAccordion,
  UniBadge,
  UniCheckBox,
} from "unibot-api/ScriptConfig";

class GeneralView {
  private section: UniAccordion;
  private versionBadge: UniBadge;
  private debugCheckbox: UniCheckBox;

  constructor(private scriptConfig: ScriptConfig) {
    const { section, versionBadge, debugCheckbox } = this.defineSection();

    this.section = section;
    this.versionBadge = versionBadge;
    this.debugCheckbox = debugCheckbox;
  }

  get() {
    const debugEnabled = this.debugCheckbox.GetValue();

    return {
      debugEnabled,
    };
  }

  private defineSection() {
    const section = this.scriptConfig.AddAccordion({
      label: "General Settings",
    });

    const versionBadge = this.scriptConfig.AddBadge({
      label: "Script Version",
      defaultValue: "v0.1.0",
      _parent: section,
    });

    const debugCheckbox = this.scriptConfig.AddCheckBox({
      label: "Enable Debugging",
      defaultValue: false,
      _parent: section,
    });

    return {
      section,
      versionBadge,
      debugCheckbox,
    };
  }
}

export default GeneralView;
