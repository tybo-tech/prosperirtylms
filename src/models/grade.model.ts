import { Assignment } from './assignment.model';
import { Topic, TopicContent } from './topiccontent.model';





export interface Subject {
    IsSelected: boolean;
    SubjectId: string;
    CompanyId: string;
    Name: string;
    PassMark: string;
    Description: string;
    ImageUrl: string;
    Code: string;
    CreateDate?: string;
    CreateUserId: string;
    ModifyDate?: string;
    ModifyUserId: string;
    StatusId: number;
    Topics?: Topic[];
    Tests?: any[];
    Viewing?: boolean;
    Grade?: Grade;
    Class?: string[];
    Lessons? : TopicContent[];
    Assignments?;
}



export interface Grade {
    GradeId?: string;
    CompanyId : string;
    Name?: string;
    Description?: string;
    InstituteTypeId: number;
    CreateDate?: string;
    CreateUserId?: string;
    ModifyDate?: string;
    ModifyUserId?: string;
    StatusId?: any;
    Subjects?: Subject[];
    Viewing?: boolean;
    Class?: string[];
    Grade?: any;
    IsSelected?: boolean;
}

export interface Teachersubject {
    Id?: string;
    UserId : string;
    SubjectId: string;
    GradeId: string;
    CreateDate?: string;
    CreateUserId?: string;
    ModifyDate?: string;
    ModifyUserId?: string;
    StatusId?: any;
}