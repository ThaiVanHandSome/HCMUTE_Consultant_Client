import { LayoutProps } from "~/types/layout";
import Footer from "../components/Footer";
import Header from "../components/Header";

const BaseLayout = ({ children }: LayoutProps) => {
  return (
    <section>
      <Header />
      <div>{children}</div>
      <Footer />
    </section>
  );
};

export default BaseLayout;
