import React from "react";

function Header({ children }) {
  return (
    <header className="flex h-[64px] w-full items-center justify-between  !overflow-hidden bg-transparent px-10 text-foreground">
      {children}
    </header>
  );
}

export default Header;
