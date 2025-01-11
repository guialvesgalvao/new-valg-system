interface ILayoutAuthProps {
  children: React.ReactNode;
}

export default function LayoutAuth(props: Readonly<ILayoutAuthProps>) {
  return (
    <div className="bg-background w-full h-screen flex items-center justify-center p-4">
      {props.children}
    </div>
  );
}
