import Plugin from '../Plugin.vue';

const init = Plugin.methods.initWith();

window.storyblok.field_types[init.plugin] = Plugin;
