export interface Meal {
  id?: string;
  name: string;
  type: string;
  servings: number;
  cookingTime: number;
  ingredients: string[];
  recipe?: string[];
  youtubeLink?: YoutubeLink[];
  isPinned?: boolean;
}

export interface YoutubeLink {
  title?: string;
  url?: string;
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
