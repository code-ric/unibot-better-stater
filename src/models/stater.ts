import { StatRule } from "../types/stats";

export type StaterProps = {
  statRules: StatRule[];
};

class Stater implements StaterProps {
  statRules: StatRule[] = [];
}

export default new Stater();
