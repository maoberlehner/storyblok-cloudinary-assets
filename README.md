# Storyblok Cloudinary Assets

Storyblok Cloudinary Assets is a Storyblok field-type plugin which makes it possible to use [Cloudinary](https://cloudinary.com/) for managing assets in the headless CMS [Storyblok](https://www.storyblok.com/).

## How to use

Storyblok Cloudinary Assets is a custom field type plugin for the headless CMS Storyblok. In order to use it, you have to build and install it first.

### Deployment

You can start by cloning this repository and installing its dependencies.

```bash
git clone git@github.com:maoberlehner/storyblok-cloudinary-assets.git
cd storyblok-cloudinary-assets
npm install
```

Because Storyblok plugins share a global namespace, you have to choose a distinct name for your plugin first. Go to `src/Plugin.vue` and change the following line of code.

```diff
     initWith() {
       return {
         assets: [],
-        plugin: `cloudinary-assets`,
+        plugin: `YOUR-DISTINCT-NAME`,
       };
     },
```

Now you can run the build command and copy and paste the generated code into Storyblok when it's done.

```bash
npm run build
```

Next go to the [Plugins page](https://app.storyblok.com/#!/me/plugins) and click the `New` button in the top right.

![create new cloudinary asset storyblok plugin](https://res.cloudinary.com/maoberlehner/image/upload/c_thumb,f_auto,q_auto,w_600/v1536838793/blog/2018-09-14/create-new-cloudinary-asset-storyblok-plugin)

It is important to choose the same name you specified in the `initWith()` method for your plugin to work.

![storyblok plugin editor](https://res.cloudinary.com/maoberlehner/image/upload/c_thumb,f_auto,q_auto,w_600/v1536838793/blog/2018-09-14/storyblok-plugin-editor)

Now you can copy the contents of `dist/export.js` into the plugin editor.

## Advanced features

This is an example value of a field using the Storyblok Cloudinary Assets plugin.

```json
[
  {
    "alt": "Alt text",
    "aspect_ratio": 1.777777778,
    "dominant_color": "#355c7b",
    "height": 1600,
    "id": "some/cloudinary-file-id",
    "title": "Title text",
    "version": 123456789,
    "width": 900,
  }
]
```

The two most notable properties are the `aspect_ratio` and the `dominant_color`. You can use those for optimizing the perceived performance when lazy loading images. Read more about this topic in [this article about using this plugin in combination with Vue.js](https://markus.oberlehner.net/blog/using-cloudinary-and-storyblok-to-handle-assets-for-a-vue-application/).

## Roadmap

- Support for the [Cloudinary authentication signature](https://cloudinary.com/documentation/media_library_widget#2_optional_generate_the_authentication_signature) ([Issue](https://github.com/maoberlehner/storyblok-cloudinary-assets/issues/1))
- Use real dominant color ([Issue](https://github.com/maoberlehner/storyblok-cloudinary-assets/issues/2))
- Picture tag support ([Issue](https://github.com/maoberlehner/storyblok-cloudinary-assets/issues/3))
- Support for documents and other non image assets ([Issue](https://github.com/maoberlehner/storyblok-cloudinary-assets/issues/4))

## Known issues

- Max files is not working correctly ([Issue](https://github.com/maoberlehner/storyblok-cloudinary-assets/issues/5))
- Syncing `alt` and `title` texts is not possible
- Dominant color is not working correctly with black and white images ([Issue](https://github.com/jariz/vibrant.js/issues/18))

## Articles

- [Using Cloudinary and Storyblok to Handle Assets for a Vue.js Application](https://markus.oberlehner.net/blog/using-cloudinary-and-storyblok-to-handle-assets-for-a-vue-application/)

## Build Setup

```bash
# Install dependencies.
npm install

# Serve with hot reload at localhost:8080.
npm run serve

# Build for production.
npm run build
```

## About

### Author

Markus Oberlehner  
Website: https://markus.oberlehner.net  
Twitter: https://twitter.com/MaOberlehner  
PayPal.me: https://paypal.me/maoberlehner  
Patreon: https://www.patreon.com/maoberlehner

### License

MIT
