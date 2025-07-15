import chalk from 'chalk';

export interface Logger {
  info: (msg: string) => void;
  success: (msg: string) => void;
  error: (msg: string, detail?: unknown) => void;
  step: (msg: string) => void;
  verbose: (msg: string) => void;
  group: (msg: string) => void;
  warning: (msg: string) => void;
}

/**
 * Creates a logger instance.
 * @param verbose - Whether to show verbose output.
 */
export function createLogger(verbose = false): Logger {
  const icons = {
    info: '→',
    success: '✓',
    error: '✗',
    step: '•',
    verbose: '·',
    warning: '⚠',
  };

  const indent = '  ';
  const colors = {
    info: chalk.blue,
    success: chalk.green,
    error: chalk.red,
    step: chalk.blue,
    verbose: chalk.gray,
    warning: chalk.yellow,
  };

  return {
    info: (msg) => console.log(colors.info(icons.info), msg),
    success: (msg) => console.log(colors.success(icons.success), msg),
    error: (msg, detail) => console.error(colors.error(icons.error), msg, detail || ''),
    step: (msg) => console.log(indent + colors.step(icons.step), msg),
    verbose: (msg) => verbose && console.log(indent + indent + colors.verbose(icons.verbose), msg),
    group: (msg) => console.log('\\n' + colors.info(icons.info), msg),
    warning: (msg) => console.log(colors.warning(icons.warning), msg),
  };
}
