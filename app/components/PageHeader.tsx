type PageHeaderProps = {
    label?: string;
    title: string;
    description: string;
  };
  
  export default function PageHeader({
    label,
    title,
    description,
  }: PageHeaderProps) {
    return (
      <section className="rounded-2xl bg-slate-900 px-8 py-10 text-white shadow">
        {label && (
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-300">
            {label}
          </p>
        )}
  
        <h1 className="mt-3 text-4xl font-bold">{title}</h1>
  
        <p className="mt-4 max-w-3xl text-slate-300">
          {description}
        </p>
      </section>
    );
  }