<template>
  <Page class="page">
    <ActionBar class="action-bar" title="Home">
      <NavigationButton @tap="onTapHome" android.systemIcon="ic_menu_home" />
      <ActionItem @tap="navigateTo(counter)" text="Details" android.position="popup" icon="res://baseline_account_circle_black_36"/>
      <ActionItem @tap="navigateTo(Counter)" text="Subscriptions" android.position="popup" icon="res://baseline_account_circle_black_36"/>
      <ActionItem @tap="logout()" text="Log Out" android.position="popup" icon="res://baseline_account_circle_black_36"/>
    </ActionBar>

    <SegmentedBar selectedIndex="0"
      @selectedIndexChange="onSelectedIndexChange($event)" selectedBackgroundColor="black">
      <SegmentedBarItem title="First" />
      <SegmentedBarItem title="Second" />
      <SegmentedBarItem title="Third" />
    </SegmentedBar>
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

  export default {
    data () {
      return {
        listOfItems: ["First", "Second", "Third"],
      };
    },
    computed: {
      ...mapGetters({
        getToken: 'getToken'
      })
    },
    methods: {
      ...mapActions([
      ]),
      onSelectedIndexChange(args){
        let picker = args.object;
        console.log(picker.selectedIndex);
      },
      setVisibility(){
        let documentId = appSettings.getString("documentId","null");
        if (documentId==="null"){
          this.loginVisibility = "visible";
          this.mainVisibility = "collapse";
        } else {
          this.mainVisibility = "visible";
          this.loginVisibility = "collapse";
        };
      },
      navigateTo(page) {
        console.log("navigateTo ran")
        this.$navigateTo(page);
        console.log("navigateTo finished")
      },
    },
    created(){
    }
  }
</script>

<style scoped>
  .hello-world {
    margin: 20;
  }
  .btn btn-info btn-lg {
    background-color: #3993CC;
  }
  .SegmentedBar {

  }
  .SegmentedBarItem {
  }
  Button {

    borderColor: #BABABA;
  }

  Label {
    font-size: 24;
  }
</style>
