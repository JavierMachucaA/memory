export class CardEntity {
    constructor(
        public id: number,
        public width: number,
        public height: number,
        public value: string,
        public suite: string
    ) {}
}