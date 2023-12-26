export enum actionToDo {
  CREATE = "C",
  UPDATE = "U",
  DELETE = "D",
  READ = "R",
}

export enum statusToDo {
  TODO = "TODO",
  INPROGRESS = "INPROGRESS",
  DONE = "DONE",
}

export interface TodoDto {
  _id?: string;
  title: string;
  description: string;
  status: statusToDo;
  updateDate?: Date;
  createDate?: Date;
}
