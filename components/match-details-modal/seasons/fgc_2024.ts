export const precalculator = (match) => {
    const { details } = match;
    const redGoals = [details.redCw1, details.redCw2, details.redCw3, details.redCw4, details.redCw5, details.redCw6, details.redEc1, details.redEc2, details.redEc3, details.redEc4, details.redEc5, details.redEc6]
    const blueGoals = [details.blueCw1, details.blueCw2, details.blueCw3, details.blueCw4, details.blueCw5, details.blueCw6, details.blueEc1, details.blueEc2, details.blueEc3, details.blueEc4, details.blueEc5, details.blueEc6]

    const cb = (prev, curr) => {
        switch (curr) {
            case 1:
            case 2:
                return prev + 1;
            case 3:
            case 4:
                return prev + 2
            default:
                return prev;
        }
    }

    match.details.redNexusPoints = redGoals.reduce(cb, 0);
    match.details.blueNexusPoints = blueGoals.reduce(cb, 0);

    return match;
}

const breakdown = {
    "ResevoirConserved": "Resevoir Conserved",
    "FoodProduced": "Food Produced",
    "NexusPoints": "Nexus Points",
    "RobotOneParked": "Team 1 Parking Location",
    "RobotTwoParked": "Team 2 Parking Location",
    "RobotThreeParked": "Team 3 Parking Location"
}

export const lookupKey = {
    "RobotOneParked": ["Floor", "Ramp", "Platform"],
    "RobotTwoParked": ["Floor", "Ramp", "Platform"],
    "RobotThreeParked": ["Floor", "Ramp", "Platform"],
    "fieldBalanced": ["No", "Yes"],
    "coopertition": ["No", "Yes"]
}

export const coopBreakdown = {
    "foodSecured": "Food Secured",
    "coopertition": "Coopertition Achieved",
    "fieldBalanced": "Field Balanced"
}

export default breakdown;

/*

  redResevoirConserved: number;
  redFoodProduced: number;
  redRobotOneParked: number;
  redRobotTwoParked: number;
  redRobotThreeParked: number;
  redNexusState: AllianceNexusGoalState;
  blueResevoirConserved: number;
  blueFoodProduced: number;
  blueRobotOneParked: number;
  blueRobotTwoParked: number;
  blueRobotThreeParked: number;
  blueNexusState: AllianceNexusGoalState;
  coopertition: number;
  fieldBalanced: number;
  foodSecured: number;
  */