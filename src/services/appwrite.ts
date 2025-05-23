import { Client, Databases, ID, Query, Account } from "appwrite";
import { Movie } from "../interfaces/interfaces";
import { TrendingMovie, MovieDetails } from "../interfaces/interfaces";
import { log } from "console";

const DATABASE_ID = process.env.REACT_APP_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.REACT_APP_APPWRITE_COLLECTION_ID!;
const USERS_COLLECTION = process.env.REACT_APP_APPWRITE_COLLECTION_USERS_ID!;
const SAVED_MOVIES = process.env.REACT_APP_APPWRITE_COLLECTION_SAVED_MOVIES_ID!;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.REACT_APP_APPWRITE_PROJECT_ID!);
  

const database = new Databases(client);
const account = new Account(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", query),
      Query.equal("movie_id", String(movie.id)), // ✅ cast to string
    ]);

    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];
      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingMovie.$id,
        {
          count: existingMovie.count + 1,
        }
      );
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm: query,
        movie_id: String(movie.id), // ✅ ensure consistent type
        title: movie.title,
        count: 1,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
  } catch (error) {
    console.error("Error updating search count:", error);
    throw error;
  }
};


export const getTrendingMovies = async (): Promise<
  TrendingMovie[] | undefined
> => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc("count"),
    ]);

    return result.documents as unknown as TrendingMovie[];
  } catch (error) {
    console.error(error);
    return undefined;
  }
};




export const registerUser = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  return await database.createDocument(DATABASE_ID, USERS_COLLECTION, ID.unique(), {
    name,
    email,
    password,
  });
};

// Login
export const loginUser = async (email: string, password: string) => {
  const res = await database.listDocuments(DATABASE_ID, USERS_COLLECTION, [
    Query.equal("email", email),
    Query.equal("password", password),
  ]);

  return res.documents[0] || null;
};

// Get current connected user
export const getCurrentUser = async () => {
  try {
    const userStr = localStorage.getItem("user");
    if (!userStr) return null;

    const user = JSON.parse(userStr);
    return user;
  } catch (error) {
    console.error("Failed to get current user:", error);
    return null;
  }
};


// ✅ Log out
export const handleLogout = async () => {
  localStorage.removeItem("user");
};


// Add the Movie to the saved list
export const saveMovie = async (movie: MovieDetails) => {
  try {
    const userStr = localStorage.getItem("user");
    if (!userStr) throw new Error("User not logged in.");

    const user = JSON.parse(userStr);
    const userId = user.$id;

    const result = await database.listDocuments(DATABASE_ID, SAVED_MOVIES, [
      Query.equal("user_id", userId),
      Query.equal("movie_id", String(movie.id)),
    ]);

    if (result.documents.length > 0) {
      console.log("Movie already saved.");
      return;
    }

    await database.createDocument(DATABASE_ID, SAVED_MOVIES, ID.unique(), {
      user_id: userId,
      movie_id: String(movie.id),
      title: movie.title ?? "Untitled",
      poster_url: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "",
    });

    console.log(" Movie saved");
  } catch (error) {
    console.error(" Failed to save movie:", error);
  }
};
// Get Saved movies

export const getSavedMovies = async () => {
  try {
    const userStr = localStorage.getItem("user");
    if (!userStr) throw new Error("User not logged in");

    const user = JSON.parse(userStr);
    const userId = user.$id;

    const result = await database.listDocuments(DATABASE_ID, SAVED_MOVIES, [
      Query.equal("user_id", userId),
      Query.orderDesc("$createdAt"),
    ]);

    return result.documents; // an array of saved movie documents
  } catch (error) {
    console.error("Error fetching saved movies:", error);
    return [];
  }
};

// Remove saved Movies
export const removeMovie = async (movieId: string | number) => {
  try {
    const userStr = localStorage.getItem("user");
    if (!userStr) throw new Error("User not logged in.");

    const user = JSON.parse(userStr);
    const userId = user.$id;

    // Find the saved document ID to delete
    const result = await database.listDocuments(DATABASE_ID, SAVED_MOVIES, [
      Query.equal("user_id", userId),
      Query.equal("movie_id", String(movieId)),
    ]);

    if (result.documents.length === 0) {
      console.log("Movie not found in saved list.");
      return;
    }

    const docId = result.documents[0].$id;

    await database.deleteDocument(DATABASE_ID, SAVED_MOVIES, docId);
    console.log(" Movie removed from saved list.");
  } catch (error) {
    console.error(" Failed to remove movie:", error);
  }
};
