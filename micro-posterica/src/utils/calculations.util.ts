import type { TotalCalculationInput } from "../interfaces/total-calculation.model";

export const calculateTotalCost = (input: TotalCalculationInput): number => {
  const {
    areaInSqInch,
    materialRate,
    glassRate,
    isGlassSelected,
    multiplier,
    baseFrameCost,
    varnishCost,
    isVarnishChecked,
    laminationCost,
    isLaminationChecked,
    routerCutCost,
    isRouterCutChecked,
    quantity,
  } = input;

  let totalCost =
    areaInSqInch * materialRate +
    (isGlassSelected ? areaInSqInch * glassRate : 0) +
    multiplier * baseFrameCost +
    (isVarnishChecked ? varnishCost : 0) +
    (isLaminationChecked ? laminationCost : 0) +
    (isRouterCutChecked ? routerCutCost : 0);

  totalCost *= quantity;

  return totalCost;
};
