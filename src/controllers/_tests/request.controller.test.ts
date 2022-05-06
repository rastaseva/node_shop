import rejectController from '../request.controllers/reject.controller';
import requestController from '../request.controller';

describe('request controller', () => {
  test('reject method should contain rejectController', () =>
    expect(requestController.reject).toBe(rejectController));
});
