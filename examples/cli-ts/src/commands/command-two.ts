import { createLogger } from '../utils/logger.js';

interface CommandTwoOptions {
  force: boolean;
}

/**
 * A placeholder for the second command, demonstrating options.
 * @param name - A required argument.
 * @param options - Optional flags.
 */
export async function commandTwo(name: string, options: CommandTwoOptions): Promise<void> {
  const logger = createLogger();
  logger.info(`Executing Command Two for: ${name}`);
  if (options.force) {
    logger.warning('Force option is enabled.');
  }
  // TODO: Add the actual logic for this command.
  logger.success('Command Two finished.');
}
