
import { useState, useEffect } from "react";
import ChatInput from "./ChatInput";
import ChatSetup from "./ChatSetup";
import ChatDemoHandler from "./ChatDemoHandler";
import ChatHeader from "./ChatHeader";
import ChatContentArea from "./ChatContentArea";
import { useChatMessages } from "../hooks/useChatMessages";
import { useSuggestedQuestions } from "../hooks/useSuggestedQuestions";
import { useUnifiedChatHandler } from "../hooks/useUnifiedChatHandler";
import { getChatSystemPrompt } from "./ChatSystemPrompt";

interface FunctionalChatInterfaceProps {
  onNavigateToLoad?: (path: string) => void;
  onFocusChange?: (focused: boolean) => void;
  isFocused?: boolean;
  currentAction?: string;
}

const FunctionalChatInterface = ({ 
  onNavigateToLoad, 
  onFocusChange,
  isFocused = false,
  currentAction
}: FunctionalChatInterfaceProps) => {
  const [mode, setMode] = useState<"search" | "chat">("search");
  const [isInDemoMode, setIsInDemoMode] = useState(false);
  const [demoStep, setDemoStep] = useState<string | null>(null);
  const { chatHistory, addUserMessage, addAIMessage } = useChatMessages();
  const { currentSuggestions } = useSuggestedQuestions();

  const systemPrompt = getChatSystemPrompt();

  const {
    message,
    setMessage,
    isLoading,
    isInitialized,
    handleSendMessage: originalHandleSendMessage,
    handleAPIKeySubmit,
    loadResults,
    showingResults,
    handleLoadSelect
  } = useUnifiedChatHandler({
    systemPrompt,
    chatHistory,
    addUserMessage,
    addAIMessage,
    onLoadSelect: (loadId) => {
      if (onNavigateToLoad) {
        onNavigateToLoad(`/load/${loadId}`);
      }
    }
  });

  const handleDemoResponse = async () => {
    if (!isInDemoMode || !demoStep) {
      return await originalHandleSendMessage();
    }

    const userMessage = addUserMessage(message);
    setMessage("");

    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    switch (demoStep) {
      case "track-load":
        addAIMessage(`**Load #1234 Status Update**

📊 **Current Status:** IN_TRANSIT  
🚛 **Driver:** Mike Johnson  
📱 **Last Update:** 15 minutes ago  
📍 **Current Location:** I-40 E, Mile Marker 285 (Near Amarillo, TX)  

**Load Details:**
- **Broker:** FreightMax Logistics
- **Amount:** $3,250.00
- **Origin:** Phoenix, AZ → **Destination:** Dallas, TX
- **Pickup:** Completed on 12/08/2024 at 9:15 AM
- **Delivery:** Scheduled for 12/09/2024 by 2:00 PM
- **Distance:** 587 miles
- **Progress:** 65% complete (382 miles remaining)

**Estimated Arrival:** Tomorrow at 1:30 PM (30 minutes ahead of schedule)

Would you like me to take you to the detailed load page for Load #1234 to see more information, documents, and communications?`);
        break;

      case "check-payment":
        addAIMessage(`**Payment Status for Load #9012**

💰 **Payment Status:** PENDING  
📄 **Invoice:** #INV-9012-120824  
💵 **Amount:** $2,875.00  
📅 **Invoice Date:** December 6, 2024  
🏢 **Broker:** Reliable Transport Co.  

**Payment Details:**
- **Terms:** Net 30 days
- **Due Date:** January 5, 2025
- **Days Outstanding:** 3 days
- **Payment Method:** ACH Transfer

**Invoice Status:** ✅ Submitted and Approved  
**Documents:** Rate confirmation, BOL, delivery receipt uploaded  

**Quick Actions Available:**
- 💸 **QuickPay:** Get paid in 24 hours for $2,587.50 (10% fee)
- 📧 **Payment Reminder:** Send automated follow-up to broker
- 📞 **Contact Info:** Accounts Payable: (555) 123-4567

Would you like me to help you set up QuickPay for this load or send a payment reminder?`);
        break;

      case "plan-route-initial":
        addAIMessage(`**Route Planning Assistant**

I can help you plan the optimal route! To provide the best recommendations, I need to know:

**Is this route planning for:**
1. 🚛 **Current load** already in your system?
2. 🆕 **New load** that hasn't been created yet?

Please let me know which option, or if you have a specific load number in mind!`);
        setDemoStep("plan-route-followup");
        break;

      case "plan-route-followup":
        if (message.toLowerCase().includes("load #5678") || message.toLowerCase().includes("5678")) {
          addAIMessage(`**Smart Route Planning for Load #5678**

🗺️ **Route Analysis Complete**

**Load Details:**
- **Origin:** Los Angeles, CA
- **Destination:** Denver, CO  
- **Distance:** 1,016 miles
- **Cargo:** Electronics (high-value)

**Optimal Route Recommendations:**

🥇 **RECOMMENDED: I-15 N → I-70 E Route**
- **Distance:** 1,016 miles
- **Est. Drive Time:** 15h 20m
- **Fuel Cost:** $485 (estimated)
- **Tolls:** $0
- **Truck Stops:** 8 major stops with good ratings
- **Weather:** Clear conditions expected

**Why this route:**
✅ Most fuel-efficient  
✅ Best truck stop network  
✅ Avoids construction zones  
✅ Optimal for high-value cargo security  

**Alternative Routes:**
🥈 **I-40 E Route:** +47 miles, but scenic option
🥉 **I-80 E Route:** Northern route, good in winter

Would you like me to show you the detailed route visualization and truck stop recommendations?`);
        } else {
          addAIMessage(`Please specify the load number you'd like to plan a route for, or let me know if this is for a new load!`);
        }
        break;

      case "quickpay":
        // First response - available loads
        addAIMessage(`**QuickPay Available Loads**

You currently have **3 loads** eligible for QuickPay:

💰 **Load #9012** - Reliable Transport Co.  
**Amount:** $2,875.00 → **QuickPay:** $2,587.50 (10% fee)  
**Status:** Delivered, invoice submitted  

💰 **Load #8834** - Swift Logistics  
**Amount:** $1,950.00 → **QuickPay:** $1,755.00 (10% fee)  
**Status:** Delivered, documents complete  

💰 **Load #8901** - Metro Freight  
**Amount:** $3,420.00 → **QuickPay:** $3,078.00 (10% fee)  
**Status:** Delivered, awaiting payment  

**Total Available:** $8,245.00  
**Total QuickPay Value:** $7,420.50  
**Total Fees:** $824.50`);

        // Second response after a brief delay
        setTimeout(() => {
          addAIMessage(`**QuickPay Selection**

Which loads would you like to elect for QuickPay? You can:

🔸 Select individual loads by number  
🔸 Choose "All available loads"  
🔸 Select multiple loads (e.g., "#9012 and #8834")  

**Benefits of QuickPay:**
✅ Get paid within 24 hours  
✅ Improve cash flow  
✅ No credit checks required  
✅ Automated processing  

Just let me know which loads you'd like to process!`);
        }, 2000);
        break;

      default:
        await originalHandleSendMessage();
    }
  };

  // Handle escape key to close chat
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isFocused) {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isFocused]);

  const handleClose = () => {
    if (onFocusChange) {
      onFocusChange(false);
    }
    setMessage("");
    setIsInDemoMode(false);
    setDemoStep(null);
  };

  const handleModeChange = (newMode: "search" | "chat") => {
    setMode(newMode);
    console.log('Mode changed to:', newMode);
  };

  const handleMessageChange = (newMessage: string) => {
    setMessage(newMessage);
    if (onFocusChange) {
      onFocusChange(newMessage.length > 0 || isFocused);
    }
  };

  const handleSend = async () => {
    if (onFocusChange) onFocusChange(true);
    
    if (isInDemoMode) {
      await handleDemoResponse();
    } else {
      await originalHandleSendMessage();
    }
  };

  // Determine the dynamic title
  const getDynamicTitle = () => {
    if (currentAction) {
      return currentAction;
    }
    return mode === "search" ? "Search" : "Chat";
  };

  // Show setup if not initialized
  if (!isInitialized) {
    return (
      <div className={`flex flex-col ${isFocused ? 'h-full' : ''}`}>
        <ChatHeader 
          isFocused={isFocused}
          title="AI Assistant Setup"
          onClose={handleClose}
        />
        <div className="flex-1 flex items-center justify-center p-4">
          <ChatSetup onAPIKeySubmit={handleAPIKeySubmit} isLoading={isLoading} />
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col ${isFocused ? 'h-full' : 'space-y-4'}`}>
      <ChatDemoHandler
        currentAction={currentAction}
        isFocused={isFocused}
        setIsInDemoMode={setIsInDemoMode}
        setDemoStep={setDemoStep}
        setMessage={setMessage}
      />
      
      <ChatHeader 
        isFocused={isFocused}
        title={getDynamicTitle()}
        onClose={handleClose}
      />
      
      <ChatContentArea
        isFocused={isFocused}
        showingResults={showingResults}
        loadResults={loadResults}
        chatHistory={chatHistory}
        isLoading={isLoading}
        onLoadSelect={handleLoadSelect}
      />
      
      {/* Chat Input - Always at bottom */}
      <div className="shrink-0 p-4">
        <div className="w-full max-w-4xl mx-auto">
          <ChatInput
            message={message}
            onMessageChange={handleMessageChange}
            onSendMessage={handleSend}
            isLoading={isLoading}
            mode={mode}
            onModeChange={handleModeChange}
          />
        </div>
      </div>
    </div>
  );
};

export default FunctionalChatInterface;
