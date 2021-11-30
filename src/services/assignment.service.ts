import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Assignment } from "src/models/assignment.model";


@Injectable({
  providedIn: 'root'
})
export class AssignmentService {


  private assignmentListBehaviorSubject: BehaviorSubject<Assignment[]>;
  public assignmentListObservable: Observable<Assignment[]>;

  private assignmentBehaviorSubject: BehaviorSubject<Assignment>;
  public assignmentObservable: Observable<Assignment>;
  url: string;

  constructor(
    private http: HttpClient
  ) {
    this.assignmentListBehaviorSubject = new BehaviorSubject<Assignment[]>(JSON.parse(localStorage.getItem('AssignmentsList')) || []);
    this.assignmentBehaviorSubject = new BehaviorSubject<Assignment>(JSON.parse(localStorage.getItem('CurrentAssignment')));
    this.assignmentListObservable = this.assignmentListBehaviorSubject.asObservable();
    this.assignmentObservable = this.assignmentBehaviorSubject.asObservable();
    this.url = environment.API_URL;
  }

  public get currentAssignmentValue(): Assignment {
    return this.assignmentBehaviorSubject.value;
  }



  add(assignment: Assignment) {
    return this.http.post<Assignment>(`${this.url}/api/assignment/add-assignment.php`, assignment);
  }
  getAssignments(subjectId: string) {
    return this.http.get<Assignment[]>(`${this.url}/api/assignment/get-assignments.php?SubjectId=${subjectId}`).subscribe(data => {
      this.assignmentListBehaviorSubject.next(data || []);
    });
  }

  getAssignment(assignmentId: string) {
    return this.http.get<Assignment>(`${this.url}/api/assignment/get-assignment.php?AssignmentId=${assignmentId}`);
  }

  getAssignmentsBySubjectID(subjectId: string, gradeId: string): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(`${this.url}/api/assignment/get-assignments.php?SubjectId=${subjectId}&GradeId=${gradeId}`)
  }
  update(assignment: Assignment) {
    return this.http.post<Assignment>(`${this.url}/api/assignment/update-assignment.php`, assignment);
  }


}
