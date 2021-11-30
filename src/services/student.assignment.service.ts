import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { StudentAssignment } from "src/models/student.assignment.model";


@Injectable({
  providedIn: 'root'
})
export class StudentAssignmentService {


  private StudentAssignmentListBehaviorSubject: BehaviorSubject<StudentAssignment[]>;
  public StudentAssignmentListObservable: Observable<StudentAssignment[]>;

  private StudentAssignmentBehaviorSubject: BehaviorSubject<StudentAssignment>;
  public StudentAssignmentObservable: Observable<StudentAssignment>;
  url: string;

  constructor(
    private http: HttpClient
  ) {
    this.StudentAssignmentListBehaviorSubject = new BehaviorSubject<StudentAssignment[]>(JSON.parse(localStorage.getItem('StudentAssignmentsList')) || []);
    this.StudentAssignmentBehaviorSubject = new BehaviorSubject<StudentAssignment>(JSON.parse(localStorage.getItem('CurrentStudentAssignment')));
    this.StudentAssignmentListObservable = this.StudentAssignmentListBehaviorSubject.asObservable();
    this.StudentAssignmentObservable = this.StudentAssignmentBehaviorSubject.asObservable();
    this.url = environment.API_URL;
  }

  public get currentStudentAssignmentValue(): StudentAssignment {
    return this.StudentAssignmentBehaviorSubject.value;
  }



  add(StudentAssignment: StudentAssignment) {
    return this.http.post<StudentAssignment>(`${this.url}/api/studentassignment/add-studentassignment.php`, StudentAssignment);
  }
  getStudentAssignments(subjectId: string) {
    return this.http.get<StudentAssignment[]>(`${this.url}/api/studentassignment/get-studentassignments.php?SubjectId=${subjectId}`).subscribe(data => {
      this.StudentAssignmentListBehaviorSubject.next(data || []);
    });
  }

  getStudentAssignment(StudentAssignmentId: string) {
    return this.http.get<StudentAssignment>(`${this.url}/api/studentassignment/get-studentassignment.php?StudentAssignmentId=${StudentAssignmentId}`);
  }
  getStudentAssignmentByStudentd(studentd: string) {
    return this.http.get<StudentAssignment[]>(`${this.url}/api/studentassignment/get-studentassignments-for-student.php?Studentd=${studentd}`);
  }
  getStudentAssignmentforAssignment(assignmentId: string) {
    return this.http.get<StudentAssignment[]>(`${this.url}/api/studentassignment/get-studentassignments-for-assignment.php?AssignmentId=${assignmentId}`);
  }
  getStudentAssignmentByStudentdAndAssigmetId(studentd: string,assignmentId) {
    return this.http.get<StudentAssignment[]>(
      `${this.url}/api/studentassignment/get-studentassignments-for-student-and-assignment.php?Studentd=${studentd}&AssignmentId=${assignmentId}`);
  }

  getStudentAssignmentsBySubjectID(subjectId: string, gradeId: string): Observable<StudentAssignment[]> {
    return this.http.get<StudentAssignment[]>(`${this.url}/api/studentassignment/get-studentassignments.php?SubjectId=${subjectId}&GradeId=${gradeId}`)
  }
  update(StudentAssignment: StudentAssignment) {
    return this.http.post<StudentAssignment>(`${this.url}/api/studentassignment/update-studentassignment.php`, StudentAssignment);
  }
  updateRange(StudentAssignment: StudentAssignment[]) {
    return this.http.post<StudentAssignment[]>(`${this.url}/api/studentassignment/update-studentassignment-range.php`, StudentAssignment);
  }


}
