import { Answer } from "./question";

export type Cours = {
	level: string;
	subject: string;
	chapter: string;
	title: string;
	content: string;
	questions: Answer[]
  };