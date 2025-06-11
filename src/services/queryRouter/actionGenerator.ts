
export class ActionGenerator {
  static getLoadSpecificActions(load: any, queryLower: string): string[] {
    const actions: string[] = [];

    if (queryLower.includes('status') || queryLower.includes('where')) {
      actions.push('Provide current load status and location');
    }

    if (queryLower.includes('payment') || queryLower.includes('money') || queryLower.includes('invoice')) {
      actions.push('Show payment information and options');
    }

    if (queryLower.includes('document') || queryLower.includes('paperwork')) {
      actions.push('List required documents and upload status');
    }

    if (queryLower.includes('route') || queryLower.includes('directions') || queryLower.includes('fuel')) {
      actions.push('Provide route optimization and fuel stops');
    }

    if (actions.length === 0) {
      actions.push('Provide comprehensive load information');
    }

    return actions;
  }

  static getSearchActions(results: any[], queryLower: string): string[] {
    const actions: string[] = [];

    if (results.length === 1) {
      actions.push('Show detailed information for matched load');
    } else {
      actions.push(`Show ${results.length} matching loads`);
      actions.push('Allow user to select specific load for details');
    }

    const brokers = [...new Set(results.map(r => r.load.broker))];
    if (brokers.length > 1) {
      actions.push(`Compare loads across ${brokers.length} brokers`);
    }

    return actions;
  }
}
