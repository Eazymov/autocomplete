declare module "*.vue" {
  import Vue, { ComponentOptions } from 'vue';
  const file: ComponentOptions<Vue>;
  export default file;
}

declare module "Components/*" {
  import Vue, { ComponentOptions } from 'vue';
  const file: ComponentOptions<Vue>;
  export default file;
}
