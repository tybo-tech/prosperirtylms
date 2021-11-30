import { Answer } from "./answer.model";

export interface Question {
  QuestionId: string;
  AssignmentId: string;
  SectionId: string;
  Question: string;
  QuestionView?: any;
  QuestionType: string;
  Score: number;
  ImageUrl: string;
  CreateDate?: string;
  CreateUserId: string;
  ModifyDate?: string;
  ModifyUserId: string;
  StatusId: number;
  Answers?: Answer[];
  CorrectAnswer?: string;
  StudentAnswer?: string;
  ShowMore?: boolean;
}