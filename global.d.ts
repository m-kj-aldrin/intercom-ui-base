import { Chain, List, Module, Network } from "./elements/base";

type ContextEvent = CustomEvent<{
  type: string;
  emitter: ElementsUnion;
  Chain?: Chain;
  Module?: Module;
}>;

// type listener = (this: ElementsUnion, ev: any) => any;

type ElementsUnion = Chain | Module;

declare global {
  interface HTMLElementTagNameMap {
    "x-list": List;
    "x-network": Network;
    "x-chain": Chain;
    "x-module": Module;
  }

  interface HTMLElementEventMap {
    "elements:context": ContextEvent;
  }
}
