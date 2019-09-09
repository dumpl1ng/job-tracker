export class Job {

    constructor(
        public url: string,
        public title: string,
        public company: string,
        public state: string,
        public dateApplied: Date
      ) { }
      
}