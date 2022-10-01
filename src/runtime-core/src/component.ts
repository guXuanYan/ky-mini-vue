import { shallowReadonly } from "../../reactivity/src/reactive";
import { isObject } from "../../tools";
import { emit } from "./componentEmit";
import { initProps } from "./initProps";
import { initSlots } from "./initSlots";

export function createComponentInstance(vnode: any) {
  const component = {
    vnode,
    type: vnode.type,
    setupState: {},
    proxy: null,
    props: null,
    slots: null,
    $emit: () => {},
  };

  component.$emit = emit.bind(null, component) as any;

  return component;
}

export function setupComponent(instance: any) {
  // TODO:
  // initProps
  initProps(instance);
  // initSlots
  initSlots(instance);
  // vue3 里除了有状态的组件还有函数组件（没有状态）
  setupStatefulComponent(instance);
}

function setupStatefulComponent(instance: any) {
  const Component = instance.type;
  const { setup } = Component;
  if (setup) {
    // function == > render fn or Object
    const shallowProps = shallowReadonly(instance.props);
    const setupResult = setup(shallowProps, {
      emit: instance.$emit,
    });
    handleSetupResult(instance, setupResult);
  }
}

function handleSetupResult(instance: any, setupResult: any) {
  // TODO:
  // function
  if (isObject(setupResult)) {
    instance.setupState = setupResult;
  }
  // 查看是不是有 render
  finishComponentSetup(instance);
}
function finishComponentSetup(instance: any) {
  const Component = instance.type;
  if (Component.render) {
    instance.render = Component.render;
  }
}
