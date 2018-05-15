<template>
  <Page class="page">
    <ActionBar class="action-bar" title="My Dashboard">
      <NavigationButton  @tap="onTapHome" android.systemIcon="ic_menu_home" />
      <ActionItem @tap="onTapHome" isCollapsed="true" icon="res://baseline_account_circle_black_36"/>
    </ActionBar>
    <RadSideDrawer ref="drawer" >
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
          <Label text="Close" color="lightgray" padding="10" style="horizontal-align: left" @tap="onCloseDrawerTap"></Label>
      </StackLayout>
      <StackLayout ~mainContent>
        <StackLayout :visibility="loginVisibility">
          <Label :text="getStoredToken" alignSelf="center" textAlignment="center" class="h2"/>
          <Button @tap="login()" text="Login" class="btn btn-outline"/>
        </StackLayout>
        <StackLayout :visibility="mainVisibility">
          <Label :text="getStoredToken" alignSelf="baseline" class="h2"/>
        </StackLayout>
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
        drawerContentText:"",
        loginVisibility:"",
        mainVisibility: ""
      };
    },
    computed: {
      getStoredToken(){
        let db = new couchbase.Couchbase("testdb");
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
        'takePicture'
      ]),
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
      goToHelloPage() {
        console.log("goToHelloPage ran")
        this.$navigateTo(Counter);
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
        let db = new couchbase.Couchbase("testdb");
        let documentId = db.createDocument({
            "firstname": firstname,
            "lastname": lastname,
            "token": token
        });
        appSettings.setString("documentId", documentId);
        let person = db.getDocument(documentId);
        console.log(db)
        console.log(documentId)
        console.log(person.firstname)
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
           console.log(userName+" "+password)
           this.callLoginApi(userName, password).then((result)=>{
             this.createDB(userName, password, this.getToken);
             console.log(this.getToken)
             this.loginVisibility = "collapse";
             this.mainVisibility = "visible";
             //this.goToHelloPage()
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
      openDrawer() {
            this.$refs.drawer.nativeView.showDrawer();
      },
      onCloseDrawerTap() {
        this.$refs.drawer.nativeView.closeDrawer();
      },
      onTapHome(){
        this.$refs.drawer.nativeView.toggleDrawerState();
      }
    },
    created(){
       this.setVisibility();
       this.drawerContentText = "SideDrawer for NativeScript can be easily setup in the HTML definition of your page by defining tkDrawerContent and tkMainContent. The component has a default transitions and position and also exposes notifications related to changes in its state. Swipe from left to open side drawer."
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
