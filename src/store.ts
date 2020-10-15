import { combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";
import { FlowLessonPageTree, LessonPage } from "./containers/Flow";

export const DEV_data: FlowLessonPageTree = {
  pages: [
    {
      title: "Test1",
      path: "/",
      id: "1",
      flowChildren: ["2", "3", "4", "6"],
      hierarchyChildren: ["2", "3", "4", "6"],
      isRoot: true,
      thumbnail:
        "https://adastrum.io/lessons_data/history-intro/ea07cf78c3cc74393f3442f673405b20.png",
      row: 1,
      column: 1,
    },
    {
      title: "Test2",
      path: "/Test2",
      id: "2",
      flowParent: "1",
      flowChildren: ["5"],
      hierarchyChildren: ["5"],
      thumbnail:
        "https://adastrum.io/lessons_data/history-intro/ea07cf78c3cc74393f3442f673405b20.png",
      row: 1,
      column: 2,
    },
    {
      title: "Test5",
      path: "/Test2/Test5",
      id: "5",
      flowParent: "2",
      flowChildren: [],
      hierarchyChildren: [],
      thumbnail:
        "https://adastrum.io/lessons_data/history-intro/ea07cf78c3cc74393f3442f673405b20.png",
      row: 1,
      column: 3,
    },
    {
      title: "Test3",
      path: "/Test3",
      id: "3",
      flowParent: "1",
      flowChildren: [],
      hierarchyChildren: [],
      thumbnail:
        "https://adastrum.io/lessons_data/history-intro/ea07cf78c3cc74393f3442f673405b20.png",
      row: 2,
      column: 2,
    },
    {
      title: "Test4",
      path: "/Test4",
      id: "4",
      flowParent: "1",
      flowChildren: [],
      hierarchyChildren: [],
      thumbnail:
        "https://adastrum.io/lessons_data/history-intro/ea07cf78c3cc74393f3442f673405b20.png",
      row: 3,
      column: 2,
    },
    {
      title: "Test6",
      path: "/Test6",
      id: "6",
      flowParent: "1",
      flowChildren: [],
      hierarchyChildren: [],
      thumbnail:
        "https://adastrum.io/lessons_data/history-intro/ea07cf78c3cc74393f3442f673405b20.png",
      row: 4,
      column: 2,
    },
  ],
};

export const flowSlice = createSlice({
  name: "pages",
  initialState: DEV_data.pages,
  reducers: {
    removePage: (state, action: { payload: string; type: string }) =>
      state.filter(p => p.id !== action.payload),
    addPage: (
      state,
      action: { payload: Partial<LessonPage>; type: string }
    ) => {
      state.push({
        ...action.payload,
        id: Math.trunc(Math.random() * 1000).toString(),
        title: action.payload.title ?? "",
        path:
          action.payload.path ??
          (action.payload.flowParent
            ? state.find(p => p.id === action.payload.flowParent)?.path +
              (action.payload.title ?? "")
            : ""),
        row:
          action.payload.row ??
          (action.payload.column
            ? state
                .filter(p => p.column === action.payload.column)
                .reduce((max, cur) => Math.max(max, cur.row), 1) || 1
            : 1),

        column: action.payload.column ?? 1,
      });
    },
  },
});

export const workSlice = createSlice({
  name: "work",
  initialState: {
    selectedPages: [] as string[],
  },
  reducers: {
    selectPages: (
      state,
      action: {
        payload: string[];
        type: string;
      }
    ) => {
      state.selectedPages = Array.from(
        new Set(state.selectedPages.concat(action.payload))
      );
    },
    deselectPages: (
      state,
      action: {
        payload: string[];
        type: string;
      }
    ) => {
      state.selectedPages = state.selectedPages.filter(
        p => !action.payload.includes(p)
      );
    },
  },
});

const rootReducer = combineReducers({
  flow: flowSlice.reducer,
  work: workSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
