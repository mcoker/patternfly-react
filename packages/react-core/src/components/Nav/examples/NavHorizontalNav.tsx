import React from 'react';
import { Nav, NavItem, NavList } from '@patternfly/react-core';

export const NavHorizontalNav: React.FunctionComponent = () => {
  const [activeItem, setActiveItem] = React.useState(0);

  const onSelect = (_event: React.FormEvent<HTMLInputElement>, result: { itemId: number | string }) => {
    setActiveItem(result.itemId as number);
  };

  return (
    <Nav onSelect={onSelect} variant="horizontal" aria-label="Horizontal nav local">
      <NavList>
<<<<<<< HEAD:packages/react-core/src/components/Nav/examples/NavHorizontalNav.tsx
        {Array.from({ length: 10 }).map((_value, index) => {
=======
        {Array.from({ length: 10 }).map(function (_value, index) {
>>>>>>> main:packages/react-core/src/components/Nav/examples/NavLegacyTertiary.tsx
          const num = index + 1;
          return (
            <NavItem
              preventDefault
              key={num}
              itemId={num}
              isActive={activeItem === num}
              id={`horizontal-nav-${num}`}
              to={`#horizontal-nav-${num}`}
            >
              Horizontal navigation item {num}
            </NavItem>
          );
        })}
      </NavList>
    </Nav>
  );
};
