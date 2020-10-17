import { API as EditorAPI } from "@editorjs/editorjs";
import React from "react";
import ReactDOM from "react-dom";

type CommentContents = {
  author: string;
  text: string;
  time: number;
};

const Comment = (props: CommentContents) => (
  <div>
    <div>Перед тем как захлебнуться говном {props.author}</div>
    <div> сказал {props.text}</div>
    <div> и пернул {props.time} раз</div>
  </div>
);
// @ts-ignore
window.initializeComments = (e: HTMLElement) => {
  const comment = JSON.parse(e.dataset.comment) as CommentContents;

  ReactDOM.hydrate(<Comment {...comment} />, e);
  // let author = e.querySelector(".author");
  // if (author) {
  //   author.textContent = comment.author;
  // } else {
  // }
  // document.createElement("div");

  // e.appendChild(author);

  console.log("Comment hovered", comment, e);
};

export class CommentTool {
  _state: any;
  button: null | HTMLButtonElement;
  api: EditorAPI;
  tag: string;
  class: string;
  static get isInline() {
    return true;
  }

  get state() {
    return this._state;
  }

  set state(state) {
    this._state = state;
    // console.log({ state });
    this.button.classList.toggle(this.api.styles.inlineToolButtonActive, state);
  }

  constructor({ api }: { api: EditorAPI }) {
    console.log("Creating new comment instance");

    this.api = api;
    this.button = null;
    this._state = false;

    this.tag = "MARK";
    this.class = "cdx-marker";
  }

  render() {
    console.log("Rendering coomment");

    this.button = document.createElement("button");
    this.button.type = "button";
    this.button.innerHTML =
      '<svg width="20" height="18"><path d="M10.458 12.04l2.919 1.686-.781 1.417-.984-.03-.974 1.687H8.674l1.49-2.583-.508-.775.802-1.401zm.546-.952l3.624-6.327a1.597 1.597 0 0 1 2.182-.59 1.632 1.632 0 0 1 .615 2.201l-3.519 6.391-2.902-1.675zm-7.73 3.467h3.465a1.123 1.123 0 1 1 0 2.247H3.273a1.123 1.123 0 1 1 0-2.247z"/></svg>';
    this.button.classList.add(this.api.styles.inlineToolButton);

    return this.button;
  }
  updated() {
    console.log("UPDATED");
  }
  rendered() {
    console.log("RENDERED");
  }

  surround(range: Range) {
    if (this.state) {
      this.unwrap(range);
      return;
    }

    this.wrap(range);
  }

  wrap(range: Range) {
    const selectedText = range.extractContents();
    const mark = document.createElement(this.tag);

    mark.classList.add(this.class);
    mark.appendChild(selectedText);
    const markInput = document.createElement("input");
    mark.style.position = "relative";
    markInput.style.position = "absolute";
    markInput.style.left = "100%";
    markInput.style.top = "0";

    markInput.onchange = e => {
      mark.setAttribute(
        "data-comment",
        JSON.stringify({
          author: "leon",
          // @ts-ignore
          text: e.target.value,
          time: new Date().getTime(),
        })
      );
      // @ts-ignore
      // mark.setAttribute("title", e.target.value);
    };
    mark.onmouseenter = e => {
      // console.log("Mouse entered comment");
      mark.appendChild(markInput);
    };
    mark.onmouseleave = e => {
      // console.log("Mouse left comment");
      mark.removeChild(markInput);
    };
    mark.setAttribute("onmouseover", "window.initializeComments(this)");
    range.insertNode(mark);

    this.api.selection.expandToTag(mark);
  }

  unwrap(range: Range) {
    const mark = this.api.selection.findParentTag(this.tag, this.class);
    const text = range.extractContents();

    mark.remove();

    range.insertNode(text);
  }

  checkState() {
    const mark = this.api.selection.findParentTag(this.tag);

    this.state = !!mark;
  }

  static get sanitize() {
    return {
      mark: {
        class: "cdx-marker",
        "data-comment": true,
        onmouseover: true,
        title: true,
      },
    };
  }
}
