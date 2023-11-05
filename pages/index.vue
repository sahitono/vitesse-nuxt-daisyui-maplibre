<script setup lang="ts">
import {Map as MglMap} from "maplibre-gl"
import {onMapLoad} from "~/composables/maplibre-helper/onMapLoad";
const online = useOnline()

const mapId = "map"
onMounted(async () => {
  const map = new MglMap({
    container: mapId,
    style: {
      version: 8,
      center: [117.2, -3.2],
      zoom: 4,
      layers: [],
      sources: {},
      glyphs: "https://fontstack-pbf.supermap.id/{fontstack}/{range}.pbf"
    },
    antialias: true,
    preserveDrawingBuffer: true
  })

  await onMapLoad(map)

  map.addSource("OSM", {
    type: "raster",
    tileSize: 256,
    tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"]
  })
  map.addLayer({
    id: "OSM",
    type: "raster",
    source: "OSM",
  })
})
</script>

<template>
  <div class="map-container relative w-full h-full">
    <div class="tools absolute z-100 w-full">
      <div class="navbar bg-base-100 w-full">
        test
      </div>
    </div>
    <div id="map" class="map w-full h-full"></div>
  </div>

</template>


<style>
@import "maplibre-gl/dist/maplibre-gl.css";
</style>
