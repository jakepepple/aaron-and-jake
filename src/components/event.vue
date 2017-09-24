<template>
    <b-container id="Event">
        <b-row>
            <b-col>
                <div cols='8' id="app">
                    <b-btn id="show-modal" @click="showModal = true">Event Chat</b-btn>
                    
    <button id="request" @click="makeRequest(event.Name)">Request to be Added to Party</button>

                    <chat v-if="showModal" v-bind:event='event' @close="showModal = false">
                        <h3 slot="header">{{event.Name}}</h3>
                    </chat>
                </div>
                <p>Party Name: {{event.Name}}</p>
                <p>Host: {{event.Host}}</p>
                <p>Address: {{event.Address}}</p>
                <p>Time: {{event.Time}}</p>
                <p>Recipe: {{meal.label}}</p>
                <ul>
                    <li v-for="Ingredient in meal.ingredientLines" v-bind:key="Ingredient.id">{{Ingredient}}</li>
                </ul>
                
                

            </b-col>
            <b-col>
                <template>
                    <div class="google-map" :id="mapName">
                    </div>
                </template>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
// Imports
import chat from './chatBox.vue';
import mapMarkerData from './marker.vue';
export default {
    components: {
        chat: chat,
        mapMarkerData: mapMarkerData,
    },
    name: 'google-map',
    props: ['event'],
    data() {
        return {
            meal: '',
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
            maxZoom: 16,
        }
        this.map = new google.maps.Map(element, options);




        this.markerCoordinates.forEach((coord) => {
            console.log(coord)
            const position = new google.maps.LatLng(coord.latitude, coord.longitude);

            var contentString =
                '<div>' +
                '<h2>' + `${this.event.Name}` + '</h2>' +
                '<p>' + 'Host: ' + `${this.event.Host}` + '</p>' +
                '<p>' + 'Address: ' + `${this.event.Address}` + '</p>' +
                '</div>'



            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });


            var marker = new google.maps.Marker({
                position,
                map: this.map,
                title: this.event.name
            });
            marker.addListener('click', function() {
                infowindow.open(this.map, marker);
            });
            this.markers.push(marker)
            this.map.fitBounds(this.bounds.extend(position))
        });


    },
    created() {
        this.$http.get('https://api.edamam.com/search?r=http://www.edamam.com/ontologies/edamam.owl%23' + this.event.RecipeID,
            {
                headers: {
                    app_id: 'e4a1bc0f',
                    app_key: '19aa09f1b7b01b5afa733a72bdef0873',
                }
            }).then(function(response) {
                this.meal = response.body[0]
            });
            
        },
    methods: {
        makeRequest: function(name) {
            this.$http.post('/request', {
                name: name,
            }).then(function(response) {
                console.log(response);
            })
        }
    }
}
</script>

<style scoped>
.google-map {
    width: 500px;
    height: 400px;
    margin: 0 auto;
    background: gray;
}
</style>