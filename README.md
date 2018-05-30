# NativeScript quick guide

## Getting Started

1. Setup NativeScript and Node.js: https://docs.nativescript.org/start/ns-setup-win (must use default cmd, not git bash).
2. Install nativescript-vue/vue-cli-template: run command < npm install -g @vue/cli @vue/cli-init >
3. Create project template: run command < vue init nativescript-vue/vue-cli-template <project-name> >
4. Run < npm install > in project root directory.
5. To open project on connected android devices or emulator: run command < npm run watch:android > or < npm run watch:ios >

### Prerequisites

* Node.js
* NativeScript CLI
* Android SDK
* Vuex

## Useful Documentation
* https://nativescript-vue.org/en/docs/introduction/
* https://docs.nativescript.org/api-reference/globals
* https://vuex.vuejs.org/
* https://vuejs.org/v2/guide/index.html

### Project Structuring
1. .vue files are stored in src/components
2. js files are stored in src/store/modules, and are imported and exported globally inside src/store/index.js
3. add resources such as image files to template/app/App_Resources/<platform>, do not add anything to the dist root folder as it's create
by the template folder and will cause errors.
4. Starting page is specified in src/main.js

### Vuejs
1. components in .vue file are written in vuejs with nativescript support,
meaning that it will be able to use both of their functionalities or properties!
for example in here:
```
<StackLayout :visibility="loginVisibility">
  <Label text="Please Log In" alignSelf="center" textAlignment="center" class="h2"/>
  <Button @tap="login()" text="Login" class="btn btn-outline"/>
  <Button @tap="navigateTo(signUp)" text="Sign Up" class="btn btn-outline"/>
</StackLayout>
```
the ":" is the short hand of "v-bind" and "@" is the short hand of "v-on" from vuejs directives, the StackLayout is a nativescript element, "tap" and "visibility" are properties of nativescript.

### Vuex Structuring
1. Vuex is used to dynamically monitor and handle states(vuex way of saying global variables).
2. js files are structured specifically and exported to the local store from src/store/index.js
3. Learn the vuex structuring at https://vuex.vuejs.org/guide/state.html
5. methods exported to the local store can be called in any .vue file by using Dispatching/mapping with Vuex for example:
```
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions([
      'increment',
      'incrementBy'
    ]),
    ...mapActions({
      add: 'increment'
    })
  }
}
```

### Plugins
* Although it's possible to use platform specific ui components, native elements/components from Native-script are limited. That's why it's good to use ui plug-ins when the desired element isn't included by Native-script or is hard to use.

1. Plug-in list(package.json):
```
"dependencies": {
  "axios": "^0.18.0",
  "jquery": "^3.3.1",
  "nativescript-camera": "^4.0.2",
  "nativescript-cardview": "^3.0.1",
  "nativescript-checkbox": "^3.0.3",
  "nativescript-couchbase": "^1.0.18",
  "nativescript-drop-down": "^3.2.5",
  "nativescript-fontawesome": "^1.0.0",
  "nativescript-loading-indicator": "^2.4.0",
  "nativescript-materialdropdownlist": "^1.0.15",
  "nativescript-permissions": "^1.2.3",
  "nativescript-theme-core": "^1.0.4",
  "nativescript-ui-dataform": "^3.6.0",
  "nativescript-ui-sidedrawer": "^4.1.0",
  "nativescript-vue": "^1.3.1",
  "qs": "^6.5.2",
  "sqlite": "^2.9.1",
  "tns-core-modules": "^4.0.0",
  "vue-axios": "^2.1.1",
  "vuex": "^3.0.1"
},
```
* To see how to import and use plug-ins, refer to scr/store/index.js and .vue files

### Styling
* components can be styled inside .vue files at the bottom directly.
* Android specific app styling such as app logo and splash screen are defined in
template/app/App_Resources/Android/AndroidManifest.xml
