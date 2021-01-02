import { ImSpinner9 } from 'react-icons/im';
interface ButtonProps {
  title?: string;
  isLoading?: boolean;
}

const Button = ({
  isLoading,
  title,
  children,
  ...buttonProps
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element => {
  if (isLoading) return <ImSpinner9 className="w-10 mx-auto animate-spin" />
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