import { getDateMinusDays, getFormattedDate } from '@/utils/date';

test('Transform date to yyyy-mm-dd form', () => {
  const date = new Date(1655531070000);
  const dateOutput = getFormattedDate(date);
  expect(dateOutput).toBe('2022-06-18');
});

test('Get Date - {x} days', () => {
  const date = new Date(1655531070000);
  const dateOutput = getDateMinusDays(date, 4);
  expect(dateOutput).toStrictEqual(new Date('Saturday, 14 June 2022'));
});
