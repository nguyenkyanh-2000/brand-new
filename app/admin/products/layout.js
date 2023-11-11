export const metadata = {
  title: "Products dashboard",
  description: "Products dashboard for Brand website",
};

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
