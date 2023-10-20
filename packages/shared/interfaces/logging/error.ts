export interface Error {
  name: string;
  message: string;
  stack?: string;
  response?: any;
}

export type LoggingHandler = (message: any, ...optionalParams: [...any, string?, string?]) => void;

export interface Error {
  name: string;
  message: string;
  stack?: string;
  response?: any;
}

export interface ErrorResponse {
  message: string;
  statusCode: number;
  error?: Error;
}

export type ErrorHandler = {
  (): never;
  (arg1: string | Error | number): never;
  (arg1: string | Error, arg2: number): never;
  (arg1: string, arg2: Error): never;
  (arg1: string, arg2: Error, arg3: number): never;
  (arg1: Error, arg2: number): never;
  (arg1: number | string | Error, arg2?: number | Error, arg3?: number): never;
};
