import type { Meal } from "./meal-planner.model";

export type PlanOption = "today" | "breakfast" | "lunch" | "dinner" | "chilla";

export interface IMealRequestOptions {
  vegNonVeg: "veg" | "non-veg";
  region: string;
  highProtein: boolean;
  quickCooking: boolean;
  maidModeEnabled: boolean;
  maidVoiceLanguage: "none" | "hindi" | "marathi";
  maidLessSpicy: boolean;
  maidEasyCook: boolean;
  planOption?: PlanOption;
}

export interface IMealRequest extends IMealRequestOptions {}

export interface IMealResponse extends Meal {}

export interface YoutubeLink {
  title?: string;
  url?: string;
}

export interface DayMeals {
  day: string;
  meals: Meal[];
}
