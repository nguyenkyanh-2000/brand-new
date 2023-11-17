"use client";

const React = require("react");
const { ThemeProvider: NextThemesProvider } = require("next-themes");

function ThemeProvider({ children, ...props }) {
  return React.createElement(NextThemesProvider, props, children);
}

module.exports = { ThemeProvider };
