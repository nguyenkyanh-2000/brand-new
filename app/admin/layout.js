export const metadata = {
  title: "Admin homepage",
  description: "Admin homepage for Brand website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
