import { Company } from "./company.model";

export interface User {
  UserId?: string;
  CompanyId: string;
  Tittle: string;
  UserType: string;
  Name: string;
  Surname: string;
  Email: string;
  PhoneNumber: string;
  Password: string;
  Dp: string;
  AddressLineHome: string;
  AddressUrlHome: string;
  AddressLineWork: string;
  AddressUrlWork: string;
  CreateUserId: string;
  ModifyUserId: string;
  StatusId: number;

  CreateDate?: string;
  ModifyDate?: string;
  UserToken?: string;

  Company?: Company;
  CompanyName?: string;
  Slug?: string;
  CompanyDp?: string;

  Grade?: string;
}
