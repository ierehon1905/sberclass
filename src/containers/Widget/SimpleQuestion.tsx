import {
  BlockToolConstructable,
  BlockToolConstructorOptions,
  ConversionConfig,
  PasteConfig,
  SanitizerConfig,
} from "@editorjs/editorjs";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Provider, useSelector } from "react-redux";
import { CmsBlockTypes } from "../../entities/cms";
import { RootState, store } from "../../store";
import { ConfiguredWidget, widgetMap } from "./index";
import tumbnail02 from "../../components/images/tumbnail02.png";

// @ts-ignore
export class SimpleQuestion implements BlockToolConstructable {
  data: { type: keyof typeof widgetMap } & ConfiguredWidget;
  wrapper: HTMLDivElement;
  holder: any;
  readOnly: boolean;

  /**
   * Returns true to notify core that read-only is supported
   *
   * @returns {boolean}
   */
  static get isReadOnlySupported() {
    return true;
  }

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
    this.readOnly = config.readOnly;
    console.log("Creating SimpleQuestion", config);
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

  realRender = () => {
    const state = useSelector((state: RootState) => state.taskGroup);
    // const dispatch = useDispatch()
    const [foo, setFoo] = useState(0);

    if (this.data.type) {
      const Jsx = widgetMap[this.data.type].editRender;
      return (
        <Jsx
          _id={this.data._id}
          data={this.data.data}
          phase={this.readOnly ? "view" : "edit"}
          onChange={data => {
            console.log("Changed input in editor ", data);
            this.data = { ...this.data, data };
            setFoo(p => p + 1);
          }}
        />
      );
    }

    return (
      <div className="choose-question-options-wrapper">
        <button
          onClick={() => {
            this.data.type = CmsBlockTypes.textQuestion;
            console.log("Setting editor tool state", this.data);
            setFoo(p => p + 1);
            this.render();
          }}
        >
          {widgetMap[CmsBlockTypes.textQuestion].title}
        </button>
        <button
          onClick={() => {
            this.data.type = CmsBlockTypes.testSingle;

            console.log("Setting editor tool state", this.data);
            setFoo(p => p + 1);
            this.render();
          }}
        >
          {widgetMap[CmsBlockTypes.testSingle].title}
        </button>
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
    const Jsx = this.realRender;

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
  preview: string = tumbnail02;

  //   validate(savedData) {
  //     if (!savedData.url.trim()) {
  //       return false;
  //     }

  //     return true;
  //   }
}
