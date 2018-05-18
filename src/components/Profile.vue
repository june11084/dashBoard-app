<template>
  <Page class="page">
    <ActionBar class="action-bar" title="Profile">
        <NavigationButton @tap="$navigateBack" android.systemIcon="ic_menu_back" />
    </ActionBar>
    <!-- <GridLayout columns="*" rows="*,auto">
      <RadDataForm :source="profileObject" row="0" col="0">
      </RadDataForm>
      <Button text="Save" row="1" col="0" colSpan="1"  @tap="update()" />
    </GridLayout> -->
    <StackLayout>
      <Label text="Agent Type"></Label>
      <!-- <ListPicker :items="soloAgent" selectedIndex="0" height="100"
          @selectedIndexChange="selectedIndexChanged($event)" v-model="profileObject.solo_agent">
      </ListPicker>
      <ListPicker :items="agentType" selectedIndex="0" height="100"
          @selectedIndexChange="selectedIndexChanged($event)" v-model="profileObject.agent_type">
      </ListPicker> -->
      <WebView src="~/src/components/profile.html" />
      <!-- <HtmlView html="<select><option value="volvo">Volvo</option><option value="saab">Saab</option><option>value="vw">VW</option><option value="audi" selected>Audi</option></select>"> -->

      </HtmlView>
      <TextField v-model="profileObject.solo_agent" />
      <TextField v-model="profileObject.agent_type" />
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
        soloAgent: [{Team: '0'}, {Individual: '1'}],
        agentType: ["Real Estate Agent", "Broker", "Realtor"],
        profileObject: {}
      }
    },
    computed: {
    },
    methods: {
      ...mapGetters({
        listOfItems: 'allResults',
        getProfileObject: 'getProfileObject'
      }),
      update(){
        this.updateProfile().then(() => {
        }).then(() => {
        return this.getProfileApi().then(() => {
          this.getProfile();
        })
        })
      },
      trimProfileObject(){
        let profileObject = {
          solo_agent: this.getProfileObject().solo_agent,
          agent_type: this.getProfileObject().agent_type,
          company_name: this.getProfileObject().company_name,
          phone: this.getProfileObject().phone,
          email: this.getProfileObject().email,
          url: this.getProfileObject().url,
          address_street_1: this.getProfileObject().address_street_1,
          address_street_2: this.getProfileObject().address_street_2,
          address_city: this.getProfileObject().address_city,
          address_state_id: this.getProfileObject().address_state_id,
          address_zip: this.getProfileObject().address_zip,
          start_date: this.getProfileObject().start_date,
          short_description: this.getProfileObject().short_description,
          long_description: this.getProfileObject().long_description
        }
        return profileObject;
      },
      selectedIndexChanged(args){
        let picker = args.object;
        //console.log("picker selection: " + picker.agentType[picker.selectedIndex]);

        console.log("picker selection: " + this.profileObject.solo_agent);
      },
      ...mapActions([
        'getProfileApi',
        'setToken',
        'updateProfile'
      ])
    },
    created() {
      console.log("created started")
      if(this.getProfileObject()===null){
        console.log("if profile does not exist")
        return this.getProfileApi().then(() => {
          this.profileObject=this.trimProfileObject();
          console.log(this.getProfileObject().solo_agent)
        })
      }
    }
}
</script>
