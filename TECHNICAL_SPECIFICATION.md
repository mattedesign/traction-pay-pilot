
# Trucking Logistics Platform - Technical Specification

## Table of Contents
1. [System Overview](#system-overview)
2. [Architecture](#architecture)
3. [Core Features](#core-features)
4. [Database Schema](#database-schema)
5. [API Specifications](#api-specifications)
6. [Authentication & Security](#authentication--security)
7. [User Interface Components](#user-interface-components)
8. [AI Integration](#ai-integration)
9. [Real-time Features](#real-time-features)
10. [File Management](#file-management)
11. [Performance Requirements](#performance-requirements)
12. [Deployment Architecture](#deployment-architecture)

## System Overview

### Purpose
A comprehensive trucking logistics platform that manages load operations, communications, payments, and provides AI-powered insights for carriers and brokers.

### Technology Stack
- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Shadcn/UI
- **Backend**: Supabase (PostgreSQL, Edge Functions)
- **AI Integration**: Anthropic Claude via Edge Functions
- **State Management**: React Query (TanStack Query)
- **Routing**: React Router DOM
- **Charts**: Recharts
- **Icons**: Lucide React

### Target Users
1. **Carriers** - Independent truckers and small/large trucking companies
2. **Brokers** - Freight brokers managing multiple carriers
3. **Factors** - Factoring companies providing financial services

## Architecture

### Frontend Architecture
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn/UI base components
│   ├── auth/           # Authentication components
│   ├── broker/         # Broker-specific components
│   ├── insights/       # Analytics and insights
│   └── chat/           # AI chat interface
├── hooks/              # Custom React hooks
├── pages/              # Route components
├── services/           # Business logic services
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

### Backend Architecture (Supabase)
- **Database**: PostgreSQL with Row Level Security (RLS)
- **Edge Functions**: Serverless functions for AI processing
- **Authentication**: Supabase Auth with JWT tokens
- **Storage**: File storage for documents and images

## Core Features

### 1. Load Management System

#### Load Lifecycle
```typescript
interface Load {
  id: string;
  broker: string;
  status: "pending_pickup" | "in_transit" | "delivered" | "pending_acceptance" | "ready_to_invoice";
  amount: string;
  origin: string;
  destination: string;
  pickupTime: string;
  deliveryTime?: string;
  distance: string;
  factoring?: {
    isFactored: boolean;
    rate?: number;
    company?: string;
  };
  rateConfirmation?: RateConfirmationData;
  source?: "manual" | "tms";
  tmsData?: TMSData;
}
```

#### Load Operations
- **Create Load**: Manual entry or TMS integration
- **Update Status**: Real-time status tracking
- **Document Management**: BOL, rate confirmations, invoices
- **Discrepancy Detection**: Automated comparison of documents

### 2. Communication System

#### Email Integration
```sql
-- Email threads table
CREATE TABLE email_threads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  thread_id VARCHAR(255) UNIQUE NOT NULL,
  load_id VARCHAR(255) NOT NULL,
  subject TEXT NOT NULL,
  participants TEXT[] DEFAULT '{}',
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unread_count INTEGER DEFAULT 0,
  is_archived BOOLEAN DEFAULT FALSE
);

-- Email communications table
CREATE TABLE email_communications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email_id VARCHAR(255) UNIQUE NOT NULL,
  thread_id VARCHAR(255) REFERENCES email_threads(thread_id),
  load_id VARCHAR(255) NOT NULL,
  from_email VARCHAR(255) NOT NULL,
  to_email VARCHAR(255) NOT NULL,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  email_type VARCHAR(20) CHECK (email_type IN ('inbound', 'outbound'))
);
```

#### Features
- **Thread Management**: Organize emails by load
- **Auto-categorization**: AI-powered email classification
- **Response Templates**: Quick reply templates
- **Attachment Handling**: Document extraction and processing

### 3. Financial Management

#### Factoring Integration
```typescript
interface FactoringService {
  getFactoredLoads(loads: Load[]): Load[];
  calculateFactoringCost(load: Load): number;
  getFactoringRate(load: Load): number;
  processQuickPay(loadId: string): Promise<FactoringResponse>;
}
```

#### Payment Features
- **Invoice Generation**: Automated invoice creation
- **Factoring Integration**: Real-time factoring offers
- **Payment Tracking**: Status monitoring
- **Cash Flow Analysis**: Financial insights

### 4. AI-Powered Features

#### Chat Interface
```typescript
interface ChatMessage {
  type: "ai" | "user";
  content: string;
  timestamp: Date;
  interactiveButtons?: InteractiveButton[];
}

interface InteractiveButton {
  id: string;
  text: string;
  action: 'navigate' | 'continue_chat';
  actionData?: {
    path?: string;
    message?: string;
  };
}
```

#### AI Capabilities
- **Load Search**: Natural language load queries
- **Document Analysis**: Extract data from uploaded files
- **Route Optimization**: AI-powered route suggestions
- **Business Insights**: Performance analytics
- **Predictive Analytics**: Load profitability predictions

## Database Schema

### Core Tables

#### Profiles Table
```sql
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT NOT NULL,
  user_type TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  company_name TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Email System Tables
- `email_threads`: Email conversation threads
- `email_communications`: Individual email messages
- `email_attachments`: File attachments

### Indexing Strategy
```sql
-- Performance indexes
CREATE INDEX idx_email_threads_load_id ON email_threads(load_id);
CREATE INDEX idx_email_communications_timestamp ON email_communications(timestamp DESC);
CREATE INDEX idx_profiles_user_type ON profiles(user_type);
```

## API Specifications

### Load Management API
```typescript
// Get loads with filtering
GET /api/loads?status=in_transit&broker=ACME
Response: Load[]

// Update load status
PATCH /api/loads/{id}
Body: { status: "delivered", deliveryTime: "2024-01-15T10:00:00Z" }

// Create new load
POST /api/loads
Body: RateConfirmationData
```

### Email API
```typescript
// Get email threads for load
GET /api/loads/{id}/emails
Response: EmailThread[]

// Send email
POST /api/emails
Body: { to: string, subject: string, body: string, loadId?: string }
```

### AI Chat API
```typescript
// Send chat message
POST /api/chat
Body: { message: string, context?: LoadContext }
Response: { response: string, actions?: ChatAction[] }
```

## Authentication & Security

### Authentication Flow
1. **User Registration**: Email/password with user type selection
2. **JWT Tokens**: Supabase Auth with automatic token refresh
3. **Role-Based Access**: Different permissions for carriers/brokers

### Security Measures
```typescript
// Row Level Security policies
CREATE POLICY "Users can view their own data" 
  ON profiles FOR SELECT 
  USING (auth.uid() = id);

// Input sanitization
const sanitizeInput = (input: string): string => {
  return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
};

// File validation
const validateFile = (file: File): ValidationResult => {
  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
  const maxSize = 10 * 1024 * 1024; // 10MB
  
  return {
    isValid: allowedTypes.includes(file.type) && file.size <= maxSize,
    error: getValidationError(file)
  };
};
```

## User Interface Components

### Component Architecture
```typescript
// Atomic design pattern
atoms/          # Basic UI elements (Button, Input)
molecules/      # Component combinations (SearchBar, LoadCard)
organisms/      # Complex components (LoadsList, ChatInterface)
templates/      # Page layouts
pages/          # Complete pages
```

### Key Components

#### Dashboard Components
- `ChatOnlyDashboard`: Main dashboard with AI chat
- `LoadProfitabilityIntelligence`: Financial analytics
- `SmartInsightsDashboard`: Business insights

#### Chat Components
- `ChatInterfaceWrapper`: Main chat container
- `ChatInput`: Message input with mode switching
- `ChatHistory`: Message display with interactive buttons

#### Load Management
- `LoadsList`: Paginated load display
- `LoadDetail`: Comprehensive load information
- `DocumentUpload`: File upload with validation

### Responsive Design
```css
/* Mobile-first approach */
.container {
  @apply px-4 sm:px-6 lg:px-8;
}

.grid-responsive {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4;
}
```

## AI Integration

### Claude Integration Architecture
```typescript
// Edge function for AI processing
export async function handler(req: Request) {
  const { message, context } = await req.json();
  
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${ANTHROPIC_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 1000,
      messages: [{ role: 'user', content: message }],
      system: buildSystemPrompt(context)
    })
  });
  
  return new Response(JSON.stringify(await response.json()));
}
```

### AI Features Implementation

#### Query Routing
```typescript
interface QueryAnalysis {
  queryType: 'load_search' | 'general_chat' | 'route_optimization';
  confidence: number;
  extractedEntities: ExtractedEntity[];
  requiresAI: boolean;
}

class EnhancedQueryRouter {
  static analyzeQuery(query: string): QueryAnalysis {
    // Pattern matching and entity extraction
    // Returns routing decision for query handling
  }
}
```

#### Context Building
```typescript
class SmartContextBuilder {
  static buildLoadContext(loadId: string): LoadContext {
    const load = LoadService.getLoadById(loadId);
    const communications = EmailService.getLoadEmails(loadId);
    const documents = DocumentService.getLoadDocuments(loadId);
    
    return {
      load,
      communications,
      documents,
      recentActivity: this.getRecentActivity(loadId)
    };
  }
}
```

## Real-time Features

### Live Updates
```typescript
// Supabase real-time subscriptions
const subscription = supabase
  .channel('load_updates')
  .on('postgres_changes', {
    event: 'UPDATE',
    schema: 'public',
    table: 'loads'
  }, (payload) => {
    updateLoadInUI(payload.new);
  })
  .subscribe();
```

### Notification System
```typescript
interface LoadNotification {
  id: string;
  loadId: string;
  type: "new_load" | "load_update" | "payment_ready";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  userType: "carrier" | "broker" | "both";
}
```

## File Management

### Document Processing Pipeline
```typescript
interface DocumentProcessor {
  validateFile(file: File): ValidationResult;
  extractMetadata(file: File): DocumentMetadata;
  processDocument(file: File, type: DocumentType): ProcessingResult;
  detectDiscrepancies(document: ProcessedDocument, load: Load): Discrepancy[];
}
```

### File Storage Strategy
- **Supabase Storage**: Secure file storage with RLS
- **File Types**: PDF, Images (JPEG, PNG), DOC/DOCX
- **Size Limits**: 10MB per file
- **Organization**: Files organized by load ID and type

### Document Types
```typescript
type DocumentType = 
  | 'rate_confirmation'
  | 'bill_of_lading'
  | 'invoice'
  | 'delivery_receipt'
  | 'fuel_receipt'
  | 'other';
```

## Performance Requirements

### Frontend Performance
- **Initial Load**: < 3 seconds
- **Page Transitions**: < 500ms
- **Search Results**: < 1 second
- **AI Responses**: < 5 seconds

### Backend Performance
- **Database Queries**: < 100ms (95th percentile)
- **API Responses**: < 200ms
- **File Uploads**: Support up to 10MB files
- **Concurrent Users**: Support 100+ simultaneous users

### Optimization Strategies
```typescript
// React Query for caching
const { data: loads } = useQuery({
  queryKey: ['loads', filters],
  queryFn: () => fetchLoads(filters),
  staleTime: 5 * 60 * 1000, // 5 minutes
});

// Lazy loading for routes
const LoadDetail = lazy(() => import('./pages/LoadDetail'));

// Image optimization
const optimizeImage = (file: File): Promise<File> => {
  // Compress images before upload
};
```

## Deployment Architecture

### Production Environment
```yaml
# Supabase Configuration
Database: PostgreSQL 15
Edge Functions: Deno runtime
CDN: Global edge caching
SSL: Automatic HTTPS
Backups: Daily automated backups
```

### CI/CD Pipeline
```yaml
# GitHub Actions workflow
name: Deploy to Production
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Supabase
        run: supabase db deploy
      - name: Deploy functions
        run: supabase functions deploy
```

### Environment Configuration
```typescript
// Environment variables
interface Environment {
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
  ANTHROPIC_API_KEY: string; // Stored in Supabase secrets
}
```

### Monitoring & Observability
- **Error Tracking**: Supabase logs and metrics
- **Performance Monitoring**: Real-time dashboard metrics
- **User Analytics**: Usage patterns and feature adoption
- **AI Usage Tracking**: Token consumption and response times

## Security Considerations

### Data Protection
- **Encryption**: All data encrypted in transit and at rest
- **Access Control**: Row-level security for all tables
- **Input Validation**: Comprehensive sanitization
- **File Scanning**: Virus and malware detection

### Compliance
- **GDPR**: Data deletion and export capabilities
- **SOC 2**: Compliance through Supabase
- **Data Retention**: Configurable retention policies

### Privacy
- **User Data**: Minimal data collection
- **AI Processing**: No data retention in AI services
- **Audit Logs**: Comprehensive activity logging

## Testing Strategy

### Unit Testing
```typescript
// Component testing with React Testing Library
test('ChatInput sends message on enter', () => {
  render(<ChatInput onSendMessage={mockSend} />);
  const input = screen.getByRole('textbox');
  
  fireEvent.change(input, { target: { value: 'test message' } });
  fireEvent.keyPress(input, { key: 'Enter' });
  
  expect(mockSend).toHaveBeenCalledWith('test message');
});
```

### Integration Testing
- **API Testing**: Supabase function testing
- **Database Testing**: Migration validation
- **End-to-End**: Critical user journeys

### Performance Testing
- **Load Testing**: Concurrent user simulation
- **Stress Testing**: System breaking points
- **Performance Regression**: Automated performance monitoring

## Future Enhancements

### Planned Features
1. **Mobile App**: React Native implementation
2. **Advanced Analytics**: Machine learning insights
3. **Integration Hub**: Third-party TMS integrations
4. **Multi-language Support**: Internationalization
5. **Advanced Document OCR**: Enhanced data extraction

### Scalability Considerations
- **Microservices**: Service decomposition strategy
- **Caching Layer**: Redis implementation
- **Load Balancing**: Multi-region deployment
- **Database Sharding**: Horizontal scaling strategy

## Conclusion

This technical specification provides a comprehensive blueprint for the trucking logistics platform. The architecture leverages modern web technologies and AI capabilities to create a scalable, secure, and user-friendly solution for the trucking industry.

The modular design allows for incremental development and easy maintenance, while the AI integration provides unique value propositions that differentiate the platform in the competitive logistics software market.
