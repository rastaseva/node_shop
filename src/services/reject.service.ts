import RequestRejection from '../models/RequestRejection.model';

const handleError = (
  error: Error,
  status: number,
  message: string,
  details?: string[]
) => {
  const extendedError =
    error instanceof RequestRejection
      ? error
      : new RequestRejection(status, message, { trigger: error, details });
  return extendedError;
};

const rejectService = {
  handleError,
};

export default rejectService;
