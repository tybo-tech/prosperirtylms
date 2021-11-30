import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomesliderwidgetpipePipe } from 'src/pipes/homesliderwidgetpipe.pipe';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { GradeComponent } from './dashboard/grades/grade/grade.component';
import { GradesComponent } from './dashboard/grades/grades/grades.component';
import { AnswersComponent } from './dashboard/subjects/answers/answers.component';
import { StudentAnswerComponent } from './dashboard/subjects/answers/student-answer/student-answer.component';
import { AssignmentComponent } from './dashboard/subjects/assignment/assignment.component';
import { AssignmentSubmissionsComponent } from './dashboard/subjects/assignments/assignment-submissions/assignment-submissions.component';
import { AssignmentsComponent } from './dashboard/subjects/assignments/assignments.component';
import { StudentAssignmentComponent } from './dashboard/subjects/assignments/student-assignment/student-assignment.component';
import { LessonComponent } from './dashboard/subjects/lesson/lesson.component';
import { LessonsComponent } from './dashboard/subjects/lessons/lessons.component';
import { SubjectFeedComponent } from './dashboard/subjects/subject-feed/subject-feed.component';
import { SubjectComponent } from './dashboard/subjects/subject/subject.component';
import { SubjectsComponent } from './dashboard/subjects/subjects/subjects.component';
import { UserSubjectsComponent } from './dashboard/users/user-subjects/user-subjects.component';
import { UserComponent } from './dashboard/users/users/user/user.component';
import { UsersComponent } from './dashboard/users/users/users.component';
import { AboutUsComponent } from './home/about-us/about-us.component';
import { LoginComponent } from './home/account/login/login.component';
import { ProfileComponent } from './home/account/profile/profile.component';
import { SignUpComponent } from './home/account/sign-up/sign-up.component';
import { BannerWidgetComponent } from './home/banner-widget/banner-widget.component';
import { ContactUsComponent } from './home/contact-us/contact-us.component';
import { FooterComponent } from './home/footer/footer.component';
import { HomeComponent } from './home/home/home.component';
import { NavComponent } from './home/nav/nav.component';
import { ActivityFeedComponent } from './shared/activity-feed/activity-feed.component';
import { AttachmentsComponent } from './shared/attachments/attachments.component';
import { BreadComponent } from './shared/bread/bread.component';
import { CardListWidgetComponent } from './shared/card-list-widget/card-list-widget.component';
import { CommentComponent } from './shared/comment/comment.component';
import { ItemListWidgetComponent } from './shared/item-list-Widget/item-list-Widget.component';
import { PopComponent } from './shared/pop/pop.component';
import { VoiceRecoderComponent } from './shared/voice-recoder/voice-recoder.component';


const routes: Routes = [
  {
    path:'',component: HomeComponent
  },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'users/:id', component: UsersComponent },
  { path: 'grades', component: GradesComponent },
  { path: 'grade/:id', component: GradeComponent },
  { path: 'subjects', component: SubjectsComponent },
  { path: 'subject/:id', component: SubjectComponent },
  { path: 'subject-feed/:id', component:   SubjectFeedComponent},
  { path: 'user/:id/:userType', component: UserComponent },
  { path: 'user-subject/:id/:userType', component: UserSubjectsComponent },
  { path: 'lessons/:id/:backto', component:   LessonsComponent},
  { path: 'lesson/:id/:gradeId/:subjectId/:backto', component:   LessonComponent},
  { path: 'assignments/:id/:type', component:   AssignmentsComponent},
  { path: 'assignment/:id', component:   AssignmentComponent},
  { path: 'submissions/:id', component:   AssignmentSubmissionsComponent},
  { path: 'profile', component:   ProfileComponent},
];

export const declarations = [
  HomeComponent,
  NavComponent,
  FooterComponent,
  HomeComponent,
  NavComponent,
  AboutUsComponent,
  ContactUsComponent,
  LoginComponent,
  DashboardComponent,
  BannerWidgetComponent,
  SignUpComponent,
  CardListWidgetComponent,
  ItemListWidgetComponent,
  UsersComponent,
  HomesliderwidgetpipePipe,
  UserComponent,
  PopComponent,
  GradeComponent,
  GradesComponent,
  SubjectComponent,
  SubjectsComponent,
  UserSubjectsComponent,
  SubjectFeedComponent,
  LessonComponent,
  LessonsComponent,
  AssignmentComponent,
  AssignmentsComponent,
  VoiceRecoderComponent,
  CommentComponent,
  BreadComponent,
  ProfileComponent,
  AnswersComponent,
  StudentAssignmentComponent,
  StudentAnswerComponent,
  ActivityFeedComponent,
  AssignmentSubmissionsComponent,
  AttachmentsComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
