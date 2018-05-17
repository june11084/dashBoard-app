<template>
  <Page class="page">
    <ActionBar class="action-bar" title="Profile">
        <NavigationButton @tap="$navigateBack" android.systemIcon="ic_menu_back" />
    </ActionBar>
    <GridLayout columns="*" rows="*,auto">
      <RadDataForm :source="profileObject" row="0" col="0">
        <!-- <properties>
          <EntityProperty name="solo_agent" displayName="Name of Album" index="0" />
          <EntityProperty name="agent_type" displayName="Name of Band" index="1" />
          <EntityProperty name="company_name" displayName="Release Year" index="2" />
          <EntityProperty name="phone" displayName="My Rating" index="3" />
          <EntityProperty name="url" displayName="Do I Own This?" index="4" />
          <EntityProperty name="email" displayName="Do I Own This?" index="5" />
          <EntityProperty name="address_street_1" displayName="Do I Own This?" index="6" />
          <EntityProperty name="address_street_2" displayName="Do I Own This?" index="7" />
          <EntityProperty name="address_city" displayName="Do I Own This?" index="8" />
          <EntityProperty name="address_state_id" displayName="Do I Own This?" index="9" />
          <EntityProperty name="address_zip" displayName="Do I Own This?" index="10" />
          <EntityProperty name="start_date" displayName="Do I Own This?" index="11" />
          <EntityProperty name="short_description" displayName="Do I Own This?" index="12" />
          <EntityProperty name="long_description" displayName="Do I Own This?" index="13" />
        <properties> -->
      </RadDataForm>
      <Button text="Save" row="1" col="0" colSpan="1"  @tap="updateProfile()" />
    </GridLayout>
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
        selectedItem: "",
        profile: {
        AgentType:"asdf"
        }
      }
    },
    computed: {
      ...mapGetters({
        listOfItems: 'allResults',
        profileObject: 'getProfileObject'
      })
    },
    methods: {
      ...mapActions([
        'decrement',
        'increment',
        'startLogin',
        'populateResultArray',
        'getProfileApi',
        'setToken',
        'updateProfile'
      ]),
    },
    created() {
      if(this.profileObject===null){
        console.log("if profile exist ran")
        this.getProfileApi();
      }
    }
}
</script>
