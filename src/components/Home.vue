<template>
  <Page class="page">
    <ActionBar class="action-bar" title="Home">
      <ActionItem @tap="onTapShare"
      ios.systemIcon="9" ios.position="left"
      android.systemIcon="ic_menu_share" android.position="left" />
    </ActionBar>
    <StackLayout>
      <FlexboxLayout flexDirection="row" justifyContent="center">
        <Button @tap="decrement" text="-" class="btn btn-outline"/>
        <Label :text="message" alignSelf="baseline" class="h2"/>
        <Button @tap="login()" text="+" class="btn btn-outline"/>
      </FlexboxLayout>
      <Image v-if="surprise" src="~/images/NativeScript-Vue.png"/>
      <ListPicker :items="listOfItems" selectedIndex="0" backgroundColor="#9AB2AC"
          @selectedIndexChange="selectedIndexChanged($event)" v-model="selectedItem">
      </ListPicker>
      <Label :text="getStoredToken" alignSelf="baseline" class="h2"/>
      <Button @tap="takePicture" text="Camera" class="btn btn-outline"/>
      <Button @tap="login()" text="Login" class="btn btn-outline" :visibility="loggedIn"/>
    </StackLayout>
    <RadSideDrawer ref="drawer" drawerTransition="SlideAlongTransition">
      <StackLayout ~drawerContent class="sideStackLayout">
          <StackLayout class="sideTitleStackLayout">
              <Label text="Navigation Menu"></Label>
          </StackLayout>
          <StackLayout class="sideStackLayout">
              <Button text="Primary" class="sideButton sideLightGrayButton"></Button>
              <Button text="Social" class="sideButton"></Button>
              <Button text="Promotions" class="sideButton"></Button>
              <Button text="Buttons" class="sideButton sideLightGrayButton"></Button>
              <Button text="Important" class="sideButton"></Button>
              <Button text="Starred" class="sideButton"></Button>
              <Button text="Sent Mail" class="sideButton"></Button>
              <Button text="Drafts" class="sideButton"></Button>
          </StackLayout>
          <Label text="Close Drawer" color="lightgray" padding="10" style="horizontal-align: left" @tap="onCloseDrawerTap"></Label>
      </StackLayout>
      <StackLayout ~mainContent>
          <!-- <Label textWrap="true" :text="drawerContentText"></Label> -->
          <Button text="OPEN DRAWER" @tap="openDrawer" class="drawerContentButton"></Button>
      </StackLayout>
    </RadSideDrawer>
  </Page>
</template>

<script>
  import { mapActions } from 'vuex';
  import { mapGetters } from 'vuex';
  import axios from 'axios';
  import VueAxios from 'vue-axios';
  import Counter from './Counter';
  import * as camera from "nativescript-camera";
  import { Image } from "ui/image";
  import * as couchbase from "nativescript-couchbase";
  import * as appSettings from 'application-settings';
  export default {
    data () {
      return {
        surprise: false,
        drawerContentText:""
      };
    },
    methods: {
      openDrawer() {
            this.$refs.drawer.nativeView.showDrawer();
        },
      onCloseDrawerTap() {
        this.$refs.drawer.nativeView.closeDrawer();
      },
      onTapShare(){
        this.$refs.drawer.nativeView.showDrawer();
      }
    },
    created(){
       this.drawerContentText = "SideDrawer for NativeScript can be easily setup in the HTML definition of your page by defining tkDrawerContent and tkMainContent. The component has a default transition and position and also exposes notifications related to changes in its state. Swipe from left to open side drawer."
    }
  };
</script>

<style scoped>
  .hello-world {
    margin: 20;
  }

  Label {
    font-size: 24;
  }
</style>
