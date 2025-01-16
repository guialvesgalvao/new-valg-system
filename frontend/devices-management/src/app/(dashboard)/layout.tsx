import { Sidebar } from "@/components/sidebar/sidebar";

interface ILayoutProps {
  children: React.ReactNode;
}

export default function Layout(props: Readonly<ILayoutProps>) {
  return (
    <div className="flex bg-background w-full h-screen">
      <Sidebar />
      {props.children}
    </div>
  );
}
