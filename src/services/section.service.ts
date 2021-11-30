import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Section } from "src/models/section.model";


@Injectable({
  providedIn: 'root'
})
export class SectionService {


  private SectionListBehaviorSubject: BehaviorSubject<Section[]>;
  public SectionListObservable: Observable<Section[]>;

  private SectionBehaviorSubject: BehaviorSubject<Section>;
  public SectionObservable: Observable<Section>;
  url: string;

  constructor(
    private http: HttpClient
  ) {
    this.SectionListBehaviorSubject = new BehaviorSubject<Section[]>(JSON.parse(localStorage.getItem('SectionsList')) || []);
    this.SectionBehaviorSubject = new BehaviorSubject<Section>(JSON.parse(localStorage.getItem('CurrentSection')));
    this.SectionListObservable = this.SectionListBehaviorSubject.asObservable();
    this.SectionObservable = this.SectionBehaviorSubject.asObservable();
    this.url = environment.API_URL;
  }

  public get currentSectionValue(): Section {
    return this.SectionBehaviorSubject.value;
  }



  add(Section: Section) {
    return this.http.post<Section>(`${this.url}/api/section/add-section.php`, Section);
  }
  getSections(subjectId: string) {
    return this.http.get<Section[]>(`${this.url}/api/section/get-sections.php?SubjectId=${subjectId}`).subscribe(data => {
      this.SectionListBehaviorSubject.next(data || []);
    });
  }

  getSection(SectionId: string) {
    return this.http.get<Section>(`${this.url}/api/section/get-section.php?SectionId=${SectionId}`);
  }

  getSectionsBySubjectID(subjectId: string, gradeId: string): Observable<Section[]> {
    return this.http.get<Section[]>(`${this.url}/api/section/get-sections.php?SubjectId=${subjectId}&GradeId=${gradeId}`)
  }
  update(Section: Section) {
    return this.http.post<Section>(`${this.url}/api/section/update-section.php`, Section);
  }


}
