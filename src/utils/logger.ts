import storage from "../models/storage";

class Logger {
  private config = storage.config;
  private unibot = storage.unibot;
  constructor() {}

  public info(message: string) {
    if (this.config.debugEnabled) {
      this.unibot.core.Log(message);
    }
  }
}

export default new Logger();
