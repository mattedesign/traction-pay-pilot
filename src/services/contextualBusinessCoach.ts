
import { CarrierProfile } from "@/pages/Index";

export interface ContextualCoachingInsight {
  id: string;
  type: 'opportunity' | 'warning' | 'guidance' | 'celebration';
  title: string;
  description: string;
  context: string;
  priority: 'high' | 'medium' | 'low';
  actionable: boolean;
  suggestedActions?: string[];
  potentialImpact?: {
    financial?: number;
    efficiency?: number;
    risk?: 'reduced' | 'increased';
  };
}

export interface UserContext {
  currentPage: string;
  recentActions: string[];
  activeLoads?: any[];
  pendingInvoices?: any[];
  recentPerformance?: any;
}

export class ContextualBusinessCoach {
  static generateContextualInsights(
    carrierProfile: CarrierProfile,
    userContext: UserContext
  ): ContextualCoachingInsight[] {
    const insights: ContextualCoachingInsight[] = [];

    // Dashboard context insights
    if (userContext.currentPage === 'dashboard') {
      insights.push(...this.getDashboardInsights(carrierProfile, userContext));
    }

    // Load management context insights
    if (userContext.currentPage === 'loads' || userContext.activeLoads?.length) {
      insights.push(...this.getLoadManagementInsights(carrierProfile, userContext));
    }

    // Financial context insights
    if (userContext.currentPage === 'invoices' || userContext.pendingInvoices?.length) {
      insights.push(...this.getFinancialInsights(carrierProfile, userContext));
    }

    // Route planning context insights
    if (userContext.currentPage === 'route-planning') {
      insights.push(...this.getRouteOptimizationInsights(carrierProfile, userContext));
    }

    return insights.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }

  private static getDashboardInsights(
    carrierProfile: CarrierProfile,
    userContext: UserContext
  ): ContextualCoachingInsight[] {
    const insights: ContextualCoachingInsight[] = [];

    // Morning routine optimization
    const hour = new Date().getHours();
    if (hour >= 6 && hour <= 10) {
      insights.push({
        id: 'morning-routine',
        type: 'guidance',
        title: 'Optimize Your Morning Routine',
        description: 'Start your day by reviewing active loads and checking for route optimization opportunities.',
        context: 'dashboard-morning',
        priority: 'medium',
        actionable: true,
        suggestedActions: [
          'Review today\'s delivery schedule',
          'Check fuel prices on your routes',
          'Verify all required documents are uploaded'
        ]
      });
    }

    // Performance celebration
    if (userContext.recentPerformance?.onTimeDeliveries > 0.95) {
      insights.push({
        id: 'performance-celebration',
        type: 'celebration',
        title: 'Excellent Performance!',
        description: `Your on-time delivery rate of ${(userContext.recentPerformance.onTimeDeliveries * 100).toFixed(1)}% is outstanding.`,
        context: 'dashboard-performance',
        priority: 'low',
        actionable: false,
        potentialImpact: {
          efficiency: 15
        }
      });
    }

    return insights;
  }

  private static getLoadManagementInsights(
    carrierProfile: CarrierProfile,
    userContext: UserContext
  ): ContextualCoachingInsight[] {
    const insights: ContextualCoachingInsight[] = [];

    // Load optimization for small carriers
    if (carrierProfile.companySize === 'small' && userContext.activeLoads?.length) {
      insights.push({
        id: 'load-utilization',
        type: 'opportunity',
        title: 'Maximize Load Utilization',
        description: 'Consider backhaul opportunities to reduce deadhead miles on your current routes.',
        context: 'loads-optimization',
        priority: 'high',
        actionable: true,
        suggestedActions: [
          'Search for return loads',
          'Check with regular customers for additional freight',
          'Consider load boards for partial loads'
        ],
        potentialImpact: {
          financial: 350,
          efficiency: 20
        }
      });
    }

    // Documentation reminder
    insights.push({
      id: 'documentation-check',
      type: 'guidance',
      title: 'Documentation Checklist',
      description: 'Ensure all delivery documents are properly uploaded to avoid payment delays.',
      context: 'loads-documentation',
      priority: 'medium',
      actionable: true,
      suggestedActions: [
        'Upload signed BOL',
        'Attach delivery receipt',
        'Submit any required photos'
      ]
    });

    return insights;
  }

  private static getFinancialInsights(
    carrierProfile: CarrierProfile,
    userContext: UserContext
  ): ContextualCoachingInsight[] {
    const insights: ContextualCoachingInsight[] = [];

    // Cash flow optimization
    if (userContext.pendingInvoices?.length) {
      insights.push({
        id: 'cash-flow-optimization',
        type: 'opportunity',
        title: 'QuickPay Opportunity',
        description: 'Consider using QuickPay for high-margin loads to improve cash flow.',
        context: 'invoices-quickpay',
        priority: 'high',
        actionable: true,
        suggestedActions: [
          'Review loads with 2%+ margins for QuickPay',
          'Calculate the cost-benefit of early payment',
          'Apply QuickPay to urgent cash flow needs'
        ],
        potentialImpact: {
          financial: 0,
          efficiency: 25
        }
      });
    }

    // Invoice follow-up
    insights.push({
      id: 'invoice-follow-up',
      type: 'guidance',
      title: 'Proactive Invoice Management',
      description: 'Follow up on invoices approaching 30 days to maintain healthy cash flow.',
      context: 'invoices-management',
      priority: 'medium',
      actionable: true,
      suggestedActions: [
        'Contact customers about aging invoices',
        'Ensure all required documentation is complete',
        'Consider factoring for immediate cash needs'
      ]
    });

    return insights;
  }

  private static getRouteOptimizationInsights(
    carrierProfile: CarrierProfile,
    userContext: UserContext
  ): ContextualCoachingInsight[] {
    const insights: ContextualCoachingInsight[] = [];

    insights.push({
      id: 'fuel-efficiency',
      type: 'opportunity',
      title: 'Fuel Cost Optimization',
      description: 'Optimize your route to take advantage of lower fuel prices and reduce overall costs.',
      context: 'route-fuel',
      priority: 'high',
      actionable: true,
      suggestedActions: [
        'Use fuel price apps to find cheapest stations',
        'Plan fuel stops at truck stops with discounts',
        'Consider alternative routes with better fuel options'
      ],
      potentialImpact: {
        financial: 120,
        efficiency: 10
      }
    });

    return insights;
  }

  static getContextualPrompts(userContext: UserContext): string[] {
    const prompts: string[] = [];

    switch (userContext.currentPage) {
      case 'dashboard':
        prompts.push(
          "What should I focus on today?",
          "How can I improve my efficiency?",
          "Show me my performance trends"
        );
        break;
      case 'loads':
        prompts.push(
          "Help me optimize this route",
          "What documents do I need for this load?",
          "Find me a backhaul opportunity"
        );
        break;
      case 'invoices':
        prompts.push(
          "Should I use QuickPay for this invoice?",
          "Help me follow up on overdue payments",
          "Calculate my cash flow"
        );
        break;
      default:
        prompts.push(
          "What opportunities can you find for me?",
          "How can I save money this week?",
          "Help me plan my next move"
        );
    }

    return prompts;
  }
}
