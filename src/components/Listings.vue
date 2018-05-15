<template>
  <Page class="page">
    <ActionBar class="action-bar" title="Listings">
        <NavigationButton @tap="$navigateBack" android.systemIcon="ic_menu_back" />
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
    </StackLayout>
  </Page>
</template>

<script>
  import { mapActions } from 'vuex';
  import { mapGetters } from 'vuex';
  import axios from 'axios';
  import VueAxios from 'vue-axios';
  export default {
    data () {
      return {
       selectedItem: ""
      }
    },
    computed: {
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
    },
}
</script>
