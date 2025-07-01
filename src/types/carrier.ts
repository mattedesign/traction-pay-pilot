
export interface CarrierProfile {
  companySize: 'small' | 'medium' | 'large';
  fleetSize: number;
  userRoles: string[];
  primaryUser: 'owner-operator' | 'fleet-manager' | 'executive';
  businessCoachingLevel: 'basic' | 'advanced' | 'enterprise';
  onboardingCompleted: boolean;
}
