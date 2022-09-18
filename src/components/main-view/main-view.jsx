import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [
        {
          _id: '631547ccf03d5cd6f96b6b1b',
          Title: 'Parasite',
          Description: 'The film follows a Korean family that attempt to be employed by the same wealthy family.',
          Genre: "Thriller",
          Director: "Bong Joon Ho",
          ImagePath: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8LYus8YdDMo68fGNa3xpL_LCKQ0IwJu7zQK49norW-0BpE82gzYsRJXhXQMROOtU-Gu4&usqp=CAU',
          Featured: true
        },
        {
          _id: '63154b3ff03d5cd6f96b6b20',
          Title: "Bladerunner 2049",
          Description: "Gosling plays K, a Nexus-9 replicant blade runner who uncovers a secret that threatens to destabilize society and the course of civilization.",
          Genre: "Science Fiction",
          Director: "Denis Villeneuve",
          ImagePath: 'https://i.ebayimg.com/images/g/R58AAOSwxKxep0qA/s-l500.jpg',
          Featured: true
        },
        {
          _id: '63154bbbf03d5cd6f96b6b23',
          Title: "Oldboy",
          Description: "The film follows Oh Dae-Su who is imprisoned in a cell for 15 years without knowing why.",
          Genre: "Action",
          Director: "Park Chan Wook",
          ImagePath: 'https://upload.wikimedia.org/wikipedia/en/6/67/Oldboykoreanposter.jpg',
          Featured: true
        },
      ],
      selectedMovie: null
    };
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;


    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
          ))
        }
      </div>
    );
  }

}

export default MainView