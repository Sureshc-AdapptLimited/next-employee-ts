export type EmployeeType = {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  point: number;
  point_system: number;
  remark: string;
  added_by: string;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
};

export interface Employee {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  point: number;
  point_system: number;
  remark: string;
  added_by: string;
  createdAt?: string;
  updatedAt?: string;
}
