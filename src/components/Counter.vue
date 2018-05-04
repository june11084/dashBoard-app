<template>
  <Page class="page">
    <ActionBar class="action-bar" title="Counter">
    </ActionBar>

    <StackLayout>
      <FlexboxLayout flexDirection="row" justifyContent="center">
        <Button @tap="decrement" text="-" class="btn btn-outline"/>
        <Label :text="message" alignSelf="baseline" class="h2"/>
        <Button @tap="startLogin" text="+" class="btn btn-outline"/>
      </FlexboxLayout>
      <Button :text="k" />
      <Image v-if="surprise" src="~/images/NativeScript-Vue.png"/>
      <ListView for="item in listOfItems" @itemTap="onItemTap">
        <v-template>
          <!-- Shows the list item label in the default color and stye. -->
          <Label :text="item" />
        </v-template>
      </ListView>
    </StackLayout>

  </Page>
</template>

<script>
  import { mapActions } from 'vuex';
  import axios from 'axios';
  import VueAxios from 'vue-axios';
  export default {
    data() {
      return {
        listOfItems: new Array("1","2","3"),
        k:"k555555555555555k"
      }
    },
    computed: {
      message () {
        return this.$store.state.counter.count.toString();
      },
      surprise () {
        return (this.$store.state.counter.count >= 5);
      },
    },
    methods: {
      startLogin (){
        function apiCall(DomainName){
          console.log("apicall ran")

            axios.get(`https://api.domainsdb.info/search?query=${DomainName}`).then((response) => {
              let notEmpty = 0;
              // k = `<li>Doctor: ${response.data.domains[i]} working`; console.log(k)
              for(let i = 0; i < response.data.domains.length ; i ++){
                console.log(response.data.domains[i]);
                console.log(listOfItems)
                listOfItems.push(`<li>Doctor: ${response.data.domains[i]} working`);
                console.log(listOfItems)
                notEmpty++;
              }
              if(notEmpty === 0){
                // $('#result').append("Nothing found");
              }
              console.log(response.data + "response data")
          });
        };
        login({
          title: "Login",
          message: "Please enter your user ID and Password",
          okButtonText: "Log In",
          cancelButtonText: "Cancel",
          userName: "Username",
          password: "Password"
        }).then(result => {
          console.log("ran");
          console.log(`${result.userName}`);
          console.log(this.k)
          // callDomainSearch(`${result.userName}`);
          apiCall(`${result.userName}`);
        });
      },
      ...mapActions([
        'decrement',
        'increment',
      ]),
  },
}
</script>
