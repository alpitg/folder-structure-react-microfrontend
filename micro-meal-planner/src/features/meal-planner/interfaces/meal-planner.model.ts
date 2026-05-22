export interface Meal {
  name: string;
  type: string;
  servings: number;
  cookingTime: number;
  ingredients: string[];
  recipe?: string[];
  youtubeLink?: string[];
  isPinned?: boolean;
}

export interface MaidModeOptions {
  enabled: boolean;
  language: "none" | "hindi" | "marathi";
  lessSpicy: boolean;
  easyCook: boolean;
}

export interface MealPlannerProps {
  maidMode?: MaidModeOptions;
  meals?: Meal[];
  handlePin?: (meal: Meal) => void;
}
