<template>
  <Page class="page" backgroundImage="res://real">
    <ActionBar class="action-bar" title="Home">
      <NavigationButton @tap="$navigateBack" android.systemIcon="ic_menu_back" />
    </ActionBar>
      <StackLayout verticalAlignment="middle">
        <GridLayout columns="1*, 1*, 1*" rows="120, 120">
          <Button @tap="navigateTo(listings)" class="btn btn-info btn-lg" text="Listings" row="0" col="0" margin="15"/>
          <Button @tap="navigateTo(profile)" class="btn btn-info btn-lg" text="Profile" row="0" col="1" margin="15"/>
          <Button @tap="navigateTo(portfolio)" class="btn btn-info btn-lg" text="Portfolio Site"row="0" col="2" margin="15"/>
          <Button @tap="navigateTo(google)" class="btn btn-info btn-lg" text="Google" row="1" col="0" margin="15"/>
          <Button @tap="navigateTo(facebook)" class="btn btn-info btn-lg" text="Facebook" row="1" col="1" margin="15"/>
          <Button @tap="navigateTo(instagram)" class="btn btn-info btn-lg" text="Instagram" row="1" col="2" margin="15"/>
        </GridLayout>
      </StackLayout>
  </Page>
</template>

<script>
  import { mapActions } from 'vuex';
  import { mapGetters } from 'vuex';
  import axios from 'axios';
  import VueAxios from 'vue-axios';
  import * as camera from "nativescript-camera";
  import { Image } from "ui/image";
  import * as couchbase from "nativescript-couchbase";
  import * as appSettings from 'application-settings';
  import Counter from './Counter';
  import Profile from './Profile';
  import Facebook from './Facebook';
  import Google from './Google';
  import Listings from './Listings';
  import Portfolio from './Portfolio';
  import Instagram from './Instagram';
  import Contact from './Contact';
  import Notifications from './Notifications';
  import Signup from './Signup';
  import Agreement from './Agreement';
  export default {
    data () {
      return {
        surprise: false,
        drawerContentText: "",
        loginVisibility: "",
        mainVisibility: "",
        counter: Counter,
        profile: Profile,
        facebook: Facebook,
        google: Google,
        listings: Listings,
        portfolio: Portfolio,
        instagram: Instagram,
        contact: Contact,
        notifications: Notifications,
        signUp: Signup,
        agreement: Agreement
      };
    },
    computed: {
      ...mapGetters({
        listOfItems: 'allResults',
        getToken: 'getToken'
      })
    },
    methods: {
      ...mapActions([
        'decrement',
        'increment',
        'callLoginApi',
        'takePicture',
        'navigateTo',
        'setToken'
      ]),
      signUp(){
      },
      navigateTo(page) {
        console.log("navigateTo ran")
        this.$navigateTo(page);
        console.log("navigateTo finished")
      },
      takePicture(){
        camera.requestPermissions();
        camera.takePicture().
        then((imageAsset) => {
          console.log("Result is an image asset instance");
          var image = new Image();
          image.src = imageAsset;
        }).catch((err) => {
          console.log("Error -> " + err.message);
        });
      },
      selectedIndexChanged(args){
        let picker = args.object;
        let object = picker.items.getObject(this.selectedItem);
        if(object){
         console.log(object.id);
        }
        //console.log("picker selection: " + picker.items[picker.selectedIndex].id);
        console.log("picker selection: " + this.selectedItem);
      },
    },
    created(){
    }
  };
</script>

<style scoped>
  .hello-world {
    margin: 20;
  }
  .btn btn-info btn-lg {
    background-color: #3993CC;
  }
  .btn {
    background-color: rgb(208, 225, 225, 0.7);
  }
  Button {

    borderColor: #BABABA;
  }

  Label {
    font-size: 24;
  }
</style>
