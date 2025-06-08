
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create email_threads table
CREATE TABLE email_threads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  thread_id VARCHAR(255) UNIQUE NOT NULL,
  load_id VARCHAR(255) NOT NULL,
  subject TEXT NOT NULL,
  participants TEXT[] DEFAULT '{}',
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unread_count INTEGER DEFAULT 0,
  is_archived BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create email_communications table
CREATE TABLE email_communications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email_id VARCHAR(255) UNIQUE NOT NULL,
  thread_id VARCHAR(255) NOT NULL REFERENCES email_threads(thread_id) ON DELETE CASCADE,
  load_id VARCHAR(255) NOT NULL,
  from_email VARCHAR(255) NOT NULL,
  to_email VARCHAR(255) NOT NULL,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  email_type VARCHAR(20) CHECK (email_type IN ('inbound', 'outbound')) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create email_attachments table
CREATE TABLE email_attachments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  attachment_id VARCHAR(255) UNIQUE NOT NULL,
  email_id VARCHAR(255) NOT NULL REFERENCES email_communications(email_id) ON DELETE CASCADE,
  file_name VARCHAR(255) NOT NULL,
  file_size VARCHAR(50) NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  storage_url TEXT,
  download_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_email_threads_load_id ON email_threads(load_id);
CREATE INDEX idx_email_threads_last_activity ON email_threads(last_activity DESC);
CREATE INDEX idx_email_communications_thread_id ON email_communications(thread_id);
CREATE INDEX idx_email_communications_load_id ON email_communications(load_id);
CREATE INDEX idx_email_communications_timestamp ON email_communications(timestamp DESC);
CREATE INDEX idx_email_attachments_email_id ON email_attachments(email_id);

-- Enable Row Level Security
ALTER TABLE email_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_communications ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_attachments ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (adjust based on your auth requirements)
CREATE POLICY "Users can view their email threads" ON email_threads
  FOR SELECT USING (true); -- Adjust based on your user authentication

CREATE POLICY "Users can insert email threads" ON email_threads
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update their email threads" ON email_threads
  FOR UPDATE USING (true);

CREATE POLICY "Users can view their email communications" ON email_communications
  FOR SELECT USING (true);

CREATE POLICY "Users can insert email communications" ON email_communications
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update their email communications" ON email_communications
  FOR UPDATE USING (true);

CREATE POLICY "Users can view email attachments" ON email_attachments
  FOR SELECT USING (true);

CREATE POLICY "Users can insert email attachments" ON email_attachments
  FOR INSERT WITH CHECK (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_email_threads_updated_at BEFORE UPDATE ON email_threads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_email_communications_updated_at BEFORE UPDATE ON email_communications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
