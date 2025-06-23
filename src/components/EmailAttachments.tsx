
import React from 'react';
import { Paperclip } from 'lucide-react';
import { EmailAttachment } from '../services/emailService';

interface EmailAttachmentsProps {
  attachments: EmailAttachment[];
}

const EmailAttachments = ({ attachments }: EmailAttachmentsProps) => {
  if (!attachments || attachments.length === 0) {
    return null;
  }

  return (
    <div className="mt-3 pt-3 border-t">
      <div className="text-xs font-medium text-slate-600 mb-2">Attachments:</div>
      <div className="space-y-1">
        {attachments.map((attachment) => (
          <div
            key={attachment.id}
            className="flex items-center gap-2 text-xs bg-white p-2 rounded border"
          >
            <Paperclip className="w-3 h-3" />
            <span className="font-medium">{attachment.fileName}</span>
            <span className="text-slate-500">
              ({(attachment.fileSize / 1024).toFixed(1)} KB)
            </span>
            {attachment.downloadUrl && (
              <a
                href={attachment.downloadUrl}
                className="text-blue-600 hover:underline ml-auto"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmailAttachments;
