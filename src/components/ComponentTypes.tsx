import React from "react";
export type Student = {
  name: string;
  sex: string;
  Date_of_Birth: string;
  Place_of_Birth: string;
  groups: string[];
  id: number;
};
export type Bodytype = {
  handleClickOpens: () => void;
  getId: (id: number) => void;
  handleID: () => void;
};
export type SideProps = {
  getfilter(e: string): void;
};
export type tableStudentProps = {
  name: string;
  sex: string;
  Date_of_Birth: string;
  Place_of_Birth: string;
  groups: string[];
  id: number;
};
export type Tableprops = {
  tablestu: tableStudentProps[];
  setTablestu(e: tableStudentProps[]): void;
  handleClickOpens: () => void;
  getId: (id: number) => void;
};
export type TopStudentProps = {
  name: string;
  sex: string;
  Date_of_Birth: string;
  Place_of_Birth: string;
  groups: string[];
  id: number;
};
export type Topprops = {
  term: string;
  searchkeyword(e: string): void;
  topstudents: TopStudentProps[];
  handleClickOpen: () => void;
  handleID: () => void;
};
export type CreateStudentProps = {
  name: string;
  sex: string;
  Date_of_Birth: string;
  Place_of_Birth: string;
  groups: string[];
  id: number;
};
export type Createprops = {
  createstu: CreateStudentProps[];
  setCreatestu: React.Dispatch<React.SetStateAction<Student[]>>;
  id: number;
};
