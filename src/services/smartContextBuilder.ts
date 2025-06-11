
import { LoadSearchResult } from './loadSearchService';
import { QueryRoutingResult } from './enhancedQueryRouter';
import { SpecificLoadContextBuilder } from './contextBuilders/specificLoadContextBuilder';
import { MultipleLoadsContextBuilder } from './contextBuilders/multipleLoadsContextBuilder';
import { GeneralContextBuilder } from './contextBuilders/generalContextBuilder';

export interface SmartContext {
  systemPromptAddition: string;
  enhancedUserMessage: string;
  contextType: 'specific_load' | 'multiple_loads' | 'general_trucking' | 'no_context';
  loadData?: any;
  searchResults?: LoadSearchResult[];
}

export class SmartContextBuilder {
  static async buildContext(
    originalMessage: string,
    routingResult: QueryRoutingResult,
    currentLoadId?: string
  ): Promise<SmartContext> {
    
    console.log('SmartContextBuilder: Building context for query type:', routingResult.queryType);
    
    switch (routingResult.queryType) {
      case 'specific_load':
        return await SpecificLoadContextBuilder.build(originalMessage, routingResult);
      
      case 'load_search':
        return MultipleLoadsContextBuilder.build(originalMessage, routingResult);
      
      case 'general_trucking':
        return GeneralContextBuilder.buildGeneralTruckingContext(originalMessage);
      
      case 'button_response':
        return GeneralContextBuilder.buildButtonResponseContext(originalMessage);
      
      default:
        return GeneralContextBuilder.buildNoContext(originalMessage);
    }
  }
}
