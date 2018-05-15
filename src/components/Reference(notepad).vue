<template>
  <Page class="page" :visibility="loggedIn">
    <ActionBar class="action-bar" title="Welcome">
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

    <GridLayout columns="1*, 1*, 1*" rows="80, 80" backgroundColor="#FFFFFF">
      <CardView class="cardStyle" row="0" col="0" margin="15" elevation="15" radius="20">
        <Label text="0,0" />
      </CardView>
      <CardView class="cardStyle" row="0" col="1" margin="15" elevation="15" radius="20">
        <Label text="0,1" backgroundColor="#1c6b48"/>
      </CardView>
      <CardView class="cardStyle" row="0" col="2" margin="15" elevation="15" radius="20">
        <Label text="1,0" backgroundColor="#289062"/>
      </CardView>
      <CardView class="cardStyle" row="1" col="0" margin="15" elevation="15" radius="20">
        <Label text="1,0" backgroundColor="#289062"/>
      </CardView>
      <CardView class="cardStyle" row="1" col="1" margin="15" elevation="15" radius="20">
        <Label text="1,1" backgroundColor="#43b883"/>
      </CardView>
      <CardView class="cardStyle" row="1" col="2" margin="15" elevation="15" radius="20">
        <Label text="1,1" backgroundColor="#1c6b48"/>
      </CardView>
    </GridLayout>
    
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
    data: function () {
      return {
        selectedItem: "",
        loggedIn: " "
      }
    },
    computed: {
      message () {
        return this.$store.state.counter.count.toString();
      },
      surprise () {
        return (this.$store.state.counter.count >= 5);
      },
      getStoredToken(){
        let db = new couchbase.Couchbase("testdb");
        let documentId = appSettings.getString("documentId","null");
        console.log(documentId)
        if (documentId==="null"){
          console.log("documentId is undefined")
          console.log(this.$store.state.service.apiToken)
          this.loggedIn = "visible";
          return this.$store.state.service.apiToken;
        } else {
          let person = db.getDocument(documentId);
          console.log("documentId is defined")
          this.loggedIn = "collapse";
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
             this.loggedIn = "collapse";
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
      }
    },
    created(){

    }
  }
</script>
