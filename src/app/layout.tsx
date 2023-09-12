import Nav from "@components/Nav";
import Provider from "@components/Provider";
import "./globals.css";

export const metadata = {
  title: "Promptopia",
  deccription: "Discover and share AI prompts",
};

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient"></div>
          </div>
          <main className="app">
            <Nav></Nav>
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}

export default RootLayout;
