declare type Recordable<T = any> = Record<string, T>;

interface ViteEnv {
  VITE_PORT: number;
  VITE_PROXY: [string, string][];
  VITE_DROP_CONSOLE: boolean;
}
function wrapperEnv(envConf: Recordable): ViteEnv {
  const result: any = {};

  // eslint-disable-next-line no-restricted-syntax
  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, '\n');
    // eslint-disable-next-line no-nested-ternary
    realName = realName === 'true' ? true : realName === 'false' ? false : realName;

    if (envName === 'VITE_PORT') {
      realName = Number(realName);
    }

    if (envName === 'VITE_PROXY' && realName) {
      try {
        realName = JSON.parse(realName.replace(/'/g, '"'));
      } catch (error) {
        realName = '';
      }
    }

    result[envName] = realName;

    if (typeof realName === 'string') {
      process.env[envName] = realName;
    } else if (typeof realName === 'object') {
      process.env[envName] = JSON.stringify(realName);
    }
  }

  return result;
}

// eslint-disable-next-line import/prefer-default-export
export { wrapperEnv };
