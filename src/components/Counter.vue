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
  import { mapGetters } from 'vuex';
  import axios from 'axios';
  import VueAxios from 'vue-axios';
  export default {
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
        'startLogin'
      ])
  },
}
</script>
