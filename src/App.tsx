 //import "./App.css";
//import "./index.css";
// import { useMemo } from "react";
// import * as anchor from "@project-serum/anchor";
// import Home from "./Home";
// import { DEFAULT_TIMEOUT } from "./connection";
// import { clusterApiUrl } from "@solana/web3.js";
// import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
// import {
//   getPhantomWallet,
//   getSlopeWallet,
//   getSolflareWallet,
//   getSolletExtensionWallet,
//   getSolletWallet,
// } from "@solana/wallet-adapter-wallets";

// import {
//   ConnectionProvider,
//   WalletProvider,
// } from "@solana/wallet-adapter-react";
// import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";

// import { createTheme, ThemeProvider } from "@material-ui/core";

import { positionOptions,Feature, RootObject, Viewport } from "./json-data";
//import "./App.css";
import * as geo from "./data/proto_GeoNFT.json";
//import * as turf from "@turf/turf";
import ReactMapGL, { GeolocateControl,Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";
import Mint from "./components/Mint";
import { insideCircle } from "geolocation-utils";

// const theme = createTheme({
//   palette: {
//     type: "dark",
//   },
// });

const g: RootObject = geo;
let location:Object|any;
let loc: positionOptions;

navigator.geolocation.getCurrentPosition((position)=>{
    location={lat:position.coords.latitude,lon:position.coords.longitude};
    return location;
  
})

//const getCandyMachineId = (): anchor.web3.PublicKey | undefined => {
//   try {
//     return new anchor.web3.PublicKey(process.env.REACT_APP_CANDY_MACHINE_ID!);
//   } catch (e) {
//     console.log("Failed to construct CandyMachineId", e);
//     return undefined;
//   }
// };

// let error: string | undefined = undefined;

// if (process.env.REACT_APP_SOLANA_NETWORK === undefined) {
//   error =
//     "Your REACT_APP_SOLANA_NETWORK value in the .env file doesn't look right! The options are devnet and mainnet-beta!";
// } else if (process.env.REACT_APP_SOLANA_RPC_HOST === undefined) {
//   error =
//     "Your REACT_APP_SOLANA_RPC_HOST value in the .env file doesn't look right! Make sure you enter it in as a plain-text url (i.e., https://metaplex.devnet.rpcpool.com/)";
// }

// const candyMachineId = getCandyMachineId();
// const network = (process.env.REACT_APP_SOLANA_NETWORK ??
//   "devnet") as WalletAdapterNetwork;
// const rpcHost =
//   process.env.REACT_APP_SOLANA_RPC_HOST ?? anchor.web3.clusterApiUrl("devnet");
// const connection = new anchor.web3.Connection(rpcHost);

const App = () => {

  // const endpoint = useMemo(() => clusterApiUrl(network), []);

  // const wallets = useMemo(
  //   () => [
  //     getPhantomWallet(),
  //     getSolflareWallet(),
  //     getSlopeWallet(),
  //     getSolletWallet({ network }),
  //     getSolletExtensionWallet({ network }),
  //   ],
  //   []
  // );

  const radius:number=2000000;

  const [viewport, setViewport] = useState<Viewport>({
    latitude: 20,
    longitude: 0,
    width: "100vw",
    height: "100vh",
    zoom: 2.5,
  });
  const [selectedLoc, setSelectedLoc] = useState<Feature | null>();
  const [userLocation, setUserLocation] = useState({});

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json"
        onViewportChange={(viewport: any) => {
          setViewport(viewport);
        }}
        scrollZoom={true}
      >
        {Object.values(g)[0].features?.map((d:Feature) => (
          
          <Marker
            key={d.properties.filename}
            latitude={d.geometry.coordinates[1]}
            longitude={d.geometry.coordinates[0]}
          >
            <button
              className="marker-btn"
              onClick={(e) => {
                e.preventDefault();
                setSelectedLoc(d);
              }}
            >
              <img src="/map-marker-svgrepo-com.svg" alt="marker Icon" />
            </button>
          </Marker>
          
        ))}

        {(selectedLoc && insideCircle(location,{lat:selectedLoc.geometry.coordinates[1],lon:selectedLoc.geometry.coordinates[0]},radius)
)  ? (  <Mint/>) : null}
        <GeolocateControl
          style={{ float: "left", margin: "50px", padding: "10px" }}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          onGeolocate={() => {
            setUserLocation({
              ...userLocation,
              latitude: loc.coords.latitude,
              longitude: loc.coords.longitude,
            });
          }}
        />
        </ReactMapGL>
    </div>
    
  );
};

export default App;



// insideCircle(location,{lat:selectedLoc.geometry.coordinates[1],lon:selectedLoc.geometry.coordinates[0]},radius);
