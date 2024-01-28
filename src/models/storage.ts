import config, { ConfigProps } from "./config";
import stater, { StaterProps } from "./stater";
import unibot, { UniBotProps } from "./unibot";

export type Store = {
  unibot: UniBotProps;
  config: ConfigProps;
  stater: StaterProps;
};

class Storage implements Store {
  public unibot = unibot;
  public config = config;
  public stater = stater;
}

export default new Storage();
