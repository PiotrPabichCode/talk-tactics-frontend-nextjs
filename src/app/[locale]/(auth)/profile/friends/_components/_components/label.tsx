export function Label({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <>
      <h3
        className='text-lg font-medium animate-fade-up'
        style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
        {title}
      </h3>
      <p
        className='text-sm text-muted-foreground animate-fade-up'
        style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
        {description}
      </p>
    </>
  );
}
