import { useSelector } from 'react-redux'
import {
  ScatterplotLayer,
  LineLayer,
  SimpleMeshLayer
} from "deck.gl";
import {OBJLoader} from '@loaders.gl/obj'
import store from '../store/store'
import { selectAllStations } from '../reducers/stationsSlice'
import { selectAllRailways } from '../reducers/railwaysGraph'
import { selectAllTrains } from '../reducers/trainsSlice'
import selectedTrains from '../reducers/selectedTrains'
import { isMapVisible } from '../reducers/mapVisibility';

export function renderLayers() {

  const layers = []

  const stations = useSelector(selectAllStations)
  const railways = useSelector(selectAllRailways)
  const trains = useSelector(selectAllTrains)
  const stationsLayerVisibility = useSelector(isMapVisible)

  const stationsLayer = new ScatterplotLayer({
    id: "stations-layer",
    data: stations,
    pickable: true,
    opacity: 0.8,
    stroked: true,
    filled: true,
    radiusScale: 6,
    radiusMinPixels: 1,
    radiusMaxPixels: 100,
    lineWidthMinPixels: 1,
    getPosition: d => [d.lon, d.lat],
    getRadius: d => 20,
    getFillColor: d => [192, 192, 192],
    getLineColor: d => [80, 80, 80]
  })

  const trainsLayer = new SimpleMeshLayer({
    id: 'trains-layer',
    data: trains,
    mesh: 'data/loco/loco1.obj',
    texture: 'data/loco/train_traxx_f140.png',
    sizeScale: 10000,
    loaders: [OBJLoader],
    pickable: true,
    getOrientation: d => [0, 90, 90],
    getColor: d => [192, 192, 192],
    getPosition: d => {
      let s = stations.find(i => i.id === d.disl)
      return [s.lon, s.lat]
    },
    onClick: (info) => {
      store.dispatch(selectedTrains.actions.setSelected(info.object))
    }
  })

  const railwaysLayer = new LineLayer({
    id: 'railways-layer',
    data: railways,
    pickable: true,
    getWidth: 2,
    getSourcePosition: d => [d.lon1, d.lat1],
    getTargetPosition: d => [d.lon2, d.lat2],
    getColor: d => [192, 192, 192]
  });

  //console.log(stationsLayerVisibility)

  if (stationsLayerVisibility) layers.push(stationsLayer)

  layers.push(trainsLayer)

  return layers
}
