import React from 'react';

export default function DateTime({ date, options }) {
  // Use default options if none provided
  const defaultOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };

  // Merge passed options with defaults
  const finalOptions = { ...defaultOptions, ...(options || {}) };
  
  const { weekday, year, month, day, hour, minute, second } = finalOptions;
  
  var currentLocale = new Intl.DateTimeFormat().resolvedOptions().locale;

  const getDate = () =>
    new Intl.DateTimeFormat(currentLocale, {
      year,
      month,
      weekday,
      day,
      hour,
      minute,
      second,
    }).format(Date.parse(date));
    
  return <>{getDate()}</>;
}