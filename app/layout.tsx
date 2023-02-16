import Nav from "@/components/Nav";
import '../styles/global.scss';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
      </head>
      <body>
        {children}
        <Nav />
      </body>
    </html>
  );
}
