<template>
  <div>
    <button @click="browseMediaLibrary">
      Browse library
    </button>
  </div>
</template>

<script>
import * as Vibrant from 'node-vibrant';

// WIP render existing images
// WIP remove existing images
// WIP edit existing images (alt, title)??
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
    const rootWindow = parent.document ? parent : window;
    const rootDocument = rootWindow.document || document;
    const script = rootDocument.createElement(`script`);
    script.type = `text/javascript`;
    script.onload = () => {
      this.mediaLibrary = rootWindow.cloudinary.createMediaLibrary({
        cloud_name: `petermax`,
        api_key: `327795717364671`, // WIP von env
      }, { insertHandler: this.addImages });
      // WIP
      // max_files
      // multiple
    };
    script.src = `https://media-library.cloudinary.com/global/all.js`;
    rootDocument.getElementsByTagName(`head`)[0].appendChild(script);
  },
  methods: {
    addImages({ assets }) {
      assets.forEach(async ({
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
          aspect_ratio: width / height,
          dominant_color: palette.Vibrant && palette.Vibrant.getHex(),
          height,
          id: public_id,
          meta: {
            alt: context && context.custom.alt,
            title: context && context.custom.caption,
          },
          version,
          width,
        });
      });
    },
    browseMediaLibrary() {
      this.mediaLibrary.show();
    },
    initWith() {
      return {
        assets: [],
        plugin: `cloudinary-assets`,
      };
    },
  },
};
</script>
