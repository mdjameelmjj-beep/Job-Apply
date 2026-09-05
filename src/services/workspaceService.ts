/**
 * Google Drive & Gmail API Client Service
 * Uses client-side OAuth Bearer token to communicate with Google Workspace APIs
 */

export interface DriveFileItem {
  id: string;
  name: string;
  mimeType: string;
  modifiedTime?: string;
  size?: string;
  webViewLink?: string;
}

export interface GmailMessageSummary {
  id: string;
  threadId: string;
  snippet: string;
  subject: string;
  from: string;
  date: string;
}

/**
 * Lists files created by or accessible to this app in Google Drive
 */
export async function listDriveFiles(accessToken: string): Promise<DriveFileItem[]> {
  const query = encodeURIComponent("trashed = false");
  const response = await fetch(
    `https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name,mimeType,modifiedTime,size,webViewLink)&orderBy=modifiedTime desc&pageSize=25`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `Google Drive error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.files || [];
}

/**
 * Uploads or saves an Application Packet / Tailored CV to Google Drive
 */
export async function uploadFileToDrive(
  accessToken: string,
  filename: string,
  content: string,
  mimeType: string = 'text/plain'
): Promise<DriveFileItem> {
  const metadata = {
    name: filename,
    mimeType: mimeType,
  };

  const boundary = '-------314159265358979323846';
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelim = `\r\n--${boundary}--`;

  const multipartRequestBody =
    delimiter +
    'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
    JSON.stringify(metadata) +
    delimiter +
    `Content-Type: ${mimeType}\r\n\r\n` +
    content +
    closeDelim;

  const response = await fetch(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,mimeType,webViewLink',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': `multipart/related; boundary=${boundary}`,
      },
      body: multipartRequestBody,
    }
  );

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `Upload to Drive failed: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Delete a file from Google Drive (Requires explicit confirmation from user)
 */
export async function deleteDriveFile(accessToken: string, fileId: string): Promise<void> {
  const response = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `Delete failed: ${response.statusText}`);
  }
}

/**
 * Search job confirmation or interview emails from recruiter ATS gateways in Gmail
 */
export async function searchJobEmailsInGmail(
  accessToken: string,
  query: string = 'subject:(application OR interview OR offer OR candidate OR Workday OR Greenhouse OR Naukri OR Indeed) -category:promotions'
): Promise<GmailMessageSummary[]> {
  const encodedQuery = encodeURIComponent(query);
  const listResp = await fetch(
    `https://gmail.googleapis.com/gmail/v1/users/me/messages?q=${encodedQuery}&maxResults=15`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!listResp.ok) {
    const err = await listResp.json().catch(() => ({}));
    throw new Error(err.error?.message || `Gmail search failed: ${listResp.statusText}`);
  }

  const listData = await listResp.json();
  const messages = listData.messages || [];

  if (messages.length === 0) return [];

  // Fetch message details in parallel
  const details = await Promise.all(
    messages.slice(0, 10).map(async (msg: { id: string; threadId: string }) => {
      try {
        const msgResp = await fetch(
          `https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}?format=metadata&metadataHeaders=Subject&metadataHeaders=From&metadataHeaders=Date`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (!msgResp.ok) return null;
        const msgData = await msgResp.json();
        const headers = msgData.payload?.headers || [];
        const subject = headers.find((h: any) => h.name.toLowerCase() === 'subject')?.value || 'No Subject';
        const from = headers.find((h: any) => h.name.toLowerCase() === 'from')?.value || 'Unknown Sender';
        const date = headers.find((h: any) => h.name.toLowerCase() === 'date')?.value || '';

        return {
          id: msgData.id,
          threadId: msgData.threadId,
          snippet: msgData.snippet || '',
          subject,
          from,
          date,
        };
      } catch {
        return null;
      }
    })
  );

  return details.filter((m): m is GmailMessageSummary => m !== null);
}

/**
 * Send an email via Gmail API
 * Note: Must be called only after explicit user confirmation in the UI
 */
export async function sendEmailViaGmail(
  accessToken: string,
  to: string,
  subject: string,
  bodyText: string
): Promise<{ id: string; threadId: string }> {
  const utf8Subject = `=?utf-8?B?${btoa(unescape(encodeURIComponent(subject)))}?=`;
  const messageParts = [
    `To: ${to}`,
    'Content-Type: text/plain; charset=utf-8',
    'MIME-Version: 1.0',
    `Subject: ${utf8Subject}`,
    '',
    bodyText,
  ];
  const message = messageParts.join('\r\n');

  // Base64URL encode
  const encodedMessage = btoa(unescape(encodeURIComponent(message)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ raw: encodedMessage }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `Failed to send email: ${response.statusText}`);
  }

  return response.json();
}
