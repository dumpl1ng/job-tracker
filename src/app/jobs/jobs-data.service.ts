import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Subject } from 'rxjs';
import { Job } from './job.model';
import { map, tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class JobsDataService {

  public jobData = new Subject<Job[]>();
  private API = 'https://job-tracker-465e6.firebaseio.com/jobs';

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  addNewJob(job: Job, userId: string) {
    this.http.post(
      this.API + '/users/' + userId + '.json',
      job
    ).subscribe(
      success => {
        this.getAllJobs(userId);
      },
      error => {
        console.log(error);
        alert('An Unknown error occured..');
      }
    );
  }


 getAllJobs(userId: string) {

    this.http.get<Job[]>(
      this.API + '/users/' + userId + '.json',
      {
        headers: new HttpHeaders({'X-Firebase-ETag': 'true'})
      }
    ).pipe(
      map(responses => {
          let res: Job[] = [];
          // tslint:disable-next-line: forin
          for (const i in responses) {
            res.push(new Job(
              responses[i].url,
              responses[i].title,
              responses[i].company,
              responses[i].status,
              new Date(responses[i].dateApplied)
            ));
          }
          this.jobData.next(res);
        }
      )
    ).subscribe();
  }


  deleteAllJobs(userId: string) {
    this.http.delete(
      this.API + '/users/' + userId + '.json'
    ).subscribe(
      success => {

      },
      error => {
        console.log(error);
        alert('An Unknown error occured when try to delete the job');
      }
    );
  }

  onlyAddNewJob(job: Job, userId: string) {
    this.http.post(
      this.API + '/users/' + userId + '.json',
      job
    ).subscribe(
      success => {
      },
      error => {
        console.log(error);
        alert('An Unknown error occured..');
      }
    );
  }
}
