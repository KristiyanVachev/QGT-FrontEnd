import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Question } from './_models/quesiton';  
import { questionGenerationRequest } from './_models/questionGenerationRequest';

@Injectable({
  providedIn: 'root'
})
export class QuestionGenerationService {

  private questionGenerationUrl = 'http://localhost:9002/generate';  // URL to web api
  // private questionGenerationUrl = 'api/heroes';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor( private http: HttpClient ) { }

  /** POST: add a new hero to the server */
  generate(req: questionGenerationRequest): Observable<Question[]> {
    return this.http.post<Question[]>(this.questionGenerationUrl, req, this.httpOptions).pipe(
      // catchError(this.handleError<Hero>('addHero'))
    );
  }

}
