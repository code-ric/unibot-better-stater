import { UniCore } from "unibot-api/UniCore";

export type UniBotProps = {
  core: typeof UniCore;
};

class UniBot implements UniBotProps {
  public core = UniCore;
}

export default new UniBot();
