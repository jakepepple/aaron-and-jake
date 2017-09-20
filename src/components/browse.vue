<template>
    <div id="Browse">
        <gmap-map
    :center="center"
    :zoom="7"
    style="width: 500px; height: 300px"
  >
    
  </gmap-map>
       
    </div>
</template>

<script>
// Imports
import maps from '../../node_modules/vue2-google-maps/dist/components/map.vue'
import marker from '../../node_modules/vue2-google-maps/dist/components/map.vue'


export default {
    components:{
        'gmapMap':maps,
        'gmapMarker': marker  


    },
    data () {
        return {
            center: {lat: 10.0, lng: 10.0},
        markers: [{
          position: {lat: 10.0, lng: 10.0}
        }, {
          position: {lat: 11.0, lng: 11.0}
        }]
            
            
        }
    },
    
}
</script>

<style>

</style>