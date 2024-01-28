import { Store } from "../models/storage";
import GeneralView from "../views/general";
import StaterView from "../views/stater";

class ViewController {
  private scriptConfig = this.store.unibot.core.GetScriptConfig();

  private general: GeneralView = new GeneralView(this.scriptConfig);
  private stater: StaterView = new StaterView(this.scriptConfig);

  constructor(private store: Store) {}

  update() {
    this.updateGeneral();
    this.updateStats();
  }

  updateGeneral() {
    this.store.config.debugEnabled = this.general.get().debugEnabled;
  }

  updateStats() {
    this.store.stater.statRules = this.stater.get().statRules;
  }
}

export default ViewController;
