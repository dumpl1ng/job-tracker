export class DisplayedJob {
    constructor(
        public index: number,
        public url: string,
        public title: string,
        public company: string,
        public status: string,
        public dateApplied: Date
      ) { }
}