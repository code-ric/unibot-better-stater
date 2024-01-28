export type ConfigProps = {
  debugEnabled: boolean;
};

class Config implements ConfigProps {
  debugEnabled = false;
}

export default new Config();
