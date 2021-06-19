import { formatDate } from '../dates';

describe('Utils - Date', () => {
  it('should return formated date', async () => {
    expect(formatDate('2021-06-18T19:55:36+00:00')).toEqual('18 Jun 2021');
  });
});
