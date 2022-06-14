import { getFormattedDate } from '@/utils/date';

test('Tranform data', () => {
  const date = new Date(1655234340000);
  const dateOutput = getFormattedDate(date);
  expect(dateOutput).toBe('2022-06-14');
});
