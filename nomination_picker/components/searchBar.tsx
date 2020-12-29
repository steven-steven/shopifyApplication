import { useState } from 'react';
import { FcSearch } from 'react-icons/fc';

const SearchBar = ({searchByTitle}) => {
    const [text, setText] = useState('');

    const onSearch = () => {
        console.log('searching ', text);
        searchByTitle(text);
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            onSearch();
        }
    }

    return(
        <div className='border-2 h-16'>
            <div className="py-2 relative mx-auto text-gray-600 px-5 h-full">
                <input 
                    className="border-2 border-gray-300 bg-white h-full px-5 pr-16 rounded-lg text-sm w-full" 
                    value={text} 
                    onChange={(e)=>setText(e.target.value)}
                    placeholder="Search"
                    onKeyDown={handleKeyDown}
                />
                <button onClick={onSearch} className="absolute right-4 top-0 mt-5 mr-4">
                    <FcSearch size={20}/>
                </button>
            </div>
        </div>
    );
}
export default SearchBar;