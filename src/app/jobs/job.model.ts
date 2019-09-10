export class Job {

    constructor(
        public url: string,
        public title: string,
        public company: string,
        public status: string,
        public dateApplied: Date
      ) { }
      
}