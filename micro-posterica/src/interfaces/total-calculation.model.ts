export interface TotalCalculationInput {
  areaInSqInch: number;
  materialRate: number;
  glassRate: number;
  isGlassSelected: boolean;
  multiplier: number;
  baseFrameCost: number;
  varnishCost: number;
  isVarnishChecked: boolean;
  laminationCost: number;
  isLaminationChecked: boolean;
  routerCutCost: number;
  isRouterCutChecked: boolean;
  quantity: number;
}
