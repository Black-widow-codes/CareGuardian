type Patient = {
    issue: string;
  };
  
  export function calculateRiskScore(patient: Patient) {
    let score = 100;
  
    if (patient.issue.toLowerCase().includes("follow-up")) {
      score -= 20;
    }
  
    if (patient.issue.toLowerCase().includes("test")) {
      score -= 15;
    }
  
    if (patient.issue.toLowerCase().includes("medication")) {
      score -= 25;
    }
  
    return score;
  }
  
  export function getRiskLevel(score: number) {
    if (score < 75) {
      return "High Risk";
    }
  
    if (score < 90) {
      return "Medium Risk";
    }
  
    return "Low Risk";
  }