
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

        <div className='pb-5 mb-5 border-b border-black'>
          <div className="text-center sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
              {`Welcome ${auth.user.name}!`}
            </h2>
            <p className="my-2 text-center text-gray-600 text-md">
              {`You are logged in with ${auth.user.email}`}
            </p>
            <button
              onClick={() => auth.signOut()}
              className="w-full px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out bg-indigo-300 border border-black rounded-md hover:bg-indigo-500"
            >
              Sign out
          </button>
          </div>
        </div>

        <div className='flex flex-row flex-grow'>
          <div className='w-1/4 h-full m-4 border-r border-black'>
            <Menu />
          </div>
          <div className='flex-grow'>
            <Gallery />
          </div>
        </div>
      </div>
    </StorageProvider>
  );
};
export default DashBoardPage;