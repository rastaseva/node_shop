import RequestRejection from '../../models/RequestRejection.model';
import rejectService from '../reject.service';

const status500 = 500;
const status400 = 400;
const extendedErrorMessage = 'error';
const triggerErrorMessage = 'trigger error';

describe('errorHandler service', () => {
  describe('handle method', () => {
    describe('should pass an ExtendedError instance', () => {
      const error = new RequestRejection(status500, triggerErrorMessage, {
        trigger: new Error(triggerErrorMessage),
      });

      const extendedError = rejectService.handleError(
        error,
        status400,
        extendedErrorMessage
      );

      test('should return incoming instance', () => {
        expect(extendedError).toBe(error);
      });
      test('should not change message', () => {
        expect(extendedError.message).toBe(triggerErrorMessage);
      });
      test('should not change status', () => {
        expect(extendedError.status).toBe(status500);
      });
    });

    describe('should return ExtendedError instance on error input', () => {
      const error = new Error(triggerErrorMessage);

      const extendedError = rejectService.handleError(
        error,
        status500,
        extendedErrorMessage
      );

      test('should return incoming instance', () => {
        expect(extendedError).toBeInstanceOf(RequestRejection);
      });
      test('result should have message property', () => {
        expect(extendedError.message).toBe(extendedErrorMessage);
      });
      test('result should have status property', () => {
        expect(extendedError.status).toBe(status500);
      });
    });
  });
});
