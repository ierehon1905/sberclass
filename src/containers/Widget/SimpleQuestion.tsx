import React, { useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { RootState, store } from "../../store";
import {
  BlockToolConstructable,
  BlockToolConstructorOptions,
  ConversionConfig,
  PasteConfig,
  SanitizerConfig,
} from "@editorjs/editorjs";
import ReactDOM from "react-dom";
import { widgetMap, ConfiguredWidget } from "./index";

// @ts-ignore

export class SimpleQuestion implements BlockToolConstructable {
  data: { type: keyof typeof widgetMap } & ConfiguredWidget;

  static get toolbox() {
    return {
      title: "Question",
      icon: "?",
    };
  }
  constructor(
    config: BlockToolConstructorOptions<
      {
        type: keyof typeof widgetMap;
      } & ConfiguredWidget
    >
  ) {
    this.data = config.data;
    console.log("Creating SimpleQuestion");
  }

  toolbox?: { icon: string; title?: string };
  pasteConfig?: false | PasteConfig;
  conversionConfig?: ConversionConfig;
  isReadOnlySupported?: boolean;
  isInline?: boolean;
  sanitize?: SanitizerConfig;
  title?: string;
  prepare?(data: { toolName: string; config: any }): void | Promise<void> {
    throw new Error("Method not implemented.");
  }
  reset?(): void | Promise<void> {
    throw new Error("Method not implemented.");
  }

  realReder = () => {
    const state = useSelector((state: RootState) => state.taskGroup);
    // const dispatch = useDispatch()
    const [foo, setFoo] = useState(0);

    if (this.data.type) {
      const Jsx = widgetMap[this.data.type].editRender;
      return (
        <Jsx
          inTaskGroupId={this.data.inTaskGroupId}
          params={this.data.params}
          onChange={params => {
            console.log("Changed input in editor ", params);
            this.data.params = params;
            setFoo(p => p + 1);
          }}
        />
      );
    }

    return (
      <div>
        {state.length}
        {this.data.type}
        <ol>
          <li>
            <button
              onClick={() => {
                this.data.type = "1";
                console.log("Setting editor tool state", this.data);
                setFoo(p => p + 1);
                this.render();
              }}
            >
              Текстовое задание
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                this.data.type = "2";
                console.log("Setting editor tool state", this.data);
                setFoo(p => p + 1);
                this.render();
              }}
            >
              Тест с вариантом выбора
            </button>
          </li>
        </ol>
      </div>
    );
  };

  render() {
    console.log("Rendering ", this.data);

    const wrapper = document.createElement("div");

    wrapper.id = "simple-question";
    const Jsx = this.realReder;

    ReactDOM.render(
      <div key={Math.random()}>
        <Provider store={store}>
          <Jsx></Jsx>
        </Provider>
      </div>,
      wrapper
    );

    return wrapper;
  }
  save(blockContent) {


    return JSON.parse(JSON.stringify(this.data));
  }

  //   validate(savedData) {
  //     if (!savedData.url.trim()) {
  //       return false;
  //     }

  //     return true;
  //   }
}
