import "./global.css";

export const metadata = {
  title: "Next.js Demo",
  description: "This is the 11th class of the Web Dev Bootcamp",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
