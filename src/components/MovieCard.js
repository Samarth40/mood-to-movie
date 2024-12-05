import React from 'react';

const MovieCard = ({ movie }) => {
  return (
    <div className="bg-[#2d2e45] rounded-xl overflow-hidden border border-[#3d3e60] hover:border-[#61efff]/30 transition-all duration-300 group">
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1b2e] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-1 bg-[#61efff] text-[#1a1b2e] rounded-md text-sm font-medium">
                {movie.vote_average.toFixed(1)}
              </span>
              <span className="text-[#e1e7ff]/80 text-sm">
                {new Date(movie.release_date).getFullYear()}
              </span>
            </div>
            <p className="text-[#e1e7ff]/80 text-sm line-clamp-3">
              {movie.overview}
            </p>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-[#61efff] font-semibold mb-2 line-clamp-2">
          {movie.title}
        </h3>
        <div className="flex flex-wrap gap-2">
          {movie.genre_ids.map((genreId) => (
            <span
              key={genreId}
              className="px-2 py-1 bg-[#1a1b2e] text-[#e1e7ff]/80 rounded-md text-sm"
            >
              {genreId}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
