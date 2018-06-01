<template>
  <Page class="page" backgroundImage="res://real">
    <ActionBar class="action-bar" title="" backgroundColor="#e13131">
      <NavigationButton @tap="onTapHome" :visibility="hamburgerVisibility" icon="res://baseline_list_black_36" />
      <ActionItem class="actionItem" @tap="logout()" text="Log Out" icon="res://new_logo_idea"/>
    </ActionBar>
    <Gradient direction="to bottom" colors="#4e4e4e, #121212">
    <RadSideDrawer ref="homeDrawer" :gesturesEnabled="gesturesEnabled">
      <StackLayout ~drawerContent class="sideStackLayout" >
        <StackLayout class="sideTitleStackLayout">
          <Image src="res://new_logo_idea" stretch="fill" horizontalAlignment="left" width="35%" height="25%" marginLeft="15"/>
          <StackLayout class="sidedrawerAccount" backgroundColor="#e13131">
            <Label class="sideLabel" text="Doug Jones"></Label>
            <Label class="sideLabel" text="Djones@gamil.com"></Label>
          </StackLayout>
        </StackLayout>
        <StackLayout class="sideStackLayout">
            <Button @tap="navigateTo(profile)" text="Profile" class="sideButton sideLightGrayButton"/>
            <Button @tap="navigateTo(dashboard)" text="Dashboard" class="sideButton"/>
            <Button @tap="navigateTo(agreement)" text="Agreement" class="sideButton"/>
        </StackLayout>
        <Label text="Close" color="lightgray" padding="10" style="horizontal-align: left" @tap="onCloseHomeDrawerTap"></Label>
      </StackLayout>
      <StackLayout ~mainContent verticalAlignment="middle">
        <Image src="res://new_logo_idea" stretch="none" horizontalAlignment="center" />
        <Label text="Trailhead Marketing" alignSelf="center" textAlignment="center" class="h2"/>
        <StackLayout :visibility="loginVisibility">
          <Button @tap="login()" text="Login" class="btn btn-outline"/>
          <Button @tap="navigateTo(signUp)" text="Sign Up" class="btn btn-outline"/>
        </StackLayout>
        <Label :text="getStoredToken" alignSelf="center" textAlignment="center" class="h2" visibility="hidden"/>
      </StackLayout>
    </RadSideDrawer>
    </Gradient>
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
  import Dashboard from './Dashboard';
  export default {
    data () {
      return {
        surprise: false,
        drawerContentText: "",
        loginVisibility: "",
        mainVisibility: "",
        hamburgerVisibility: "",
        gesturesEnabled: true,
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
        agreement: Agreement,
        dashboard: Dashboard
      };
    },
    computed: {
      getStoredToken(){
        console.log("getToken ran")
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
          console.log("document id is null")
          this.gesturesEnabled=false;
          this.hamburgerVisibility="hidden";
          this.loginVisibility = "visible";
          this.mainVisibility = "collapse";
        } else {
          console.log("document id is valid")
          this.gesturesEnabled=true;
          this.hamburgerVisibility="visible";
          this.mainVisibility = "visible";
          this.loginVisibility = "collapse";
        };
        console.log("Set Visibility ran")
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
                this.gesturesEnabled=true;
                this.hamburgerVisibility="visible";
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
        let documentId = appSettings.getString("documentId","null");
        if(documentId==="null"){
          this.gesturesEnabled=false;
        }else {
          this.gesturesEnabled=true;
          this.$refs.homeDrawer.nativeView.toggleDrawerState();
        }
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
  .btn {
    background-color: rgb(208, 225, 225, 0.7);
  }
  Button {
    borderColor: #BABABA;
  }
  .sideLabel {
    font-size:18px;
    margin-left: 15px;
    color: #ffffff;
  }
  .actionItem {
    size: 36px;
  }
  Label {
    font-size: 24;
    color:#42cef4;
  }
</style>
