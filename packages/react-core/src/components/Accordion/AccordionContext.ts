import * as React from 'react';

interface AccordionContextProps {
  ContentContainer: React.ElementType;
  ToggleContainer: React.ElementType;
  togglePosition: 'start' | 'end';
<<<<<<< HEAD
}

interface AccordionItemContextProps {
  isExpanded?: boolean;
=======
>>>>>>> main
}

export const AccordionContext = React.createContext<Partial<AccordionContextProps>>({});
export const AccordionItemContext = React.createContext({} as AccordionItemContextProps);
