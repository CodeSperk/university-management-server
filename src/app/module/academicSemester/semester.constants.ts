import {
  TSemesterCode,
  TSemesterNames,
  TMonth,
  TSemesterNameCodeMapper,
} from './semester.interface';

export const Months: TMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const SemesterNames: TSemesterNames[] = ['Autumn', 'Summer', 'Fall'];

export const SemesterCode: TSemesterCode[] = ['01', '02', '03'];

export const SemerNameCodeMapper: TSemesterNameCodeMapper = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};

// eslint-disable-next-line prettier/prettier
export const semesterSearchableFields = [
  'name',
  'code',
  'year'
];