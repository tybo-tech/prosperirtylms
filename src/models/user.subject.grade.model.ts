import { Assignment } from "./assignment.model";
import { Topic, TopicContent } from "./topiccontent.model";

export interface UserSubjectGrade {
  Id: string;
  UserId: string;
  SubjectId: string;
  GradeId: string;
  UserType: string;
  Year: number;
  SubjectName: string;
  GradeName: string;
  CreateDate?: string;
  CreateUserId: string;
  ModifyDate?: string;
  ModifyUserId: string;
  StatusId: number;
  Topiccontent?: TopicContent[];
  Topics?: Topic[];
  Assignments?: Assignment[];
  
  // counts 
  LessonCount?: number;
  ClassworkCount?: number;
  HomeworkCount?: number;
  AssignmentCount?: number;


}
