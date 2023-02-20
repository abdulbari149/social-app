import { getReasonPhrase } from 'http-status-codes'
export class HttpException extends Error {
  public status: number;
  public message: string;
  public error: string;
  constructor(status: number, message: string) {
    super(message);
    this.error = getReasonPhrase(status)
    this.status = status;
    this.message = message;
  }

  
}

