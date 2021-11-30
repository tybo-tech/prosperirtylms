import { Images } from "./images.model";
import { Question } from "./question.model";
import { StudentAssignment } from "./student.assignment.model";

export interface Assignment {
  AssignmentId?: string;
  Tittle: string;
  GradeId: string;
  SubjectId: string;
  Instructions: string;
  Points: number;
  DueDate: string;
  DueTime: string;
  NumberOfAttempts: string;
  SetTimer: string;
  ScoreAttempt: string;
  AvailabilityFrom: string;
  AvailabilityTo: string;
  AssignmentType: string;
  RequireAttachment: string;
  CreateDate?: string;
  CreateUserId: string;
  ModifyDate?: string;
  ModifyUserId: string;
  StatusId: number;
  Images?: Images[];
  ShowMore?: boolean;
  SubmitionsCount?: number;
  Questions?: Question[];
  Submitions?: StudentAssignment[];
}

/*

 Home work
 Class Work
 Quizes
 Assihgments

 */