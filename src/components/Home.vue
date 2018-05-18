<template>
  <Page class="page">
    <ActionBar class="action-bar" title="Home">
      <NavigationButton @tap="onTapHome" android.systemIcon="ic_menu_home" />
      <ActionItem @tap="navigateTo(counter)" text="Details" android.position="popup" icon="res://baseline_account_circle_black_36"/>
      <ActionItem @tap="navigateTo(Counter)" text="Subscriptions" android.position="popup" icon="res://baseline_account_circle_black_36"/>
      <ActionItem @tap="logout()" text="Log Out" android.position="popup" icon="res://baseline_account_circle_black_36"/>
    </ActionBar>
    <RadSideDrawer ref="homeDrawer" >
      <StackLayout ~drawerContent class="sideStackLayout">
        <StackLayout class="sideTitleStackLayout">
            <Label text="Home"></Label>
        </StackLayout>
        <StackLayout class="sideStackLayout">
            <Button @tap="navigateTo(profile)" text="Profile" class="sideButton sideLightGrayButton"/>
            <Button @tap="navigateTo(portfolio)" text="Portfolio Site" class="sideButton"/>
            <Button @tap="navigateTo(listings)" text="Listings" class="sideButton"/>
            <Button @tap="navigateTo(google)" text="Google" class="sideButton sideLightGrayButton"/>
            <Button @tap="navigateTo(facebook)" text="Facebook" class="sideButton"/>
            <Button @tap="navigateTo(instagram)" text="Instagram" class="sideButton"/>
            <Button @tap="navigateTo(contact)" text="Contact Us" class="sideButton"/>
            <Button @tap="navigateTo(notifications)" text="Notifications" class="sideButton"/>
        </StackLayout>
        <Label text="Close" color="lightgray" padding="10" style="horizontal-align: left" @tap="onCloseHomeDrawerTap"></Label>
      </StackLayout>
      <StackLayout ~mainContent>
        <StackLayout :visibility="loginVisibility">
          <Label text="Please Log In" alignSelf="center" textAlignment="center" class="h2"/>
          <Button @tap="login()" text="Login" class="btn btn-outline"/>
          <Button @tap="navigateTo(signUp)" text="Sign Up" class="btn btn-outline"/>
        </StackLayout>
        <StackLayout :visibility="mainVisibility">
          <GridLayout columns="1*, 1*, 1*" rows="120, 120">
            <Button @tap="navigateTo(listings)" class="btn btn-info btn-lg" text="Listings" row="0" col="0" margin="15"/>
            <Button @tap="navigateTo(profile)" class="btn btn-info btn-lg" text="Profile" row="0" col="1" margin="15"/>
            <Button @tap="navigateTo(portfolio)" class="btn btn-info btn-lg" text="Portfolio Site"row="0" col="2" margin="15"/>
            <Button @tap="navigateTo(google)" class="btn btn-info btn-lg" text="Google" row="1" col="0" margin="15"/>
            <Button @tap="navigateTo(facebook)" class="btn btn-info btn-lg" text="Facebook" row="1" col="1" margin="15"/>
            <Button @tap="navigateTo(instagram)" class="btn btn-info btn-lg" text="Instagram" row="1" col="2" margin="15"/>
          </GridLayout>
          <Label :text="getStoredToken" alignSelf="center" textAlignment="center" class="h2"/>
        </StackLayout>
        <ActivityIndicator busy="false" @busyChange="onBusyChanged" />
      </StackLayout>
    </RadSideDrawer>
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
        signUp: Signup
      };
    },
    computed: {
      getStoredToken(){
        let db = new couchbase.Couchbase("database");
        let documentId = appSettings.getString("documentId","null");
        console.log(documentId)
        if (documentId==="null"){
          console.log("documentId is undefined")
          console.log(this.$store.state.service.apiToken)
          this.notloggedIn = "visible";
          return this.$store.state.service.apiToken;
        } else {
          let person = db.getDocument(documentId);
          console.log("documentId is defined")
          this.loggedIn = "visible";
          this.setToken(person.token);
          return "Token: " + person.token;
        };
      },
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
      logout(){
        let db = new couchbase.Couchbase("database");
        let documentId = appSettings.getString("documentId","null");
        db.deleteDocument(documentId);
        appSettings.clear();
        this.setVisibility();
        console.log("logged out")
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
      createDB(firstname, lastname, token){
        let db = new couchbase.Couchbase("database");
        let documentId = db.createDocument({
          "firstname": firstname,
          "lastname": lastname,
          "token": token
        });
        appSettings.setString("documentId", documentId);
        let person = db.getDocument(documentId);
      },
      login(){
        console.log("login ran")
        login({
          title: "Login",
          message: "Please enter your user ID and Password",
          okButtonText: "Log In",
          cancelButtonText: "Cancel",
          userName: "djones@hotmail.com",
          password: "Dj0nes@th",
        }).then(result => {
          if(result.result===true){
            console.log("Login Ran");
            let userName = `${result.userName}`
            let password = `${result.password}`
            let loginInfo = {
              userName: userName,
              password: password
            }
            console.log(userName+" "+password)
            this.callLoginApi(loginInfo)
            .then((result)=>{
              if(typeof this.getToken === 'undefined'){
                alert({
                  title: "Error",
                  message: "Invalid Email or Password, please try again",
                  okButtonText: "Ok"
                }).then(() => {
                  console.log("Alert dialog closed");
                });

              } else {
                this.createDB(userName, password, this.getToken);
                this.loginVisibility = "collapse";
                this.mainVisibility = "visible";
              }
            })
          };
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
      openHomeDrawer() {
        this.$refs.homeDrawer.nativeView.showDrawer();
      },
      onCloseHomeDrawerTap() {
        this.$refs.homeDrawer.nativeView.closeDrawer();
      },
      onTapHome(){
        this.$refs.homeDrawer.nativeView.toggleDrawerState();
      },
      openAccountDrawer() {
        this.$refs.accountDrawer.nativeView.showDrawer();
      },
      onCloseAccountDrawerTap() {
        this.$refs.accountDrawer.nativeView.closeDrawer();
      },
      onTapAccount(){
        action("Your message", "Cancel button text", ["Option1", "Option2"])
        .then(result => {
          console.log(result);
        });
      }
    },
    created(){
      this.setVisibility();
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

  Button {

    borderColor: #BABABA;
  }

  Label {
    font-size: 24;
  }
</style>
