import { Component, OnInit, OnDestroy } from '@angular/core';
import { Job } from '../job.model';
import { JobService } from '../job.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { DisplayedJob } from '../DisplayedJob.model';
import { trigger, state, style, transition, animate } from '@angular/animations';

const anim = [
  trigger('openCloseSearching',[
    state('open', style({
      width: '100px',
      opacity: '1'
    })),
    state('closed', style({
      width: '0px',
      opacity: '0'
    })),
    transition('open => closed', [animate('0.5s')]),
    transition('closed => open', [animate('0.5s')])
  ])
];

@Component({
  selector: 'app-jobs-list',
  animations: anim,
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css']
})
export class JobsListComponent implements OnInit, OnDestroy{
  jobs: DisplayedJob[] = [];
  jobIndex = 0;
  jobStatus: string[] = [];
  jobStatusSortKey = "not applied";
  private userId;
  private isNewJob = false;

  // for searching
  searchInput: string = '';
  searchedJobs: DisplayedJob[] = [];
  
  

  // for pagination
  pageOfjobs: Array<any>;
  public jobsPerPage = 10;

  // for animation
  isSearchingOpen = false;

  private jobsSubscription: Subscription;

  constructor(private jobService: JobService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.jobStatus = this.jobService.getStatus();

    // memorize the user selected status
    const localStorageStatusSortKey = JSON.parse(localStorage.getItem('job-tracker-jobStatusSortKey'));

    if (localStorageStatusSortKey) {
      this.jobStatusSortKey = localStorageStatusSortKey;
    }

    this.route.params.subscribe(
      (params: Params) => {
        this.userId = params['userId'];


        this.jobService.getJobsFromRepository(this.userId, this.jobStatusSortKey);
    
        this.jobsSubscription = this.jobService.jobChanged.subscribe(
          next => {
            this.jobs = [];
            for (let i = 0; i < next.length; i++){
              let tempJob = next[i];
              let displayedJob = new DisplayedJob(i, tempJob.url, tempJob.title, tempJob.company, tempJob.status, tempJob.dateApplied);

              this.jobs.push(displayedJob);
            }
            if (this.isSearchingOpen){
              this.searchForCompany();
            }
          }
        );
      }
    );
    
    // get the job index from the url
    if (this.route.firstChild != null){
      this.route.firstChild.params.subscribe(
        (params: Params) => {
          if(params['id']){
            
            if(params['id'] === 'new'){
              this.isNewJob = true;
            }else{
              this.jobIndex = +params['id'];
            }
          }
        }
      );
    }

  }

  // add new job to existing jobs
  addNewJob() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.jobsSubscription.unsubscribe();
  }

  onOpenJobEdit(index: number) {
    this.router.navigate([index], {relativeTo: this.route});
  }

  onChangePage(pageOfitems: Array<any>) {
    this.pageOfjobs = pageOfitems;
  }

  // get the page index from the job index
  getPageNum() {
    let pageNum = 0;
    if( !this.isNewJob ){
      pageNum = Math.ceil((this.jobIndex + 1) / this.jobsPerPage);
    }
    
    return pageNum;
  }

  sortByStatus(status: string) {
    localStorage.setItem('job-tracker-jobStatusSortKey', JSON.stringify(status));
    this.jobStatusSortKey = status;
    this.jobService.getJobsFromRepository(this.userId, this.jobStatusSortKey);
  }

  toggleButton() {
    this.isSearchingOpen = !this.isSearchingOpen;
  }

  // search for the company name that user typed
  searchForCompany() {
    // check if the lowercased jobs contain the lowercased user input
    this.searchedJobs = this.jobs.filter(job => job.company.toLowerCase().includes(this.searchInput.toLowerCase()));
  }

  
}
