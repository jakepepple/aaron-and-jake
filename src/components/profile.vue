<template>
    <b-container>
       
						
        <b-row>
            <div class="col-lg-12 col-sm-6">
                <div class="card hovercard">
                    <div class="card-background">
                        <img class="card-bkimg" alt="" src="https://scontent-dft4-3.xx.fbcdn.net/v/t1.0-9/10447708_10105496802291065_3147331436798292945_n.jpg?oh=ff797fce9d955f7447e90ee529022d1c&oe=5A420D4C">
                    </div>
                    <div class="useravatar">
                        <img alt="" src="http://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?k=6&m=476085198&s=612x612&w=0&h=5cDQxXHFzgyz8qYeBQu2gCZq1_TN0z40e_8ayzne0X0=">
                    </div>
                    <div class="card-info">
                        <span class="card-title">{{this.data.profileName}}</span>
                    </div>
                </div>
            </div>
        </b-row>
        <b-row>
            <!-- profile info -->
            <b-col cols="9" class="info">
                <p>
                    <span class="title">Email:</span> {{this.data.profileEmail}}</p>
                <p>
                    <span class="title">Current City:</span> {{this.data.profileCity}}</p>
                <p>
                    <span class="title">Date of birth:</span> {{this.data.birthday}}</p>
                <p>
                    <span class="title">Host Rating:</span> {{this.data.profileHR}}</p>
                <p>
                    <span class="title">Guest Rating:</span> {{this.data.profileCR}}</p>
            </b-col>
            <b-col class='profile-buttons'>
                <h4>Notifications:</h4>
                <ul>
                    <li v-for="(notification, index) in this.data.notifications" v-bind:notification="notification">
                        {{notification}}
                         <br>
                        <b-button id="approve" @click="approveRequest(notification, index)">Approve this request</b-button> 
                    </li>
                </ul>

                <h4 v-if="!showEvent">Events:</h4>
                <b-btn v-if="showEvent" v-on:click='showEvent = !showEvent'> Close Event</b-btn>
                <ul v-if="!showEvent">
                    <li v-for="event in this.data.events" v-bind:key="event.id" v-on:click="sEvent(event)">{{event.Name}}</li>
                </ul>
            </b-col>
        </b-row>
        <b-row>
            <eventdiv v-if="showEvent" v-bind:event="event"></eventdiv>
        </b-row>
         

    </b-container>
</template>

<script>
// Imports
import eventdiv from './event.vue'
export default {
    components: {
        eventdiv: eventdiv,
    },
    data() {
        return {
            event: '',
            showEvent: false,
            data: {
                profileName: '',
                profileCity: '',
                profileEmail: '',
                profileHR: '',
                profileCR: '',
                birthday: '',
                notifications: '',
                notificationData: [],
                events: [],
            }


        }
    },
    mounted: function() {
        this.$http.get('/profile')
            .then(function(response) {
                this.data.profileName = response.body.Name;
                this.data.profileCity = response.body.City;
                this.data.profileEmail = response.body.Email;
                this.data.profileHR = response.body.hostRating;
                this.data.profileCR = response.body.contributorRating;
                this.data.birthday = response.body.Birthday;
            }, (err) => {
                this.$router.push('/login');
            });
        this.$http.get('/userevents')
            .then(function(response) {
                this.data.events = response.body;
            }, (err) => {
                this.$router.push('/login');
            })
        this.$http.get('/notifications')
            .then(function(response) {
                console.log(response.body);
                let notificationDataPairs = [];
                const notifications = response.body;
                const formattedNotifications = notifications.map((notification) => {
                    let split = notification.split(':');
                    notificationDataPairs.push(split);
                    return `${split[1]} wants to join your ${split[0]} party!`
                })
                console.log(formattedNotifications);
                this.data.notificationData = notificationDataPairs;
                this.data.notifications = formattedNotifications || 'No notifications for now!';
            })
    },
    methods: {
        sEvent(clickedEvent) {
            this.event = clickedEvent
            this.showEvent = !this.showEvent;
        },
        approveRequest(notification, index) {
            console.log('approve:', this.data.notificationData[index]);
            const data = this.data.notificationData[index];
            this.$http.post('/approve', {
                eventName: data[0],
                approvedUser: data[1],
            }).then((response) => {
                this.data.notifications.splice(index, 1);
                this.data.notificationData.splice(index, 1);
            }).catch((err) => {
                console.log('error approving request');
            })

        }

    }
}
</script>

<style scoped>
.card {
    margin-top: 20px;
    padding: 30px;
    background-color: rgba(214, 224, 226, 0.2);
    -webkit-border-top-left-radius: 5px;
    -moz-border-top-left-radius: 5px;
    border-top-left-radius: 5px;
    -webkit-border-top-right-radius: 5px;
    -moz-border-top-right-radius: 5px;
    border-top-right-radius: 5px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

.card.hovercard {
    position: relative;
    padding-top: 0;
    overflow: hidden;
    text-align: center;
    background-color: #fff;
    background-color: rgba(255, 255, 255, 1);
}

.card.hovercard .card-background {
    height: 130px;
}

.card-background img {
    -webkit-filter: blur(25px);
    -moz-filter: blur(25px);
    -o-filter: blur(25px);
    -ms-filter: blur(25px);
    filter: blur(25px);
    margin-left: -100px;
    margin-top: -200px;
    min-width: 130%;
}

.card.hovercard .useravatar {
    position: absolute;
    top: 15px;
    left: 0;
    right: 0;
}

.card.hovercard .useravatar img {
    width: 100px;
    height: 100px;
    max-width: 100px;
    max-height: 100px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    border: 5px solid rgba(255, 255, 255, 0.5);
}

.card.hovercard .card-info {
    position: absolute;
    bottom: 14px;
    left: 0;
    right: 0;
}

.card.hovercard .card-info .card-title {
    padding: 0 5px;
    font-size: 20px;
    line-height: 1;
    color: #262626;
    background-color: rgba(255, 255, 255, 0.1);
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
}

.card.hovercard .card-info {
    overflow: hidden;
    font-size: 12px;
    line-height: 20px;
    color: #737373;
    text-overflow: ellipsis;
}

.card.hovercard .bottom {
    padding: 0 20px;
    margin-bottom: 17px;
}

.btn-pref .btn {
    -webkit-border-radius: 0 !important;
}




/* body {
    margin-top: 20px;
}

.profile {
    width: 100%;
    position: relative;
    background: #FFF;
    border: 1px solid #D5D5D5;
    padding-bottom: 5px;
    margin-bottom: 20px;
}

.profile .image {
    display: block;
    position: relative;
    z-index: 1;
    overflow: hidden;
    text-align: center;
    border: 5px solid #FFF;
}

.profile .user {
    position: relative;
    padding: 0px 5px 5px;
}

.profile .user .avatar {
    position: absolute;
    left: 20px;
    top: -85px;
    z-index: 2;
}

.profile .user h2 {
    font-size: 16px;
    line-height: 20px;
    display: block;
    float: left;
    margin: 4px 0px 0px 135px;
    font-weight: bold;
}

.profile .user .actions {
    float: right;
}

.profile .user .actions .btn {
    margin-bottom: 0px;
}

.profile .info {
    float: left;
    margin-left: 20px;
}

.img-profile {
    height: 100px;
    width: 100px;
}

.img-cover {
    width: 800px;
    height: 300px;
}

@media (max-width: 768px) {
    .btn-responsive {
        padding: 2px 4px;
        font-size: 80%;
        line-height: 1;
        border-radius: 3px;
    }
}

@media (min-width: 769px) and (max-width: 992px) {
    .btn-responsive {
        padding: 4px 9px;
        font-size: 90%;
        line-height: 1.2;
    }
} */
</style>