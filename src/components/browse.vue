<template>
    <div class="google-map" :id="mapName">
    </div>
</template>
<script>
export default {
    name: 'google-map',
    props: ['name'],
    data: function() {
        return {
            mapName: this.name + "-map",
            markerCoordinates: [{
                latitude: 29.9511,
                longitude: -90.0715
            }],
            map: null,
            bounds: null,
            markers: [],
        }
    },

    mounted: function() {
        this.bounds = new google.maps.LatLngBounds();
        const element = document.getElementById(this.mapName)
        const mapCentre = this.markerCoordinates[0]
        const options = {
            center: new google.maps.LatLng(mapCentre.latitude, mapCentre.longitude)
        }
        this.map = new google.maps.Map(element, options);

        this.$http.get('http://61e83bf3.ngrok.io/browse')
            .then(function(response) {
                let arr = []
                response.body.forEach(function(element) {
                    let tempLat = element.LocationLat;
                    let tempLong = element.LocationLng;
                    console.log(element, tempLat, tempLong)
                    arr.push({ latitude: tempLat, longitude: tempLong })
                    console.log({ latitude: tempLat, longitude: tempLong })
                });
                arr.forEach((coord) => {
                    const position = new google.maps.LatLng(coord.latitude, coord.longitude);
                    const marker = new google.maps.Marker({
                        position,
                        map: this.map
                    });
                    this.markers.push(marker)
                    this.map.fitBounds(this.bounds.extend(position))

                });


            })




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
};
</script>
<style scoped>
.google-map {
    width: 800px;
    height: 600px;
    margin: 0 auto;
    background: gray;
}
</style>