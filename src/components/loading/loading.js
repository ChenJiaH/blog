import Vue from 'vue';
import constructor from './src/Loading.vue';

// 实例对象
let instance;

const Loading = {
  create() {
    if (!instance) {
      // 组件构造器
      const ModalConstructor = Vue.extend(constructor);
      instance = new ModalConstructor();
      // 挂载实例
      instance.$mount();
      document.body.appendChild(instance.$el);
    }
  },
  show(text) {
    instance.$props.show = true;
    instance.$props.text = text || '数据加载中 …';
  },
  hide() {
    instance.$props.show = false;
  },
};
// 默认先创建一个
Loading.create();

export default {
  show(text) {
    Loading.show(text);
  },
  hide() {
    Loading.hide();
  },
};
