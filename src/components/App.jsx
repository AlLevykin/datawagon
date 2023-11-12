import * as React from 'react'
import {
  Map
} from 'react-map-gl/maplibre'
import DeckGL from '@deck.gl/react'
import ControlPanel from './ControlPanel.jsx'
import { renderLayers } from './RenderLayers.jsx'

import 'maplibre-gl/dist/maplibre-gl.css'

const App = () => {
  return (
    <div className="App" onContextMenu={(e)=> e.preventDefault()}>
      <DeckGL
        initialViewState={{
          latitude: 60,
          longitude: 90,
          zoom: 3.2,
          pitch: 50
        }}
        controller={true}
        style={{ width: '100vw', height: '100vh' }}
        layers={renderLayers()}
      >
        <Map
          reuseMaps
          preventStyleDiffing={true}
          mapStyle="https://api.maptiler.com/maps/ab7abb68-d5a3-4ee0-ac30-08cc4cc71d8b/style.json?key=QdHkCeM7GRUjTjT3X9Ru"
        >
        </Map>
      </DeckGL>
      <ControlPanel />
    </div>
  );
};

export default App;
