import { API as EditorAPI } from "@editorjs/editorjs";
import React, { useState } from "react";
import ReactDOM from "react-dom";

type CommentContents = {
  author: string;
  text: string;
  time: number;
};

const Comment = (props: CommentContents & { mark: HTMLElement }) => {
  const [state, setState] = useState(true);
  return (
    <div
      style={{
        position: "absolute",
        // left: "100%",
        left:
          props.mark.parentElement.getBoundingClientRect().left +
          props.mark.parentElement.getBoundingClientRect().width,
        top: props.mark.getBoundingClientRect().top,
        // top: 0,
        backgroundColor: "lightgray",
        borderRadius: "0.5em",
        display: state ? "inline-block" : "none",
        zIndex: 100,
      }}
      // onMouseLeave={() => setState(!state)}
      className="react-comment"
    >
      <div>Автор {props.author}</div>
      <div>Текст {props.text}</div>
      <div>Дата {props.time}</div>
      <input
        type="text"
        name="comment"
        // value={props.text}
        defaultValue={props.text}
        onChange={e => {
          const v = e.target.value;
          props.mark.dataset.comment = JSON.stringify({
            author: props.author,
            time: props.time,
            text: v,
          });
        }}
      />
      <button
        onClick={() => {
          const text = props.mark.innerText;
          // props.mark
          props.mark.insertAdjacentText("beforebegin", text);
          props.mark.remove();
          setState(false);
        }}
      >
        Решить
      </button>
    </div>
  );
};
// @ts-ignore
window.initializeComments = function (e: HTMLElement) {
 

  const comment = JSON.parse(e.dataset.comment || "{}") as CommentContents;

  // const initialized = e.querySelector(".react-comment-wrapper");
  // if (!!initialized) {
  //   ReactDOM.hydrate(<Comment {...comment} key={comment.text} />, initialized);
  //   return;
  // }
  const el = document.createElement("comment-root");
  document.body.appendChild(el);
  // el.className = "react-comment-wrapper";
  ReactDOM.hydrate(<Comment {...comment} mark={e} key={comment.text} />, el);

  // e.appendChild(el);
  // let author = e.querySelector(".author");
  // if (author) {
  //   author.textContent = comment.author;
  // } else {
  // }
  // document.createElement("div");

  // e.appendChild(author);

  // console.log("Comment hovered", comment, e);
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
    mark.style.position = "relative";

    mark.setAttribute("onmouseenter", "window.initializeComments(this)");
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
        onmouseenter: true,
        title: true,
      },
    };
  }
}
