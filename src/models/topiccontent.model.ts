import { Images } from "./images.model";

export interface TopicContent {
  TopicContentId: string;
  TopicId: string;
  SubjectId: string;
  Tittle: string;
  ContentBody: string;
  ContentType: string;
  CreateDate?: string;
  CreateUserId: string;
  ModifyDate?: string;
  ModifyUserId: string;
  StatusId: number;
  Recordings?: Images[];
  EditMode?:boolean
  SafeContentBody?:any
  Images?: Images[];
  Documents?: Images[];
}


export interface Topic {
  TopicId: string;
  SubjectId: string;
  GradeId: string;
  Name: string;
  Description: string;
  ImageUrl: string;
  CreateDate?: string;
  CreateUserId: string;
  ModifyDate?: string;
  ModifyUserId: string;
  StatusId: number;
  TopicContent?: TopicContent[];
}
