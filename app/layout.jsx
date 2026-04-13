import "./globals.css";

export const metadata = {
  title: "World Builder",
  description: "A story organization platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
