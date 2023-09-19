export type Answer = {
	answer: string;
	goodAnswer: boolean;
  };
export type Question = {
	rule: string;
	answers: Answer[]
  };
