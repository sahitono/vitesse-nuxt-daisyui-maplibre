import type { MapLibreEvent, Map as Mapl } from "maplibre-gl"

/**
 * Await map load with promise
 * @param map
 * @returns {Promise<MapLibreEvent>} maplibre event
 */
export function onMapLoad(map: Mapl): Promise<MapLibreEvent> {
  return new Promise((resolve, reject) => {
    map.on("load", (e) => {
      if (e == null) {
        reject(new Error("failed to load map"))
      }

      resolve(e)
    })
  })
}
