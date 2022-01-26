import type { App, Plugin, Component } from 'vue-demi';
import { isVue3, Vue2 } from 'vue-demi';

type Vue = typeof Vue2

export function withInstall(comp: Component): Component & Plugin {
  const c = comp as Component & Plugin;

  c.install = isVue3
    ? function(app: App) {
        app.component(c.name!, comp);
      }
    : function(Vue: Vue) {
        Vue.component(c.name, comp);
      };

  return c;
};
