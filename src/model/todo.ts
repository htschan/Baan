import { BaseEntity } from './base.entity';

export class Todo extends BaseEntity {

    constructor(data: any | null) {
        super(data.timestamp, data.createdBy);
        if (data) {
            this.title = data.title;
            this.comment = data.comment;
            this.finished = data.finished;
        };
    }

    cloneFrom(o: any): this {
        return Object.assign(this, o);
    }

    title: string = "neues Todo";
    comment?: string;
    finished?: boolean;
}