import { Question } from "./question.model";

export interface Section {

  SectionId: string;
  ParentId: string;
  SectionStatus: string;
  Name: string;
  Description: string;
  ImageUrl: string;
  CreateDate: string;
  CreateUserId: string;
  ModifyDate: string;
  ModifyUserId: string;
  StatusId: number;

  Questions?: Question[];
  Viewing?: boolean;
}