export const OfferedCourseClassScheduleSearchableFields = ['dayOfWeek'];
export const OfferedCourseClassScheduleRelationalFields = [
  'offeredCourseSectionId',
  'semesterRegistrationId',
  'roomId',
  'facultyId',
];
export const OfferedCourseClassScheduleRelationalFieldsMapper: {
  [key: string]: string;
} = {
  offeredCourseSectionId: 'offeredCourseSection',
  semesterRegistrationId: 'semesterRegistration',
  roomId: 'room',
  facultyId: 'faculty',
};

export const OfferedCourseClassScheduleFilterableFields = [
  'searchTerm',
  'dayOfWeek',
  'offeredCourseSectionId',
  'semesterRegistrationId',
  'roomId',
  'facultyId',
];
