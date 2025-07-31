import { ADDITIONAL_SERVICE_CODE } from "../../../constants/global/global-key.const";
import type { IArtDetail } from "../../../interfaces/total-calculation.model";
import type { IFrameType } from "../../../app/features/master/frame-types/frame-types.slice";
import type { IGlassType } from "../../../app/features/master/glass-types/glass-types.slice";
import type { IMiscCharges } from "../../../app/features/master/misc-charges/misc-charges.slice";

export class BillCalculation {
  frameTypes: IFrameType[];
  glassTypes: IGlassType[] = [];
  miscCharges: IMiscCharges[] = [];

  constructor(
    frameTypes: IFrameType[],
    glassTypes: IGlassType[],
    miscCharges: IMiscCharges[]
  ) {
    this.frameTypes = frameTypes;
    this.glassTypes = glassTypes;
    this.miscCharges = miscCharges;
  }

  chargableWidth = (item: IArtDetail) => {
    const width = parseFloat(item.width) || 0;
    const mountingLeft = parseFloat(String(item?.mounting?.left)) || 0;
    const mountingRight = parseFloat(String(item?.mounting?.right)) || 0;
    return width + mountingLeft + mountingRight;
  };

  chargableHeight = (item: IArtDetail) => {
    const height = parseFloat(item.height) || 0;
    const mountingTop = parseFloat(String(item?.mounting?.top)) || 0;
    const mountingBottom = parseFloat(String(item?.mounting?.bottom)) || 0;
    return height + mountingTop + mountingBottom;
  };

  totalItemArea = (item: IArtDetail) => {
    return item?.mounting?.isEnabled
      ? this.chargableWidth(item) * this.chargableHeight(item)
      : (parseFloat(item.width) || 0) * (parseFloat(item.height) || 0);
  };

  /**
   * Cost of one item calcuated here
   * @param item
   * @returns
   */
  unitCost = (item: IArtDetail): number => {
    const quantity = parseInt(String(item.quantity)) || 1;

    // Calculate area with mounting if enabled
    const area = this.totalItemArea(item);

    // const frame = item.frame.type
    //   ? frameTypes.find((frame) => frame.name === item.frame.type)
    //   : null;
    // const frameWidth = chargableWidth(item);
    // const frameHeight = chargableHeight(item);
    // const frameRate = frame ? frame.baseCost || 0 : 0;
    // const frameCostPerInch = frameRate / (frameWidth * frameHeight);

    // Calculate frame cost per inch
    const frameCostPerInch =
      this.frameTypes.find((frame) => frame.name === item.frame.type)
        ?.baseCost || 0;

    // Calculate total frame cost based on area
    const totalFrameCost = frameCostPerInch;

    // Calculate glass cost
    const glassCost = item?.glass?.isEnabled
      ? this.glassTypes.find((glass) => glass.name === item?.glass?.type)
          ?.rate || 0
      : 0;

    // Calculate varnish cost
    const varnishCost = item?.additional?.varnish
      ? this.miscCharges.find((x) => x.code === ADDITIONAL_SERVICE_CODE.varnish)
          ?.cost || 0
      : 0;

    // Calculate routerCut cost
    const routerCutCost = item?.additional?.routerCut
      ? this.miscCharges.find(
          (x) => x.code === ADDITIONAL_SERVICE_CODE.mdf_router_cutting
        )?.cost || 0
      : 0;

    // Calculate lamination cost
    const laminationCost = item?.additional?.lamination
      ? this.miscCharges.find(
          (x) => x.code === ADDITIONAL_SERVICE_CODE.lamination
        )?.cost || 0
      : 0;

    // Calculate additional costs
    const additionalCosts = varnishCost + laminationCost + routerCutCost;

    return (
      parseFloat(
        (
          (area * glassCost + totalFrameCost + additionalCosts) *
          quantity
        ).toFixed(2)
      ) || 0
    );
  };
}
