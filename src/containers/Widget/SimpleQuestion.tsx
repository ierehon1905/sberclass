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
import { CmsBlockTypes } from "../../entities/cms";

// @ts-ignore

export class SimpleQuestion implements BlockToolConstructable {
  data: { type: keyof typeof widgetMap } & ConfiguredWidget;
  wrapper: HTMLDivElement;
  holder: any;

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
          _id={this.data._id}
          data={this.data.data}
          onChange={params => {
            console.log("Changed input in editor ", params);
            this.data.data = params;
            setFoo(p => p + 1);
          }}
        />
      );
    }

    return (
      <div>
        <ol>
          <li>
            <button
              onClick={() => {
                this.data.type = CmsBlockTypes.textQuestion;
                console.log("Setting editor tool state", this.data);
                setFoo(p => p + 1);
                this.render();
              }}
            >
              {widgetMap["1"].title}
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                this.data.type = CmsBlockTypes.testSingle;

                console.log("Setting editor tool state", this.data);
                setFoo(p => p + 1);
                this.render();
              }}
            >
              {widgetMap["2"].title}
            </button>
          </li>
        </ol>
      </div>
    );
  };

  render() {
    console.log("Rendering ", this.data);

    const wrapper = document.createElement("div");
    this.wrapper = wrapper;
    setTimeout(() => {
      this.holder = wrapper.closest("[id^=editorjs]");
      console.log(
        "Found holder for element ",
        wrapper,
        " and it it ",
        this.holder
      );
    }, 10);

    wrapper.id = "simple-question";
    const Jsx = this.realReder;

    ReactDOM.render(
      <div>
        <Provider store={store}>
          <Jsx></Jsx>
        </Provider>
      </div>,
      wrapper
    );

    return wrapper;
  }
  save(blockContent) {
    // debugger;
    return JSON.parse(JSON.stringify(this.data));
  }

  //   validate(savedData) {
  //     if (!savedData.url.trim()) {
  //       return false;
  //     }

  //     return true;
  //   }
}
