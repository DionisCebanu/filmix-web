/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly EXPO_PUBLIC_MOVIE_API_KEY: string;
    readonly EXPO_PUBLIC_APPWRITE_PROJECT_ID: string;
    readonly EXPO_PUBLIC_APPWRITE_DATABASE_ID: string;
    readonly EXPO_PUBLIC_APPWRITE_COLLECTION_ID: string;
    readonly EXPO_PUBLIC_APPWRITE_COLLECTION_USERS_ID: string;
    readonly EXPO_PUBLIC_APPWRITE_COLLECTION_SAVED_MOVIES_ID: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }