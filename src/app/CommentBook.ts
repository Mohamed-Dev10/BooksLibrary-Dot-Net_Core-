// comment.model.ts

export class CommentBook {
  commentid!: number;
  description!: string;
  userid!: string;
  user!: string; // Add the missing property

  constructor(data: Partial<CommentBook> = {}) {
    Object.assign(this, data);
  }
}

