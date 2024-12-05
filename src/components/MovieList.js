import React from 'react';

const MovieList = ({ movies }) => {
  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold mb-6 text-slate-200">Top Rated Movies for Your Mood</h3>
      <div className="space-y-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="movie-card p-4 rounded-xl transition-all duration-300"
          >
            <div className="flex gap-4">
              <div className="relative w-32 h-48 flex-shrink-0">
                <img
                  src={movie.poster_url}
                  alt={movie.title}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute top-2 right-2 bg-yellow-500 text-slate-900 font-bold px-2 py-1 rounded-lg text-sm">
                  {movie.vote_average.toFixed(1)}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-slate-200">{movie.title}</h3>
                <p className="text-sm text-slate-400 line-clamp-3 mt-2">{movie.overview}</p>
                <div className="mt-3 flex items-center gap-3">
                  <span className="text-sm text-slate-500">
                    {movie.release_date?.split('-')[0]}
                  </span>
                  <span className="text-sm px-2 py-1 bg-slate-700 rounded-full text-slate-300">
                    {movie.vote_count.toLocaleString()} votes
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
