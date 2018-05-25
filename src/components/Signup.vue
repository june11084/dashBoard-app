<template>
  <Page class="page">
    <ActionBar class="action-bar" title="Home">
      <NavigationButton @tap="onTapHome" android.systemIcon="ic_menu_home" />
      <ActionItem @tap="navigateTo(counter)" text="Details" android.position="popup" icon="res://baseline_account_circle_black_36"/>
      <ActionItem @tap="navigateTo(Counter)" text="Subscriptions" android.position="popup" icon="res://baseline_account_circle_black_36"/>
      <ActionItem @tap="logout()" text="Log Out" android.position="popup" icon="res://baseline_account_circle_black_36"/>
    </ActionBar>
    <StackLayout>
      <SegmentedBar class="tabView" :selectedIndex="selectedIndex" @selectedIndexChanged="onSelectedIndexChanged($event)" width="60%" selectedBackgroundColor="#000000"  >
        <SegmentedBarItem  class="font-awesome-circle" :title="'\uf111'"/>
        <SegmentedBarItem  class="font-awesome-circle" :title="'\uf111'"/>
        <SegmentedBarItem  class="font-awesome-circle" :title="'\uf111'"/>
      </SegmentedBar>
      <StackLayout class="tabs" :visibility="tab1Visibility">
        <Label text="Content for Tab 1"/>
        <Button @tap="nextPage()" text="Next" class="btn btn-outline"/>
      </StackLayout>
      <StackLayout class="tabs" :visibility="tab2Visibility">
        <Label text="Content for Tab 2"/>
        <Button @tap="nextPage()" text="Next" class="btn btn-outline"/>
      </StackLayout>
      <StackLayout class="tabs" :visibility="tab3Visibility">
        <Label text="Content for Tab 3"/>
        <Button @tap="$navigateBack" text="Finish" class="btn btn-outline"/>
      </StackLayout>
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

  export default {
    data () {
      return {
        listOfItems: ["First", "Second", "Third"],
        tab1Visibility: "visible",
        tab2Visibility: "collapse",
        tab3Visibility: "collapse",
        selectedIndex: 0
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
      nextPage(){
        this.selectedIndex++;
      },
      onSelectedIndexChanged(args){
        let picker = args.object;
        console.log(picker.selectedIndex)
        this.selectedIndex = picker.selectedIndex;
        this.setVisibility(this.selectedIndex);
      },
      setVisibility(selectedIndex){
        if(selectedIndex===0){
          this.tab1Visibility = "visible";
          this.tab2Visibility = "collapse";
          this.tab3Visibility = "collapse";
        } else if(selectedIndex===1){
          this.tab2Visibility = "visible";
          this.tab1Visibility = "collapse";
          this.tab3Visibility = "collapse";
        } else if(selectedIndex===2){
          this.tab2Visibility = "collapse";
          this.tab1Visibility = "collapse";
          this.tab3Visibility = "visible";
        } else {}
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
  .font-awesome-circle {
    border-color: #FFFFFF;
    font-family: 'fa-solid-900';
    font-size: 15;
  }
  .tabView {
    border-color: #FFFFFF;
    background-color: transparent;
  }

  @keyframes example {
    from {background-color: red;}
    to {background-color: yellow;}
  }
  .tabs {
    animation-name: example;
    animation-duration: 4s;
  }
  Button {
    borderColor: #BABABA;
  }

  Label {
    font-size: 24;
  }
</style>
