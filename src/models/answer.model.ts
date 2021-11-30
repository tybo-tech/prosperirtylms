import { Question } from "./question.model";

export interface Answer {
  AnswerId: string;
  QuestionId: string;
  AssignmentId: string;
  StudentId: string;
  MarkedBy: string;
  AnswerStatus: string;
  GradeOptained: number;
  Answer: string;
  IsCoorect: string;
  ImageUrl: string;
  CreateDate?: string;
  CreateUserId: string;
  ModifyDate?: string;
  ModifyUserId: string;
  StatusId: any;
  StudentAnswer?: boolean;
  AnswerView?: any; //SafeDomElement
  ShowMore?: boolean;
  IsSelected?: boolean;
  Question?: Question;
}
