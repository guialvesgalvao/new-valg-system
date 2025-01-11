interface IAuthTitleProps {
  title: string;
  subtitle: string;
}

export function AuthTitle(props: Readonly<IAuthTitleProps>) {
  const { title, subtitle } = props;

  return (
    <div className="w-full flex flex-col text-center items-center justify-center gap-y-2">
      <h1 className="text-3xl font-semibold">{title}</h1>
      <h3 className="text-sm font-normal">{subtitle}</h3>
    </div>
  );
}
