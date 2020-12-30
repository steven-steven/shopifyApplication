import { useState } from 'react'
import Head from 'next/head'
import DetailSection from '../components/detailSection'
import Header from '../components/header'
import OptionListSection from '../components/optionListSection'
import SearchBar from '../components/searchBar'
import SelectedListSection from '../components/selectedListSection'
import { Movie } from '../components/context/selectionContext'
import MessageBanner from '../components/msgBanner'

type movieList = { [key: string]: Movie };

export default function Home() {
  const [options, setOptions] = useState<movieList>({} as movieList)

  const searchByTitle = async (text) => {
    try {
      const res = await fetch(`http://www.omdbapi.com/?apikey=99c14cff&s=${text}`, { mode: 'no-cors' });
      const options = await res.json();
      if (options && options.Response == 'True') {
        const sanitizedList = options.Search.reduce((acc, mov) => {
          acc[mov.imdbID] = {
            'id': mov.imdbID,
            'title': mov.Title,
            'year': mov.Year,
            'type': mov.Type,
            'poster': mov.Poster
          } as Movie;
          return acc;
        }, {});
        setOptions(sanitizedList);
      } else {
        setOptions({});
      }
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div>
      <Head>
        <title>IMDB Nomination Picker</title>
      </Head>
      <div className='flex flex-col'>
        <Header />
        <div className='flex md:flex-row flex-grow'>
          <div className='leftCol flex flex-col flex-grow'>
            <SearchBar searchByTitle={searchByTitle} />
            <OptionListSection options={options} />
          </div>
          <div className='rightCol flex flex-col w-2/5'>
            <DetailSection />
            <SelectedListSection />
          </div>
        </div>
        <div className='relative'>
          <MessageBanner />
        </div>
      </div>
    </div>
  )
}

// This function gets called at build time on server-side.
// won't get called on client-side
// export const getStaticProps: GetStaticProps = async () => {
//   const res = await fetch('http://www.omdbapi.com/?apikey=99c14cff');
//   const options = await res.json();

//   return {
//       props: {
//           options,
//       },
//   }
// }