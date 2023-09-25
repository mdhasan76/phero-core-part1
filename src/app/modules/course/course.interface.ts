export type ICoursesData = {
  title: string;
  code: string;
  credits: number;
  preRequisiteCourses: {
    courseId: string;
    isDeleted?: boolean;
  }[];
};

export type ICoursesDataFilters = {
  searchTerm?: string | undefined;
};
