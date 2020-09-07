import React ,{ useEffect, useState } from 'react';
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeatureItem from './components/FeatureItem';
import Header from './components/Header';

export default () => {

  const[movieList, setMovieList] = useState([]);
  const [featureItem, setFeatureItem] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];

      let chosenInfo = await Tmdb.getFeatureItem(chosen.id, 'tv');
      setFeatureItem(chosenInfo);
    }
    
    loadAll();
  }, []);

  useEffect(()=> {
    const scrollListener = () => {
      if(window.scrollY > 10){
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scrool', scrollListener);
    }
  }, []);


  return (
    <div className="page">

      <Header black={blackHeader}/>

      {featureItem &&
        <FeatureItem item={featureItem}/>
      }

      <section className="lists">
        {movieList.map((item, key)=>(
          <MovieRow key={key} title={item.title} items={item.items}/>
        ))}
      </section>

      <footer>
        Develop by <strong>Alan Malbos</strong><br/>
        Image rights to <a href='https://www.netflix.com/'><strong>Netflix</strong></a><br/>
        Data from <a href='https://www.themoviedb.org/'><strong>TheMovieDB.org</strong></a>
      </footer>
    </div>
  );
}