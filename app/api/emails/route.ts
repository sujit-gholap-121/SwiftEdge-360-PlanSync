import { OAuth2Client } from 'google-auth-library';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

async function fetchGmailMessages(accessToken: string) {
  const response = await fetch(
    'https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=10',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch messages');
  }

  const data = await response.json();
  return data.messages || [];
}

async function fetchMessageDetails(messageId: string, accessToken: string) {
  const response = await fetch(
    `https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch message details');
  }

  return response.json();
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const accessToken = searchParams.get('access_token');

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Access token is required' },
        { status: 401 }
      );
    }

    const messages = await fetchGmailMessages(accessToken);
    const emails = await Promise.all(
      messages.map(async (message: { id: string }) => {
        const email = await fetchMessageDetails(message.id, accessToken);
        
        return {
          id: email.id,
          subject: email.payload?.headers?.find(
            (header: { name: string }) => header.name === 'Subject'
          )?.value || 'No Subject',
          snippet: email.snippet,
          date: email.payload?.headers?.find(
            (header: { name: string }) => header.name === 'Date'
          )?.value || new Date().toISOString(),
        };
      })
    );

    return NextResponse.json({ emails });
  } catch (error) {
    console.error('Error fetching emails:', error);
    return NextResponse.json(
      { error: 'Failed to fetch emails' },
      { status: 500 }
    );
  }
}