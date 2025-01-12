interface IAuthPageContentProps {
  children: React.ReactNode;
}

export function AuthPageContent(props: Readonly<IAuthPageContentProps>) {
  const { children } = props;

  return (
    <main className="w-full h-full flex flex-col items-center justify-center px-4 md:px-10 py-10 gap-y-4">
      {children}
    </main>
  );
}
