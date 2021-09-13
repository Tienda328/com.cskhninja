import React from 'react';

export const BadgeContext = React.createContext({
  notification: 0,
  setNotification: (count) => {},
});
