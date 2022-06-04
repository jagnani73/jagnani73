import { ENVIRONMENTS } from "./constants/shared-constants";
import { staticImplements } from "./functions";
import { EnvironmentClass } from "./interfaces";

@staticImplements<EnvironmentClass>()
export class Environment {
  static active_env: ENVIRONMENTS = process.env.NEXT_APP_STAGE as ENVIRONMENTS;

  static activeStage(): ENVIRONMENTS {
    return this.active_env;
  }

  static isDevelopment(): boolean {
    return this.active_env === ENVIRONMENTS.development;
  }

  static isProduction(): boolean {
    return this.active_env === ENVIRONMENTS.production;
  }
}
