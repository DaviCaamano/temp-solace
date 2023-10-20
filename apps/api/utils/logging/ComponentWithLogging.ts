import { ErrorHandler, LoggingHandler } from '#interfaces/logging';
import { log as consoleLog } from '#utils/logging';
import { errorHandler, logHandler } from './errorHandler';

export class ComponentWithLogging {
  protected debug: LoggingHandler;
  protected error: LoggingHandler;
  protected log: LoggingHandler;
  protected verbose: LoggingHandler;
  protected warn: LoggingHandler;
  protected report: ErrorHandler;
  protected setLogs({
    debug,
    error,
    log,
    warn,
    verbose,
  }: {
    debug?: (...args: any) => any;
    error?: (...args: any) => any;
    log?: (...args: any) => any;
    warn?: (...args: any) => any;
    verbose?: (...args: any) => any;
  }) {
    this.debug = logHandler(debug ? debug : consoleLog);
    this.error = logHandler(error ? error : consoleLog);
    this.log = logHandler(log ? log : consoleLog);
    this.warn = logHandler(warn ? warn : consoleLog);
    this.verbose = logHandler(verbose ? verbose : consoleLog);
    this.report = errorHandler(error ? error : consoleLog);
  }
}
