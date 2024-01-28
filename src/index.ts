import StaterController from "./controllers/stater";
import ViewController from "./controllers/view";
import storage from "./models/storage";

const viewController = new ViewController(storage);
let staterController: StaterController;
let isInitialized = false;

storage.unibot.core.On("tick", () => {
  const player = storage.unibot.core.GetCurrentPlayer();

  if (player) {
    viewController.update();

    if (!isInitialized) {
      staterController = new StaterController(storage, player);
      storage.unibot.core.Log("BetterStat'er initialized!");
    }

    staterController.evaluateStatRules(player);
  }
});
