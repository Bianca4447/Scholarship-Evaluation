import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Intern } from '../model/interns';

@Injectable({
  providedIn: 'root'
})
export class InternService {

  readonly baseUrl = 'https://localhost:5001';
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient, private router: Router) { }

  getInterns(): Observable<Intern[]>{
    return this.httpClient.get<Intern[]>(
      this.baseUrl + '/intern',
      this.httpOptions
    );
  }

  addIntern(intern: Intern){
    return  this.httpClient.post(this.baseUrl+"/intern", intern).subscribe(
      response => {
        this.router.navigate(['intern'])
      }
    );
  }

  deleteIntern(id: string) {

    return this.httpClient.delete(this.baseUrl + '/intern/' + id);
   
  }
  
  editNote(intern: Intern){
    return this.httpClient.put(this.baseUrl + "/intern?id="+ intern.id, intern).subscribe(response => {
        this.router.navigate(['intern'])
    });
  
  }

}

