export type IPaginationParams = {
  term?: string;
  page?: number;
  pageSize?: number;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
};

export type IPaginationResponse<T> = {
  message?: string;
  pageInfo: {
    totalCount: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  courses: T[];
};
