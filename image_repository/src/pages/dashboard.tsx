
import { useRequireAuth } from '../components/hooks/useRequireAuth';
import Gallery from '../components/gallery';
import Menu from '../components/menu';
import { StorageProvider } from '../components/hooks/useStorage';

const DashBoardPage: React.FC = () => {
  const auth = useRequireAuth();
  if (!auth.user) return null;

  // note storage provider should be defined when the user is logged in

  return (
    <StorageProvider>
      <div className="flex flex-col min-h-screen bg-gray-200">

        <div className="pb-10 text-center border-gray-900 sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
            {`Welcome ${auth.user.name}!`}
          </h2>
          <p className="mt-2 text-center text-gray-600 text-md">
            {`You are logged in with ${auth.user.email}`}
          </p>
          <button
            onClick={() => auth.signOut()}
            className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700"
          >
            Sign out
          </button>
        </div>

        <div className='flex flex-row'>
          <Menu />
          <Gallery />
        </div>
      </div>
    </StorageProvider>
  );
};
export default DashBoardPage;