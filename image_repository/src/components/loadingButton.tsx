interface ButtonProps {
  title?: string;
  isLoading?: boolean;
}

const Spinner = (props: React.SVGProps<SVGSVGElement>): JSX.Element => {
  return (
    <svg viewBox="0 0 100 100" {...props}>
      <path d="M90.9 58.2c-3.8 18.9-20.1 32.7-39.7 33-22 .4-40.7-17-41.9-39C8 28.5 26.9 8.8 50.4 8.8c19 0 35.5 13.1 40 31.2.3 1.2 1.4 2.1 2.7 2.1 1.8 0 3.1-1.7 2.7-3.5C90.6 18.1 72 3.3 50.4 3.3c-27.2 0-49 23.4-46.6 51.1 2.1 23 21 41.2 44 42.4C71.6 98 91.7 81.9 96.2 59.4c.3-1.7-1-3.3-2.7-3.3-1.3-.1-2.4.8-2.6 2.1z" />
    </svg>
  );
};

const Button = ({
  isLoading,
  title,
  children,
  ...buttonProps
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element => {
  if (isLoading) return <Spinner width="20" fill="white" className="animate-spin" />
  return (
    <button
      className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700"
      {...buttonProps}
    >
      {isLoading ? 'Loading...' : title}
      {children}
    </button>
  );
};
export default Button;