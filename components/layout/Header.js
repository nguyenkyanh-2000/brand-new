import React from "react";

function Header({ children }) {
  return (
    <header className="w-full h-[64px] bg-transparent text-foreground flex items-center justify-between px-10">
      {children}
    </header>
  );
}

export default Header;
