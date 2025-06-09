
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText, File } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PromptDownloader = () => {
  const { toast } = useToast();

  const detailedPrompt = `# Comprehensive Trucking Dashboard Application Prompt

## Application Overview
Create a modern, comprehensive trucking operations management dashboard that serves as a central hub for carriers to manage their entire business operations. The application should be built using React, TypeScript, and Tailwind CSS with a focus on user experience, real-time data management, and operational efficiency.

## Core Features & Functionality

### 1. Load Management System
- **Load Tracking & Monitoring**: Real-time load status updates, GPS tracking integration, delivery confirmations
- **Load Search & Filtering**: Advanced search capabilities by load ID, broker, route, status, date ranges
- **Load Creation & Assignment**: Streamlined process for creating new loads and assigning to drivers
- **Load Intelligence**: AI-powered insights for load optimization, route suggestions, and performance analytics
- **Document Management**: Upload, store, and manage load-related documents (BOLs, invoices, permits)

### 2. Financial Management
- **Invoice Generation**: Automated invoice creation with customizable templates
- **Payment Tracking**: Monitor payment status, aging reports, and cash flow analysis
- **QuickPay Integration**: Fast payment processing with factor integration
- **Financial Reporting**: Comprehensive profit/loss statements, revenue analytics
- **Banking Integration**: Connect bank accounts for automated reconciliation

### 3. Route Optimization
- **Intelligent Route Planning**: AI-powered route optimization for fuel efficiency and time savings
- **Multiple Route Comparison**: Side-by-side analysis of different route options
- **Real-time Traffic Integration**: Dynamic route adjustments based on current traffic conditions
- **Fuel Cost Calculations**: Detailed fuel expense projections and optimization
- **Delivery Time Estimates**: Accurate ETA calculations with buffer considerations

### 4. Communication Hub
- **Email Integration**: Centralized email management for load-related communications
- **AI Email Analysis**: Automatic parsing and categorization of email content
- **Smart Notifications**: Contextual alerts for important updates and deadlines
- **Communication History**: Complete audit trail of all stakeholder communications

### 5. Compliance & Documentation
- **DOT Compliance Tracking**: Hours of service monitoring, safety ratings, inspection records
- **Document Upload System**: Secure storage for permits, licenses, insurance documents
- **Compliance Alerts**: Automated reminders for renewals and regulatory requirements
- **Audit Trail**: Complete record keeping for regulatory compliance

### 6. AI-Powered Assistant
- **Conversational Interface**: Natural language chat for complex queries and operations
- **Context-Aware Responses**: AI understands current load context and provides relevant information
- **Predictive Analytics**: Proactive insights for potential issues and optimization opportunities
- **Voice Commands**: Speech-to-text integration for hands-free operation

## Technical Architecture

### Frontend Stack
- **React 18**: Modern React with hooks and functional components
- **TypeScript**: Full type safety and enhanced developer experience
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Vite**: Fast build tool and development server
- **React Router**: Client-side routing with dynamic route handling
- **Lucide React**: Comprehensive icon library
- **Radix UI**: Accessible, unstyled UI primitives
- **React Query**: Server state management and caching

### UI/UX Design Principles
- **Mobile-First Responsive Design**: Optimized for all device sizes
- **Accessibility**: WCAG 2.1 AA compliance with screen reader support
- **Progressive Enhancement**: Core functionality works without JavaScript
- **Performance Optimization**: Code splitting, lazy loading, optimized images
- **Consistent Design System**: Unified color palette, typography, and spacing

### State Management
- **React Query**: Server state, caching, and synchronization
- **Local State**: React hooks for component-level state
- **Global State**: Context API for shared application state
- **Form Management**: React Hook Form with Zod validation

### Data Architecture
- **Supabase Integration**: PostgreSQL database with real-time subscriptions
- **RESTful APIs**: Clean, consistent API design patterns
- **Real-time Updates**: WebSocket connections for live data synchronization
- **Offline Support**: Service worker for offline functionality
- **Data Validation**: Comprehensive input validation and sanitization

## Security & Performance

### Security Measures
- **Input Sanitization**: XSS prevention with proper encoding
- **CSRF Protection**: Token-based request validation
- **Secure File Upload**: Type validation and size restrictions
- **Authentication**: Secure user session management
- **Data Encryption**: Sensitive data encryption at rest and in transit

### Performance Optimization
- **Code Splitting**: Dynamic imports for reduced bundle size
- **Image Optimization**: WebP format with lazy loading
- **Caching Strategy**: Intelligent browser and server-side caching
- **Bundle Analysis**: Regular monitoring of bundle size and dependencies
- **CDN Integration**: Static asset delivery optimization

## User Experience Features

### Dashboard Interface
- **Customizable Widgets**: Drag-and-drop dashboard customization
- **Real-time Metrics**: Live updates of key performance indicators
- **Quick Actions**: One-click access to common operations
- **Smart Notifications**: Contextual alerts and reminders
- **Search Everything**: Global search across all data types

### Mobile Experience
- **Touch-Optimized**: Gesture-friendly interface design
- **Offline Capabilities**: Core functionality without internet connection
- **Push Notifications**: Mobile alerts for critical updates
- **Camera Integration**: Document scanning and photo uploads
- **GPS Integration**: Location services for tracking and navigation

### Accessibility
- **Keyboard Navigation**: Full functionality without mouse
- **Screen Reader Support**: Semantic HTML and ARIA labels
- **High Contrast Mode**: Enhanced visibility options
- **Text Scaling**: Responsive typography for readability
- **Focus Management**: Clear visual indicators and logical tab order

## Integration Capabilities

### Third-Party Services
- **ELD Systems**: Electronic logging device data integration
- **Fuel Cards**: Automated fuel expense tracking
- **Weather Services**: Route planning with weather considerations
- **Mapping Services**: Real-time GPS and traffic data
- **Communication Platforms**: Email, SMS, and phone integration

### API Architecture
- **RESTful Design**: Standard HTTP methods and status codes
- **Rate Limiting**: API abuse prevention and fair usage
- **Version Management**: Backward-compatible API versioning
- **Documentation**: Comprehensive API documentation with examples
- **Webhook Support**: Real-time event notifications

## Development Standards

### Code Quality
- **TypeScript Strict Mode**: Maximum type safety
- **ESLint Configuration**: Consistent code style enforcement
- **Prettier Integration**: Automated code formatting
- **Unit Testing**: Comprehensive test coverage
- **Integration Testing**: End-to-end user journey validation

### Documentation
- **Code Comments**: Inline documentation for complex logic
- **Component Documentation**: Props and usage examples
- **API Documentation**: Request/response schemas and examples
- **User Guides**: Step-by-step feature explanations
- **Developer Onboarding**: Setup and contribution guidelines

### Deployment & DevOps
- **CI/CD Pipeline**: Automated testing and deployment
- **Environment Management**: Development, staging, and production configs
- **Error Monitoring**: Real-time error tracking and alerting
- **Performance Monitoring**: Application metrics and optimization
- **Security Scanning**: Automated vulnerability detection

## Future Enhancements

### Advanced Features
- **Machine Learning**: Predictive analytics for demand forecasting
- **IoT Integration**: Sensor data from trucks and trailers
- **Blockchain**: Immutable record keeping for compliance
- **AR/VR**: Enhanced visualization for route planning
- **Voice Assistants**: Integration with Alexa, Google Assistant

### Scalability Considerations
- **Microservices Architecture**: Service-oriented design patterns
- **Container Orchestration**: Docker and Kubernetes deployment
- **Database Sharding**: Horizontal scaling strategies
- **Global CDN**: Worldwide content delivery optimization
- **Multi-tenancy**: Support for multiple carriers on single platform

This comprehensive trucking dashboard application represents a complete digital transformation solution for modern carrier operations, combining cutting-edge technology with practical business functionality to drive efficiency, compliance, and profitability in the trucking industry.`;

  const downloadTXT = () => {
    const blob = new Blob([detailedPrompt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'trucking-dashboard-prompt.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download Complete",
      description: "The prompt has been downloaded as a TXT file."
    });
  };

  const downloadPDF = () => {
    // For PDF generation, we'll create a simple HTML version that can be printed to PDF
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Trucking Dashboard Application Prompt</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; margin: 40px; color: #333; }
            h1 { color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px; }
            h2 { color: #1e40af; margin-top: 30px; }
            h3 { color: #1e3a8a; margin-top: 20px; }
            pre { background: #f8f9fa; padding: 15px; border-radius: 5px; overflow-x: auto; }
            ul, ol { margin-left: 20px; }
            .section { margin-bottom: 30px; }
          </style>
        </head>
        <body>
          <div class="section">
            ${detailedPrompt.replace(/\n/g, '<br>').replace(/#{1,3}\s/g, match => {
              const level = match.trim().length;
              return level === 1 ? '<h1>' : level === 2 ? '<h2>' : '<h3>';
            }).replace(/<br><br>/g, '</h1><br>').replace(/<br><h2>/g, '</h2><br><h2>').replace(/<br><h3>/g, '</h3><br><h3>')}
          </div>
        </body>
      </html>
    `;
    
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'trucking-dashboard-prompt.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download Complete", 
      description: "The prompt has been downloaded as an HTML file. Open it in a browser and print to PDF."
    });
  };

  return (
    <Card className="bg-white border border-slate-200 hover:shadow-md transition-all duration-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Download className="w-5 h-5 text-slate-600" />
          <span>Download Application Prompt</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-slate-600 mb-4">
          Download the comprehensive prompt used to create this trucking dashboard application.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={downloadTXT}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <FileText className="w-4 h-4" />
            <span>Download as TXT</span>
          </Button>
          <Button
            onClick={downloadPDF}
            variant="outline" 
            className="flex items-center space-x-2"
          >
            <File className="w-4 h-4" />
            <span>Download as HTML (for PDF)</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PromptDownloader;
