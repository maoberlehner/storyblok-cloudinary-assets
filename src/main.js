import Plugin from './Plugin.vue';

if (process.env.NODE_ENV === `development`) {
  window.Fieldtype = Plugin;
  const customComp = window.Storyblok.vue.extend(window.Fieldtype);
  window.Storyblok.vue.component(`custom-plugin`, customComp);
  window.StoryblokPluginRegistered = true;
} else {
  const init = Plugin.methods.initWith();
  window.storyblok.field_types[init.plugin] = Plugin;
}
