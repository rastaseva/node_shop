import { SOMETHING_WENT_WRONG } from '../consts/general.const';

interface StatusDescription {
  [status: number]: string;
}

interface RequestRejectionDetails {
  details?: string[];
  trigger?: Error;
}

class RequestRejection extends Error {
  readonly status: number;

  readonly statusText: string;

  readonly trigger?: Error;

  readonly details?: string[];

  constructor(status: number, message: string, data?: RequestRejectionDetails) {
    super(message);
    this.status = status;

    if (this.stack) {
      this.stack = this.stack // we do not need this constcructor to appear in stack
        .split('at')
        .filter((u, i) => i !== 1)
        .join('at');
    }

    this.statusText =
      RequestRejection.statusDesc[status] || SOMETHING_WENT_WRONG;

    if (data) {
      const { trigger, details } = data;
      if (trigger) {
        this.trigger = trigger;
      }
      if (details) {
        this.details = data.details;
      }
    }
  }

  static statusDesc: StatusDescription = {
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    405: 'Method Not Allowed',
    409: 'Conflict',
    422: 'Unprocessable Entity',
    500: 'Internal Server Error',
  };
}

export default RequestRejection;
