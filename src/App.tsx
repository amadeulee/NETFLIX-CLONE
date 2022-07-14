import { useEffect, useState } from 'react';
import './App.css';
import ChosenDisplay from './components/ChosenDisplay';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';
import MovieRow from './components/MovieRow';
import { SeriesInfo } from './ModalModel';
import { Item, MovieList, Results } from './Model';
import { MovieModel } from './MovieModel';
import Tmdb from './services/Tmdb';
import { Trailer } from './TrailerModel';

function App() {
  const [movieList, setMovieList] = useState<MovieList[]>([]);
  const [featuredData, setFeaturedData] = useState<SeriesInfo>();
  const [blackHeader, setBlackHeader] = useState<boolean>(false);
  const [chosenDisplay, setChoseDisplay] = useState<Results>();
  const [modalSerie, setModalSerie] = useState<SeriesInfo | MovieModel>();
  const [similarList, setSimilarList] = useState<Item>();
  const [trailerVideo, setTrailerVideo] = useState<Trailer>();

  // console.log(chosenDisplay);

  const handleModal = async (eachItem: Results) => {
    console.log(eachItem.id);
    let similarListTemp;
    let modalInfo;
    let trailer;

    if (eachItem.original_title) {
      modalInfo = await Tmdb.getModalInfo(eachItem.id, 'movie');
      similarListTemp = await Tmdb.getSimilarList(eachItem.id, 'movie');
      trailer = await Tmdb.getItemTrailer(eachItem.id, 'movie');
    } else {
      modalInfo = await Tmdb.getModalInfo(eachItem.id, 'tv');
      similarListTemp = await Tmdb.getSimilarList(eachItem.id, 'tv');
      trailer = await Tmdb.getItemTrailer(eachItem.id, 'tv');
    }

    setModalSerie(modalInfo);
    setSimilarList(similarListTemp);
    setTrailerVideo(trailer);
    console.log(trailer);
    // console.log(similarListTemp);
  };

  useEffect(() => {
    const loadAll = async () => {
      // Taking all lists
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      // Taking featured movie
      let originals = list.filter(i => i.category === 'originals');
      let randomOriginal = Math.floor(
        Math.random() * (originals[0].items.results.length - 1)
      );

      let chosen = originals[0].items.results[randomOriginal];

      let chosenInfo: SeriesInfo = await Tmdb.getMovieInfo(
        String(chosen.id),
        'tv'
      );

      setFeaturedData(chosenInfo);
      console.log(chosenInfo);

      // console.log(chosenInfo);
      // console.log(featuredData);
    };

    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    };
    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, []);

  return (
    <div className="page">
      {chosenDisplay && (
        <ChosenDisplay
          frontDisplay={setChoseDisplay}
          modalInfo={modalSerie}
          similarList={similarList}
          handleModal={handleModal}
          setSimilarList={setSimilarList}
          trailerVideo={trailerVideo}
        />
      )}
      <Header black={blackHeader} />
      {featuredData && <FeaturedMovie item={featuredData} />}
      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow
            key={key}
            item={item}
            frontDisplay={setChoseDisplay}
            handleModal={handleModal}
            setSimilarList={setSimilarList}
          />
        ))}
      </section>

      {movieList.length <= 0 && (
        <div className="loading-outside">
          <div className="loading">
            <img
              src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif"
              alt="Carregando"
            ></img>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
