import { createBrowserRouter, RouterProvider as RRDRouterProvider } from "react-router-dom";
import { HomePage } from "./Home.page";
import { HomePageLoader } from "./HomePage.loader";
import { pokemonDetailsPageLoader } from "./PokemonDetailsPage.loader";
import { PokemonDetailsPage } from "./PokemonDetails.page";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
        loader: HomePageLoader,
    },
    {
        path: "/pokemon/:id",
        element: <PokemonDetailsPage />,
        loader: pokemonDetailsPageLoader,
    },
    
]);

export const RouterProvider = () => <RRDRouterProvider router={router}></RRDRouterProvider>;
