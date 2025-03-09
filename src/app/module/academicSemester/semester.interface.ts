export type TMonth =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type TSemesterNames = 'Autumn' | 'Summer' | 'Fall';
export type TSemesterCode = '01' | '02' | '03';

export type TAcademicSemester = {
  name: TSemesterNames;
  year: string;
  code: TSemesterCode;
  startMonth: TMonth;
  endMonth: TMonth;
};

export type TSemesterNameCodeMapper = {
  Autumn: string;
  Summer: string;
  Fall: string;
};
