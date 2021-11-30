import { Answer } from "./answer.model";
import { Images } from "./images.model";
import { Question } from "./question.model";
import { User } from "./user.model";

export interface StudentAssignment {
  Id: number;
  StudentAssignmentId: string;
  AssignmentId: string;
  Studentd: string;
  StartTime: string;
  FinishTime: string;
  Marks: number;
  MarkedById: string;
  MarkedByName: string;
  MarkedDate: string;
  Comments: string;
  AssignmentStatus: string;
  AttemptNumber: number;
  CreateUserId: string;
  ModifyUserId: string;
  StatusId: number
  Answers?: Answer[];
  User?: User;
  TotalMarks?: number;
  PercentMarks?: number;
}

/*

 Home work
 Class Work
 Quizes
 Assihgments

 */