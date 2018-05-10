<template>
  <Page class="page">
    <ActionBar class="action-bar" title="Welcome">
    </ActionBar>

    <StackLayout>
      <FlexboxLayout flexDirection="row" justifyContent="center">
        <Button @tap="decrement" text="-" class="btn btn-outline"/>
        <Label :text="message" alignSelf="baseline" class="h2"/>
        <Button @tap="login" text="+" class="btn btn-outline"/>
      </FlexboxLayout>
      <Image v-if="surprise" src="~/images/NativeScript-Vue.png"/>
      <ListPicker :items="listOfItems" selectedIndex="0" backgroundColor="#9AB2AC"
          @selectedIndexChange="selectedIndexChanged($event)" v-model="selectedItem">
      </ListPicker>
      <Label :text="getToken" alignSelf="baseline" class="h2"/>
      <Button @tap="takePicture" text="Camera" class="btn btn-outline"/>
    </StackLayout>

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
  export default {
    data: function () {
       return {
         selectedItem: ""
       }
     },
    computed: {
      message () {
        return this.$store.state.counter.count.toString();
      },
      surprise () {
        return (this.$store.state.counter.count >= 5);
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
        'startLogin',
        'callLoginApi'
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
      login(){
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
             console.log("callLoginApi .then ran")
             this.goToHelloPage();
             console.log("done goToHelloPage")
           })
         };
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
}
</script>
