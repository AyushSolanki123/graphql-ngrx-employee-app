export interface Employee {
  _id?: string;
  id?: number;
  firstName?: string;
  lastName?: string;
  dob?: string;
  company?: string;
  isDeleted?: boolean;
}

export const employees: Employee[] = [
  {
    id: 1001,
    firstName: 'Ayush',
    lastName: 'Solanki',
    dob: '2001-08-19',
    company: 'Innovapptive',
    isDeleted: false,
  },
  {
    id: 1002,
    firstName: 'Sanskar',
    lastName: 'Jain',
    dob: '2001-03-05',
    company: 'Innovapptive',
    isDeleted: false,
  },
  {
    id: 1003,
    firstName: 'Atul',
    lastName: 'Pandey',
    dob: '2001-08-20',
    company: 'Innovapptive',
    isDeleted: false,
  },
];
