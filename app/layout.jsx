import "./globals.css";

export const metadata = {
  title: "World Builder",
  description: "Writing and story organization platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
