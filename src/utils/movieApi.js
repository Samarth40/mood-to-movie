import axios from 'axios';

// Updated TMDB API configuration
const TMDB_CONFIG = {
  apiKey: 'd04e1a14299edc66fc5c72279776916b',
  baseURL: 'https://api.themoviedb.org/3',
  imageBaseURL: 'https://image.tmdb.org/t/p/w500'
};

// Create axios instance with default config
const tmdbApi = axios.create({
  baseURL: TMDB_CONFIG.baseURL,
  params: {
    api_key: TMDB_CONFIG.apiKey
  }
});

// Enhanced mood to genre mapping with weighted combinations
const moodToGenres = {
  happy: {
    primary: [35, 16], // Comedy, Animation
    secondary: [10402, 10751], // Music, Family
    exclude: [27, 53] // Horror, Thriller
  },
  sad: {
    primary: [18], // Drama
    secondary: [10749, 10752], // Romance, War
    exclude: [35, 16] // Comedy, Animation
  },
  angry: {
    primary: [28, 80], // Action, Crime
    secondary: [53, 10752], // Thriller, War
    exclude: [35, 10751] // Comedy, Family
  },
  neutral: {
    primary: [12, 878], // Adventure, Science Fiction
    secondary: [14, 36], // Fantasy, History
    exclude: [] // No exclusions
  },
  surprised: {
    primary: [14, 9648], // Fantasy, Mystery
    secondary: [28, 878], // Action, Science Fiction
    exclude: [18, 10752] // Drama, War
  },
  fearful: {
    primary: [27, 53], // Horror, Thriller
    secondary: [9648, 878], // Mystery, Science Fiction
    exclude: [35, 10751] // Comedy, Family
  },
  disgusted: {
    primary: [53, 80], // Thriller, Crime
    secondary: [27, 9648], // Horror, Mystery
    exclude: [35, 10749] // Comedy, Romance
  }
};

// Handle mixed emotions by combining genre preferences
const getMixedGenres = (mood1, mood2) => {
  const genres1 = moodToGenres[mood1];
  const genres2 = moodToGenres[mood2];
  
  if (!genres1 || !genres2) return null;

  return {
    primary: [...new Set([...genres1.primary, ...genres2.secondary])],
    exclude: [...new Set([...genres1.exclude, ...genres2.exclude])]
  };
};

const getRandomPage = () => Math.floor(Math.random() * 5) + 1; // Random page 1-5

// Test the API connection
export const testApiConnection = async () => {
  try {
    // Test with a simple configuration request
    const response = await tmdbApi.get('/configuration');
    return response.data && response.data.images;
  } catch (error) {
    console.error('TMDB API Connection Test Failed:', error);
    return false;
  }
};

export const fetchMoviesByMood = async (mood) => {
  try {
    // Handle mixed emotions (e.g., "happy+surprised")
    let selectedGenres;
    let excludeGenres = [];
    
    if (mood.includes('+')) {
      const [mood1, mood2] = mood.split('+');
      const mixedGenres = getMixedGenres(mood1, mood2);
      if (mixedGenres) {
        selectedGenres = mixedGenres.primary;
        excludeGenres = mixedGenres.exclude;
      }
    } else {
      selectedGenres = moodToGenres[mood]?.primary.concat(
        moodToGenres[mood]?.secondary.slice(0, 2) || []
      );
      excludeGenres = moodToGenres[mood]?.exclude || [];
    }

    if (!selectedGenres) {
      selectedGenres = moodToGenres.neutral.primary; // Fallback to neutral
    }

    const response = await tmdbApi.get('/discover/movie', {
      params: {
        with_genres: selectedGenres.join('|'),
        without_genres: excludeGenres.join('|'),
        sort_by: 'popularity.desc',
        'vote_count.gte': 300,
        'vote_average.gte': 6.0,
        include_adult: false,
        language: 'en-US',
        page: getRandomPage(),
        with_original_language: 'en'
      }
    });

    if (!response.data?.results?.length) {
      throw new Error('No movies found for your current mood. Please try again.');
    }

    // Randomize and limit results
    return response.data.results
      .filter(movie => movie.poster_path)
      .sort(() => Math.random() - 0.5) // Shuffle results
      .slice(0, 6)
      .map(movie => ({
        ...movie,
        poster_url: `${TMDB_CONFIG.imageBaseURL}${movie.poster_path}`
      }));
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};
