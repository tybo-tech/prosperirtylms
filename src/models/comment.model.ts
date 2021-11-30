export interface Comment {
    CommentId: string;
    OtherId: string;
    ParentId: string;
    Name: string;
    UserName: string;
    UserDp: string;
    CreateUserId: string;
    CreateDate?: string;
    ModifyUserId: string;
    StatusId: number;
}
