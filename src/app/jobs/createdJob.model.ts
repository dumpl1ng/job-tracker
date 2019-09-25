// model for newly created job
export class createdJob {
    constructor(
        public url: string,
        public title: string,
        public company: string,
        public status: string,
        public dateApplied: Date
      ) { }
}