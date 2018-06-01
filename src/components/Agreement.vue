<template>
  <Page class="page">
    <ActionBar class="action-bar" title="Home">
      <NavigationButton @tap="onTapHome" android.systemIcon="ic_menu_home" />
      <ActionItem @tap="" text="Log Out" icon="res://logo54"/>
    </ActionBar>
    <ScrollView orientation="vertical">
      <StackLayout orientation="vertical">
        <Label text="Terms of Service" horizontalAlignment="center" />
        <TextView v-model="textFieldValue" />
        <Label text="Privacy Policy" horizontalAlignment="center" />
        <TextView v-model="privacy" />
      </StackLayout>
    </ScrollView>
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
        privacy: "Trailhead will never disclose personal information to anyone for any reason. We will not share your email address with any other company. In order to fully serve ads, we may use third-party advertising companies. These companies may use cookies and web beacons to monitor advertising effectiveness. Any information that these third parties may collect by way of cookies and web beacons will be anonymous",
        textFieldValue: "Trailhead Marketing (“Trailhead”) is an independent online marketing firm dedicated to working with real estate agents and businesses nationwide. Trailhead strives to achieve high-level marketing results for clients through the Google search engine marketing platform. By agreeing to work with Trailhead, the Client is also agreeing to the following terms of service.\n\nTerms and Conditions:\n\nGoogle Search Phrase:\nTrailhead will work with the Client one-on- one to place them on searches that are performed through Google’s online search engine. The goal is to put the Client’s name directly in front of their target markets. Google’s advertising platform analyzes and provides data for different markets, and Trailhead finds the most cost effective positions that will obtain the highest return on investment.\n\nTrailhead only represents one client under any Exclusive Google Search Phrase at a time. That means that every advertisement for the Client is a priority and the Client can maintain an effective marketing strategy.\n\nIn addition to placement on Google searches, Trailhead may also provide other marketing services. These will complement search phrase placement and further enhance results and exposure.\n\nSubscription Details:\nThe Order that the Client receives confirms that the agreement between the Client and a marketing consultant from Trailhead to participate in Trailhead’s marketing services was recorded with the Client’s knowledge and authorization. Unless explicitly contradicted by the Order Confirmation, all of the terms described here continue in full effect and force.\n\nThe term of each service subscription will run month-to- month unless the Client and Trailhead agree to a different arrangement in writing. Any month-to- month agreement will begin on the formation date of each account, which will be the date that the Client first purchases Trailhead’s services. The monthly billing date will also coincide with the date of the first purchase.\n\nTrailhead will never increase a monthly payment amount without the Client’s express consent. However, rate changes may result from any request to change the Google Search Phrase that is associated with an account. Additional phrases will be assessed at the current assigned rate and will not be determined by any previous rates that applied to accounts of the Client. Further details involving a specific account can be found by contacting Trailhead’s Customer Service Department during Trailhead’s business hours: Monday - Friday from 8:30AM to 4:30PM PST, at 1-888- 361-5532.\n\nNo Guarantee of Sales or Exact Placement:\nWhile it is Trailhead’s goal to build the most cost-effective ad campaign on Google, the platform and market mechanics are such that Trailhead cannot guarantee an exact positioning of an ad on a search page, nor can Trailhead guarantee any number of hits, clicks, leads, or sales as a result of the Client’s online marketing campaign.\n\nThere may be events outside of Trailhead’s control that temporarily inhibit the ability to secure Google placement of an ad. These events may include, but are not limited to, Google System updates, and changes in Google account reviews. Trailhead is not responsible for lack of ad placement that results from events are out of Trailhead’s control.\n\nNo Duty to Track Marketing Results:\nTrailhead does not control the content of the Client’s personal or business website and is unable to track sales that directly result from the Client’s marketing strategies. It is the responsibility of the Client to track their own results.\n\nNot Affiliated with Google:\nTrailhead is not an entity of, nor directly affiliated with Google Inc. or Alphabet Inc. Trailhead is an independent marketing firm that specializes in creating and monitoring targeted advertising campaigns on the Google search engine.\n\nPrivacy Statement:\nTrailhead will never disclose personal information to anyone for any reason. We will not share your email address with any other company. In order to fully serve ads, we may use third-party advertising companies. These companies may use cookies and web beacons to monitor advertising effectiveness. Any information that these third parties may collect by way of cookies and web beacons will be anonymous.\n\nWarranties:\nTHE SERVICES AND INFORMATION PROVIDED BY TRAILHEAD ARE ON AN \"AS IS\" AND \"IF AVAILABLE\" BASIS. THERE ARE NO ATTACHED WARRANTIES OR GUARANTEES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO: WARRANTIES OF TITLE, NONINFRINGEMENT OR IMPLIED WARRANTIES OF MERCHANTABILITY OR FITNESS FOR A SPECIFIC PURPOSE. NO ADVICE OR INFORMATION GIVEN BY TRAILHEAD, ITS AFFILIATES OR THEIR RESPECTIVE EMPLOYEES SHALL CREATE ANY WARRANTY HEREUNDER.\n\nIndemnification for Copyright or Trademark Infringement:\nThe Client shall defend, indemnify and hold harmless Trailhead and its agents, employees, officers, owners and affiliates from and against any and all Third Party claims and liabilities (including, without limitation, reasonable attorneys\' fees and costs), regardless of the form of action, arising out of or in connection with a claim that any of the marketing phrases or terms when used within the scope of these Terms of Service, infringes, violates or misappropriates a valid third party trademark, copyright or other proprietary right, provided that the Client is notified promptly in writing of the action by Trailhead, and Trailhead has not reached any compromise or settlement of such action or made any admissions in respect of the same.\n\nLicenses:\nBy agreeing to these Terms of Service, the Client grants Trailhead a non-exclusive, irrefutable, royalty-free, worldwide license under all copyrights, trademarks, patents, trade secrets, privacy and publicity rights and other intellectual property rights you own or control, in order for Trailhead to execute the terms of the agreed upon service.\n\nGeneral Terms\n\nAuthority to Bind:\nNo employee or consultant of Trailhead or any of its divisions is authorized to offer or agree to any binding agreement with another party without the approval of an Account Manager.\n\nGoverning Law:\nThese Terms of Service shall be governed and construed in accordance with the laws of Oregon, excluding Oregon’s choice-of- law principles, and all claims relating to or arising out of this contract, or the breach thereof, whether sounding in contract, tort or otherwise, shall likewise be governed by the laws of Oregon, excluding Oregon’s choice-of- law principles.\n\nIf either party brings against the other party any proceeding arising out of this Terms of Service or arising out of the services provided by Trailhead to the Client, that party may bring that proceeding only in the United States District Court for the District of Oregon or, only if there is no federal subject matter jurisdiction, in any state court of Oregon sitting in Multnomah County, and each party hereby submits to the exclusive jurisdiction of those courts for purposes of any such proceeding.\n\nWaiver:\nNo waiver of satisfaction of a condition or nonperformance of an obligation under these Terms of Service will be effective unless it is in writing and signed by the party granting the waiver.\n\nSeverability:\nIf any term of these Terms of Service is to any extent illegal, otherwise invalid, or incapable of being enforced, such term shall be excluded to the extent of such invalidity or unenforceability; all other terms hereof shall remain in full force and effect; and, to the extent permitted and possible, the invalid or unenforceable term shall be deemed replaced by a term that is valid and enforceable and that comes closest to expressing the intention of such invalid or unenforceable term. If application of this Severability provision should materially and adversely affect the economic substance of the transactions contemplated hereby, the Party adversely impacted shall be entitled to compensation for such adverse impact, provided the reason for the invalidity or unenforceability of a term is not due to serious misconduct by the Party seeking such compensation.\n\nDuty to Keep Information Current:\nIt is the Client’s responsibility to update Trailhead with any and all changes to the information that is relevant to the performance of the services provided by Trailhead, including, but not limited to: personal and professional contact information,  payment information and subscribed URL.\n\nFailed Payments and Late Fee:\nIf payment is not successful for any reason, the Client’s marketing may remain online for up to 30 days as we contact the Client to collect updated payment information. The continued presence of marketing content online will not modify any obligations that are already owed under your agreements with Trailhead. If the delinquent account is not updated within 30 days Trailhead reserves the right to turn the account over to a collections agency and immediately cease all marketing services. Any and all Clients with an outstanding or overdue balance will accrue a fee of $25 every fifth (5th) business day starting on the date of their monthly renewal.\n\nRefunds:\nAll sales are final, and all charges are non-refundable\n\nCancellation:\nAll cancellation requests must be made to a \"Marketing Specialist\" by calling 1-888- 361-5532. Cancellation must be made at least three (3) business days prior to the date of the next scheduled payment. Cancellations that are made after that point will not take effect until the following billing period. Non business days include but are not limited to: all major holidays and certain days around major holidays. For further explanation regarding subscription details, the business day schedule, or the cancellation policy please contact Trailhead’s Customer Service Department at 1-888- 361-5532.\n\nQuestions:\nIf you have any questions concerning a specific account, please call Trailhead’s Customer Service Department, during business hours: Monday - Friday from 8:30AM to 4:30PM PST, at 1-888- 361-5532."
      };
    },
    computed: {
      ...mapGetters({
        getToken: 'getToken'
      })
    },
    methods: {
      ...mapActions([
      ]),
    },
    created(){
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
  .SegmentedBar {

  }
  .SegmentedBarItem {
  }
  .font-awesome-circle {
    border-color: #FFFFFF;
    font-family: 'fa-solid-900';
    font-size: 15;
  }
  .tabView {
    border-color: #FFFFFF;
    background-color: transparent;
  }
  Button {
    borderColor: #BABABA;
  }

  Label {
    font-size: 24;
  }
</style>
