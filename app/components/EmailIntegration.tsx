"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth2";

interface Email {
  id: string;
  subject: string;
  snippet: string;
  date: string;
}

export default function EmailIntegration() {
  const { user } = useAuth();
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchEmails = async () => {
    if (!user) return;

    setLoading(true);
    try {
      // Get the current access token from Firebase user
      const accessToken = await user.getIdToken();

      // Pass the access token as a query parameter
      const response = await fetch(`/api/emails?access_token=${accessToken}`);
      if (!response.ok) {
        throw new Error("Failed to fetch emails");
      }

      const data = await response.json();
      setEmails(data.emails);
    } catch (error) {
      console.error("Error fetching emails:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Recent Emails</h2>
        <button
          onClick={fetchEmails}
          className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : emails.length > 0 ? (
        <div className="space-y-4">
          {emails.map((email) => (
            <div key={email.id} className="border-b pb-4">
              <h3 className="font-medium">{email.subject}</h3>
              <p className="text-sm text-gray-600 mt-1">{email.snippet}</p>
              <span className="text-xs text-gray-500">{email.date}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">No emails found</div>
      )}
    </div>
  );
}
