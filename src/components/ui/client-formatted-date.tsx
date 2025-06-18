
"use client";

import { useState, useEffect } from 'react';
import { format, parseISO, isValid } from 'date-fns';

interface ClientFormattedDateProps {
  isoDateString?: string; // Make it optional to handle cases where date might not exist
  formatString: string;
  placeholder?: string;
}

export function ClientFormattedDate({ isoDateString, formatString, placeholder = "Loading..." }: ClientFormattedDateProps) {
  const [formattedDate, setFormattedDate] = useState<string>(placeholder);

  useEffect(() => {
    if (isoDateString) {
      const date = parseISO(isoDateString);
      if (isValid(date)) {
        setFormattedDate(format(date, formatString));
      } else {
        setFormattedDate("Invalid date");
      }
    } else {
      // If no date string is provided, keep the placeholder or set a specific message
      setFormattedDate(placeholder !== "Loading..." ? placeholder : "N/A");
    }
  }, [isoDateString, formatString, placeholder]);

  return <>{formattedDate}</>;
}
