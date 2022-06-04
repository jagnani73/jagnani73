import { ENVIRONMENTS } from "./constants/shared-constants";

export interface EnvironmentClass {
  active_env: ENVIRONMENTS;
  activeStage: () => ENVIRONMENTS;
  isDevelopment: () => boolean;
  isProduction: () => boolean;
}
