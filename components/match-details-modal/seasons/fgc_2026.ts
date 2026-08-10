// Field names mirror the EMS season definition exactly:
// project-ems/libs/models/src/seasons/FGC26_IgnitingInnovation.ts
//
// Two quirks are handled here rather than in the shared modal:
//  1. The suppression unit counts embed the alliance colour mid-name
//     (`wildfireInRedSuppressionUnit`), so they don't fit the modal's
//     `red${key}` / `blue${key}` lookup.  The precalculator aliases them.
//  2. Brace state and coopertition values are magnitudes, not ordinals, so the
//     lookups below are keyed objects rather than arrays.

const round = (n: number) => Math.round(n * 100) / 100;

export const precalculator = (match) => {
  const { details } = match;

  // Alias the suppression unit counts into the red*/blue* shape the modal
  // expects.  WILDFIRE is 1 point each, so the count is the point value.
  match.details.redSuppressionUnitPoints = details.wildfireInRedSuppressionUnit;
  match.details.blueSuppressionUnitPoints =
    details.wildfireInBlueSuppressionUnit;

  // Climb multipliers sum fractional brace states, so they arrive with
  // floating point noise (e.g. 1.3500000000000003).
  match.details.redClimbMultiplier = round(details.redClimbMultiplier);
  match.details.blueClimbMultiplier = round(details.blueClimbMultiplier);

  return match;
};

const breakdown = {
  SuppressionUnitPoints: "Suppression Unit Points",
  ClimbMultiplier: "Climb Multiplier",
  PartnerClimbPoints: "Partner Climb Points",
  RobotOneBraceState: "Team 1 Brace State",
  RobotOnePartnerClimb: "Team 1 Partner Climb",
  RobotTwoBraceState: "Team 2 Brace State",
  RobotTwoPartnerClimb: "Team 2 Partner Climb",
  RobotThreeBraceState: "Team 3 Brace State",
  RobotThreePartnerClimb: "Team 3 Partner Climb",
};

// The BraceState enum value *is* the climb multiplier increment, so these are
// fractional and non-contiguous.  Object keys stringify, and indexing with a
// number coerces the same way, so `lookup[0.05]` resolves to "Contact".
const braceStates = {
  0: "None",
  0.05: "Contact",
  0.1: "Zone 1",
  0.2: "Zone 2",
  0.3: "Zone 3",
};

// Partner climb is a boolean in the EMS model, but the upload path that feeds
// api.first.global ships raw DB rows, so it arrives as 0/1.  Accept both.
const yesNo = {
  0: "No",
  1: "Yes",
  false: "No",
  true: "Yes",
};

export const lookupKey = {
  RobotOneBraceState: braceStates,
  RobotTwoBraceState: braceStates,
  RobotThreeBraceState: braceStates,
  RobotOnePartnerClimb: yesNo,
  RobotTwoPartnerClimb: yesNo,
  RobotThreePartnerClimb: yesNo,
  coopertition: {
    0: "None",
    10: "4 Robots (+10)",
    25: "5 Robots (+25)",
    40: "6 Robots (+40)",
  },
};

// Both of these score for the GLOBAL ALLIANCE — they are added to red *and*
// blue, so they must not be attributed to a single alliance.
export const coopBreakdown = {
  wildfireInExtinguisher: "Extinguisher Points",
  coopertition: "Coopertition Bonus",
};

export default breakdown;

/*
  wildfireInRedSuppressionUnit: number;
  wildfireInBlueSuppressionUnit: number;
  wildfireInExtinguisher: number;
  redRobotOneBraceState: BraceState;
  redRobotTwoBraceState: BraceState;
  redRobotThreeBraceState: BraceState;
  blueRobotOneBraceState: BraceState;
  blueRobotTwoBraceState: BraceState;
  blueRobotThreeBraceState: BraceState;
  redRobotOnePartnerClimb: boolean;
  redRobotTwoPartnerClimb: boolean;
  redRobotThreePartnerClimb: boolean;
  blueRobotOnePartnerClimb: boolean;
  blueRobotTwoPartnerClimb: boolean;
  blueRobotThreePartnerClimb: boolean;
  coopertition: CoopertitionBonus;
  redClimbMultiplier: number;
  blueClimbMultiplier: number;
  redPartnerClimbPoints: number;
  bluePartnerClimbPoints: number;
*/
