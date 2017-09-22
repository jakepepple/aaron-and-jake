<template>
    <div id="Event">
        <div id="app">
            <button id="show-modal" @click="showModal = true">Show Modal</button>
            <chat v-if="showModal" v-bind:event='event' @close="showModal = false">
              
                <h3 slot="header">{{event.Name}}</h3>
            </chat>
        </div>
        <p>Host: {{event.Host}}</p>
        <p>Party Name: {{event.Name}}</p>
        <p>Reciepe: {{event.RecipeID}}</p>
        <p>Lat: {{event.LocationLat}}</p>
        <p>Lng: {{event.LocationLng}}</p>
        <p>Time: {{event.Time}}</p>
        <template>
            <div class="google-map" :id="mapName">
            </div>
</template>

       
    </div>
</template>

<script>
// Imports
import chat from './chatBox.vue';
export default {
    components: {
        chat: chat,
    },
    name: 'google-map',
    props: ['event'],
    data() {
        return {
            mapName: this.name + "-map",
            markerCoordinates: [{
                latitude: this.event.LocationLat,
                longitude: this.event.LocationLng,
            }],
            map: null,
            bounds: null,
            markers: [],
            showModal: false,
            data: {
                name: 'test Page'
            }


        }
    },
    mounted: function() {
        this.bounds = new google.maps.LatLngBounds();
        const element = document.getElementById(this.mapName)
        const mapCentre = this.markerCoordinates[0]
        const options = {
            center: new google.maps.LatLng(mapCentre.latitude, mapCentre.longitude),
            zoom: -50,
        }
        this.map = new google.maps.Map(element, options);




        this.markerCoordinates.forEach((coord) => {
            const position = new google.maps.LatLng(coord.latitude, coord.longitude);
            const marker = new google.maps.Marker({
                position,
                map: this.map
            });
            this.markers.push(marker)
            this.map.fitBounds(this.bounds.extend(position))
        });


    }

}
</script>

<style scoped>
.google-map {
    width: 300px;
    height: 300px;
    margin: 0 auto;
    background: gray;
}

</style>