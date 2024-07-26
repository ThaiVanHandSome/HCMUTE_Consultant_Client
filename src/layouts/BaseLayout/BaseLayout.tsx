import { ReactNode } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

type Props = {
  children: ReactNode;
};

const BaseLayout = ({ children }: Props) => {
  return (
    <section>
      <Header />
      <div>{children}</div>
      <Footer />
    </section>
  );
};

export default BaseLayout;
