import { useSelector } from 'react-redux'
import {
  ScatterplotLayer,
  LineLayer,
  SimpleMeshLayer,
  ArcLayer
} from "deck.gl";
import { OBJLoader } from '@loaders.gl/obj'
import store from '../store/store'
import { selectAllStations } from '../reducers/stationsSlice'
import { selectAllRailways } from '../reducers/railwaysGraph'
import { selectAllTrains } from '../reducers/trainsSlice'
import { getAllSelected } from '../reducers/selectedTrains'
import selectedTrains from '../reducers/selectedTrains'
import { isMapVisible } from '../reducers/mapVisibility'

const getWagonsWays = (st) => {

  const wagonsWays = []

  st.forEach(t => {
    t.wagons.forEach(w => {
      let ww = {
        disl: t.disl,
        dest: w.dest,
        color: t.color
      }
      wagonsWays.push(ww)
    })
  });

  return wagonsWays
}

export function renderLayers() {

  const layers = []

  const stations = useSelector(selectAllStations)
  const railways = useSelector(selectAllRailways)
  const trains = useSelector(selectAllTrains)
  const selected = useSelector(getAllSelected)
  const ways = getWagonsWays(selected)
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

  const selectedLayer = new LineLayer({
    id: 'selected-layer',
    data: selected,
    pickable: true,
    getWidth: 2,
    getSourcePosition: d => {
      let s = stations.find(i => i.id === d.disl)
      return [s.lon, s.lat]
    },
    getTargetPosition: d => {
      let s = stations.find(i => i.id === d.dest)
      return [s.lon, s.lat]
    },
    getColor: d => d.color
  });

  const destinationLayer = new ScatterplotLayer({
    id: "destination-layer",
    data: selected,
    pickable: true,
    opacity: 0.8,
    stroked: true,
    filled: true,
    radiusScale: 6,
    radiusMinPixels: 1,
    lineWidthMinPixels: 1,
    getPosition: d => {
      let s = stations.find(i => i.id === d.dest)
      return [s.lon, s.lat]
    },
    getRadius: 5000,
    getFillColor: d => d.color,
    getLineColor: [0, 0, 0]
  })

  const wagonsLayer = new ArcLayer({
    id: 'arc-layer',
    data: ways,
    pickable: true,
    getWidth: 3,
    getSourcePosition: d => {
      let s = stations.find(i => i.id === d.disl)
      return [s.lon, s.lat]
    },
    getTargetPosition: d => {
      let s = stations.find(i => i.id === d.dest)
      return [s.lon, s.lat]
    },
    getSourceColor: d => d.color,
    getTargetColor: d => d.color,
  });

  if (stationsLayerVisibility) layers.push(stationsLayer)

  layers.push(trainsLayer)
  layers.push(selectedLayer)
  layers.push(destinationLayer)
  layers.push(wagonsLayer)

  return layers
}
