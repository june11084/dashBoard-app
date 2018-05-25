<template>
  <Page class="page">
    <ActionBar class="action-bar" title="Profile">
        <NavigationButton @tap="$navigateBack" android.systemIcon="ic_menu_back" />
    </ActionBar>
    <ScrollView>
      <StackLayout>
        <Label text="Agent Type:"></Label>
        <!-- <CheckBox text="Team" checked="false"></CheckBox> -->
        <DropDown class="agentDropdown" :items="soloAgent" selectedIndex="0"
          opened="dropDownOpened" closed="dropDownClosed"
          @selectedIndexChanged="soloAgentDropDownSelectedIndexChanged($event)">
        </Dropdown>
        <DropDown class="Dropdown" :items="agentType" selectedIndex="0"
          opened="dropDownOpened" closed="dropDownClosed"
          @selectedIndexChanged="agentTypeDropDownSelectedIndexChanged($event)">
        </Dropdown>
        <Label text="Company Name:"></Label>
        <TextField v-model="profileObject.company_name" />
        <Label text="Phone Number:"></Label>
        <TextField v-model="profileObject.phone" />
        <Label text="Email:"></Label>
        <TextField v-model="profileObject.email" />
        <Label text="Website:"></Label>
        <TextField v-model="profileObject.url" />
        <Label text="Address 1:"></Label>
        <TextField v-model="profileObject.address_street_1" />
        <Label text="Address 2:"></Label>
        <TextField v-model="profileObject.address_street_2" />
        <Label text="City:"></Label>
        <TextField v-model="profileObject.address_city" />
        <Label text="State:"></Label>
        <DropDown class="Dropdown" :items="agentType" selectedIndex="0"
          opened="dropDownOpened" closed="dropDownClosed"
          @selectedIndexChanged="statesDropDownSelectedIndexChanged($event)">
        </Dropdown>
        <Label text="Zip Code:"></Label>
        <TextField v-model="profileObject.address_zip"/>
        <Label text="Realtor Since:"></Label>
        <DatePicker @loaded="onDatePickerLoaded($event)" v-model="profileObject.start_date"/>
        <Label text="Short Description:"></Label>
        <TextView v-model="profileObject.short_description" />
        <Label text="Long Description:"></Label>
        <TextView v-model="profileObject.long_description" />
        <Button @tap="update()" text="Update" class="btn btn-outline"/>
      </StackLayout>
    </ScrollView>
  </Page>
</template>
<script>
  import { mapActions } from 'vuex';
  import { mapGetters } from 'vuex';
  import axios from 'axios';
  import VueAxios from 'vue-axios';
  import Html from './profile';
  import { LoadingIndicator } from 'nativescript-loading-indicator';
  export default {
    data () {
      return {
        selectedIndex: "",
        soloAgent: ["Team","Individual"],
        agentType: ["Real Estate Agent", "Broker", "Realtor"],
        states: [],
        profileObject: {
          start_date: ""
        },
        loadingIndicator: new LoadingIndicator(),
        options: {
          message: 'Loading...',
          progress: 0.65,
          android: {
            indeterminate: true,
            cancelable: true,
            cancelListener: function(dialog) { console.log("Loading cancelled") },
            max: 100,
            progressNumberFormat: "%1d/%2d",
            progressPercentFormat: 0.53,
            progressStyle: 1,
            secondaryProgress: 1
          }
        },
      };
    },
    computed: {
    },
    methods: {
      ...mapGetters({
        listOfItems: 'allResults',
        getProfileObject: 'getProfileObject'
      }),
      onDatePickerLoaded(args){
        let datePicker = args.object;
        datePicker.year = 2016;
        datePicker.month = 1;
        datePicker.day = 1;
        datePicker.minDate = new Date(1975, 0, 29);
        datePicker.maxDate = new Date(2045, 4, 12);
      },
      soloAgentDropDownSelectedIndexChanged(args){
        let picker = args.object;
        console.log(picker.selectedIndex);
        this.profileObject.solo_agent = picker.selectedIndex;
      },
      agentTypeDropDownSelectedIndexChanged(args){
        let picker = args.object;
        console.log(picker.items[picker.selectedIndex]);
        this.profileObject.agent_type = picker.items[picker.selectedIndex];
      },
      statesDropDownSelectedIndexChanged(args){
        let picker = args.object;
        console.log(picker.items[picker.selectedIndex]);
        this.profileObject.address_state_id = picker.items[picker.selectedIndex];
      },
      update(){
        // this.profileObject.solo_agent=
        alert('Profile Updated')
        .then(() => {
          console.log("Alert dialog closed.");
        });
        this.$navigateBack();
        this.updateProfile(this.profileObject).then(() => {
        }).then(() => {
        return this.getProfileApi().then(() => {
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
      this.loadingIndicator.show(this.options);
      return this.getProfileApi().then(() => {
        this.profileObject=this.trimProfileObject();
        this.loadingIndicator.hide();
        console.log(this.profileObject);
        console.log(this.getProfileObject().solo_agent);
      })

    }
}
</script>

<style scoped>
  .hello-world {
    margin: 20;
  }
  .btn btn-info btn-lg {
    background-color: #3993CC;
  }
  .Dropdown {
    font-size:20px;
    margin-bottom: 24px;
  }
  .agentDropdown {
    font-size:20px;
  }
  Button {
    borderColor: #BABABA;
  }
  TextField {
    font-size: 35px;
  }
  Label {
    font-size: 26;
  }
</style>
