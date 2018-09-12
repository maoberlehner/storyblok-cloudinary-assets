<template>
  <div
    :class="{ 'assets--empty': model.assets.length === 0 }"
    class="CloudinaryAssets assets__wrap"
  >
    <ul
      v-if="model.assets.length"
      class="CloudinaryAssets__list assets"
    >
      <li
        v-for="(asset, index) in model.assets"
        :key="`${asset.id}-${index}`"
        class="assets__item uk-flex"
      >
        <div class="assets__lcol">
          <img
            :src="`https://res.cloudinary.com/${options.cloudName}/image/upload/c_thumb,f_auto,g_center,q_auto,w_20,h_20/v${asset.version}/${asset.id}`"
            alt=""
            class="assets__item-icon"
          >
        </div>
        <div>
          <div>
            <a
              :href="`https://res.cloudinary.com/${options.cloudName}/image/upload/f_auto,q_auto/v${asset.version}/${asset.id}`"
              target="_blank"
              class="link link--inverse"
            >
              {{ asset.id }}
            </a>
            <a
              class="assets__item-trash"
              title="Remove"
              @click="removeAsset(index)"
            >
              <i class="uk-icon-minus-circle"/>
            </a>
          </div>
          <input
            v-model="model.assets[index].title"
            type="text"
            class="uk-form-small assets__item-name"
            placeholder="Title"
          >
          <input
            v-model="model.assets[index].alt"
            type="text"
            class="uk-form-small assets__item-name"
            placeholder="Alt"
          >
          <input
            :value="model.assets[index].dominant_color"
            type="text"
            class="uk-form-small assets__item-name"
            placeholder="Dominant color"
          >
        </div>
      </li>
    </ul>
    <a
      v-if="model.assets.length < options.maxFiles"
      class="uk-form-file assets__btn"
      @click="browseMediaLibrary"
    >
      <span class="util__nobreak">
        <i class="uk-icon-upload uk-margin-small-right"/> Add Asset(s)
      </span>
    </a>
  </div>
</template>

<script>
import * as Vibrant from 'node-vibrant';

export default {
  mixins: [window.Storyblok.plugin],
  watch: {
    model: {
      deep: true,
      handler(value) {
        this.$emit(`changed-model`, value);
      },
    },
  },
  created() {
    // eslint-disable-next-line no-restricted-globals
    const rootWindow = parent; // Change to `window` during development.
    const rootDocument = rootWindow.document;
    const script = rootDocument.createElement(`script`);
    script.type = `text/javascript`;
    script.onload = () => {
      this.mediaLibrary = rootWindow.cloudinary.createMediaLibrary({
        api_key: this.options.apiKey,
        cloud_name: this.options.cloudName,
      }, { insertHandler: this.addImages });
    };
    script.src = `https://media-library.cloudinary.com/global/all.js`;
    rootDocument.getElementsByTagName(`head`)[0].appendChild(script);
  },
  methods: {
    addImages({ assets }) {
      // This is a workaround because limiting the amount of files
      // which can be selected in Cloudinary seems not to work correctly.
      const truncatedAssets = assets.slice(0, this.options.maxFiles - this.model.assets.length);

      truncatedAssets.forEach(async ({
        context,
        height,
        // eslint-disable-next-line camelcase
        public_id,
        // eslint-disable-next-line camelcase
        secure_url,
        version,
        width,
      }) => {
        const palette = await Vibrant.from(secure_url).getPalette();

        this.model.assets.push({
          alt: context && context.custom.alt,
          aspect_ratio: width / height,
          dominant_color: palette.Vibrant && palette.Vibrant.getHex(),
          height,
          id: public_id,
          title: context && context.custom.caption,
          version,
          width,
        });
      });
    },
    browseMediaLibrary() {
      const maxFiles = this.options.maxFiles - this.model.assets.length;

      this.mediaLibrary.show({
        // This is currently not working, but it should.
        max_files: maxFiles,
        multiple: maxFiles > 1,
      });
    },
    initWith() {
      return {
        assets: [],
        plugin: `cloudinary-assets`,
      };
    },
    removeAsset(index) {
      this.model.assets = this.model.assets.filter((_, i) => i !== index);
    },
  },
};
</script>

<style>
.CloudinaryAssets__list {
  padding-left: 0;
  list-style-type: none;
}
</style>
