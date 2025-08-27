import type { FC, ReactNode } from "react";

interface LayoutProps {
  modal: ReactNode;
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ modal, children }) => {
  return (
    <div>
      {modal}
      {children}
    </div>
  );
};

export default Layout;
