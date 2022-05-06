import appController from '../app.controller';
import statusCheck from '../app.controllers/statusCheck.controller';

describe('app controller', () => {
  test('statusCheck method should contain statusCheck controller', () =>
    expect(appController.statusCheck).toBe(statusCheck));
});
