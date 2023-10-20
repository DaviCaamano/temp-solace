import { HttpStatus } from '@nestjs/common/enums/http-status.enum';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import util from 'util';
import { Error, ErrorHandler, ErrorResponse, LoggingHandler } from '#interfaces/logging';

const DEFAULT_MESSAGE = 'INTERNAL SERVER ERROR';
/**
 * Initialize a shortcut function to report HTTP Errors and log them
 * The function takes a [message] string, an [error] class instance and a status [code].
 * Args must always be in the following orders:
 *
 * 1 - [message, error, code]   - Message, Error, and Status Code set by arguments
 * 2 - [message, error]         - Status code defaults to 500
 * 3 - [message]                - Only the message is set, status code defaults to 500
 * 4 - [error, code]            - The Error and Status code are set. The message is set to the error's message
 * 5 - [error]                  - The error's message is set as the message, the Error is set as itself
 * 6 - [code]                   - The message defaults to "INTERNAL SERVER ERROR", the status code is provided.
 * 7 - Nothing                  - The message defaults to "INTERNAL SERVER ERROR", the status code defaults to 500.
 *
 * A) Message String describing the error.
 * B) Error class or JSON, this Error Class or JSON will be omitted from the response
 *        (see errorResponseHandler for more info)
 * C) Status Code number
 */
export const errorHandler = (errorLogger: LoggingHandler): ErrorHandler => {
  function report(): never;
  function report(arg1: string | Error | number): never;
  function report(arg1: string | Error, arg2: number): never;
  function report(arg1: string, arg2: Error): never;
  function report(arg1: string, arg2: Error, arg3: number): never;
  function report(arg1: Error, arg2: number): never;
  function report(arg1?: number | string | Error, arg2?: number | Error, arg3?: number): never {
    let error: any;
    let message: string[] = [];
    let statusCode: number | undefined;

    if (typeof arg1 === 'string') {
      message = [arg1];

      if (isError(arg2)) {
        arg2 = arg2 as Error; //declare type Error
        message.push(arg2.message);
        error = errorObject(arg2);
        if (typeof arg3 === 'number') {
          statusCode = arg3;
        }
      } else if (typeof arg2 === 'number') {
        statusCode = arg2;
      }
    } else if (isError(arg1)) {
      arg1 = arg1 as Error; //declare type Error
      message = [arg1.message];
      error = errorObject(arg1);
      if (typeof arg2 === 'number') {
        statusCode = arg2;
      }
    } else if (typeof arg1 === 'number') {
      statusCode = arg1;
    }
    const errorLog: ErrorResponse = {
      ...error,
      message: message || [DEFAULT_MESSAGE],
      statusCode: statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
    };

    // const fullErrorString = util.inspect(errorLog, false, null, false);
    errorLogger(
      // JSON.parse(
      //   JSON.stringify(fullErrorString, (key, value) => (typeof value === 'bigint' ? value.toString() : value), 2),
      // ),
      errorLog,
    );
    throw new HttpException(errorLog, errorLog.statusCode);
  }
  return report;
};

export const logHandler = (logger: LoggingHandler): LoggingHandler => {
  return (...args: any[]) => {
    let outStr = '';
    for (let i = 0; i < args.length; i++) {
      const arg =
        typeof args[i as number] === 'object' ? util.inspect(args[i as number], false, null, false) : args[i as number];
      outStr += (i > 0 ? ' ' : '') + arg;
    }
    logger(outStr);
  };
};

export const isError = (error: any) =>
  (typeof Error === 'object' && error instanceof Error) || (error && error.stack && error.message);

const errorObject = (error: any): Error => {
  const { name, message, stack, response } = error;
  return { name, message, stack, response };
};
