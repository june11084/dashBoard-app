<template>
  <Page class="page">
    <ActionBar class="action-bar" title="Counter">
    </ActionBar>

    <StackLayout>
      <FlexboxLayout flexDirection="row" justifyContent="center">
        <Button @tap="decrement" text="-" class="btn btn-outline"/>
        <Label :text="message" alignSelf="baseline" class="h2"/>
        <Button @tap="login" text="+" class="btn btn-outline"/>
      </FlexboxLayout>
      <Button text="Select Theme" @tap="selectTheme" />
      <Image v-if="surprise" src="~/images/NativeScript-Vue.png"/>
      <ListView for="item in listOfItems" @itemTap="onItemTap">
        <v-template>
          <!-- Shows the list item label in the default color and stye. -->
          <Label :text="item" />
        </v-template>
      </ListView>
      <ListPicker :items="listOfItems" selectedIndex="0" backgroundColor="#9AB2AC"
          @selectedIndexChange="selectedIndexChanged($event)" v-model="selectedItem">
      </ListPicker>
    </StackLayout>

  </Page>
</template>

<script>
  import { mapActions } from 'vuex';
  import { mapGetters } from 'vuex';
  import axios from 'axios';
  import VueAxios from 'vue-axios';
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
        listOfItems: 'allResults'
      })
    },
    methods: {
      ...mapActions([
        'decrement',
        'increment',
        'startLogin',
        'populateResultArray'
      ]),
      login(){
        login({
         title: "Login",
         message: "Please enter your user ID and Password",
         okButtonText: "Log In",
         cancelButtonText: "Cancel",
         userName: "Username",
         password: "Password"
       }).then(result => {
         console.log("Login Ran");
         let userName = `${result.userName}`
         console.log(userName)
         this.populateResultArray(userName);
         console.log("5. action ran")
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
