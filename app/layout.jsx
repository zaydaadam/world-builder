import "./globals.css";

export const metadata = {
  title: "World Builder",
  description: "Writing and story organization platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Layout UI */}
        {/* Place children where you want to render a page or nested layout */}
        {children}
      </body>
    </html>
  );
}
