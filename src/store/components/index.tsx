import { ComponentPropsType } from '@/views/Question/QuestionEdit/Components';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { nanoid } from 'nanoid';
import { cloneDeep } from 'lodash';
import { arrayMove } from '@dnd-kit/sortable';

// 组件的类型
export type ComponentTypesType = 'QuestionTitle' | 'QuestionInput';

// 单个组件的类型信息
export interface ComponentInfoType {
  _id: string;
  type: ComponentTypesType;
  name?: string;
  // 组件的props信息
  props?: ComponentPropsType;
}

// 整个问卷详情的数据结构
export interface ComponentsStateType {
  _id: string;
  cover?: string;
  componentList: ComponentInfoType[];
  selectedId: string;
  copiedComponent: ComponentInfoType | undefined;
  title: string;
}

const initialState: ComponentsStateType = {
  _id: '',
  componentList: [],
  selectedId: '',
  copiedComponent: undefined,
  title: '',
};

const componentsSlice = createSlice({
  name: 'components',
  initialState,
  reducers: {
    // 重置所有组件信息
    resetComponents(state: ComponentsStateType, action: PayloadAction<ComponentsStateType>) {
      return action.payload;
    },

    // 设置组件选中状态
    setSelectedId(state: ComponentsStateType, action: PayloadAction<string>) {
      state.selectedId = action.payload;
    },

    // 添加组件
    addComponentToList(state: ComponentsStateType, action: PayloadAction<ComponentInfoType>) {
      if (!state.selectedId) {
        state.componentList.push(action.payload);
      } else {
        const index = state.componentList.findIndex(i => i._id === state.selectedId);
        state.componentList.splice(index + 1, 0, action.payload);
      }
    },

    // 更新组件的props信息
    updateComponentPropsById(
      state: ComponentsStateType,
      action: PayloadAction<{ id: string; props: ComponentPropsType }>
    ) {
      const { id, props } = action.payload;
      if (id) {
        const component = state.componentList.find(i => i._id === id);
        if (component) {
          component.props = {
            ...component.props,
            ...props,
          };
        }
      }
    },

    /**
     * @description: 删除组件
     * @param {ComponentsStateType} state
     * @param {PayloadAction} action 组件_id
     * @return {*}
     */
    deleteComponentById(state: ComponentsStateType, action: PayloadAction<string>) {
      const index = state.componentList.findIndex(c => c._id === action.payload);

      // 判断是不是最后一个
      const nextId =
        index + 1 === state.componentList.length
          ? state.componentList[index - 1]?._id || ''
          : state.componentList[index + 1]._id;
      // 删除
      if (index >= 0) {
        state.componentList.splice(index, 1);
        state.selectedId = state.componentList.length ? nextId : '';
      }
    },

    /**
     * @description:
     * @param {ComponentsStateType} state
     * @param {PayloadAction} action 被复制组件的_id
     * @return {*}
     */
    copyComponentById(state: ComponentsStateType, action: PayloadAction<string>) {
      const item = state.componentList.find(c => c._id === action.payload);
      if (item) {
        const copyComponent = cloneDeep(item);
        state.copiedComponent = copyComponent;
      }
    },

    /**
     * @description: 粘贴组件
     * @param {ComponentsStateType} state
     * @param {PayloadAction} action 粘贴位置 index
     * @return {*}
     */
    pasteComponentByIndex(state: ComponentsStateType, action: PayloadAction<number>) {
      if (!state.copiedComponent) {
        return;
      }
      const index = action.payload;
      const copiedComponent = cloneDeep(state.copiedComponent);
      copiedComponent._id = nanoid();
      state.componentList.splice(index, 0, copiedComponent);
      state.selectedId = copiedComponent._id;
    },

    // 选中上一个组件
    selectPreviousComponent(state: ComponentsStateType) {
      const { selectedId, componentList } = state;
      if (!selectedId || componentList.length <= 1) {
        return;
      }
      const index = componentList.findIndex(c => c._id === selectedId);
      if (index > 0) {
        state.selectedId = componentList[index - 1]._id;
      }
    },

    // 选中上一个组件
    selectNextComponent(state: ComponentsStateType) {
      const { selectedId, componentList } = state;
      if (!selectedId || componentList.length <= 1) {
        return;
      }
      const index = componentList.findIndex(c => c._id === selectedId);
      if (index >= 0 && index !== componentList.length - 1) {
        state.selectedId = componentList[index + 1]._id;
      }
    },

    setQuestionTitle(state: ComponentsStateType, action: PayloadAction<string>) {
      state.title = action.payload;
    },

    // 组件排序
    sortComponent(
      state: ComponentsStateType,
      action: PayloadAction<{ oldIndex: number; newIndex: number }>
    ) {
      const { oldIndex, newIndex } = action.payload;
      state.componentList = arrayMove(state.componentList, oldIndex, newIndex);
    },
  },
});

export const selectComponent = (state: RootState) => state.components;
export const selectComponentList = (state: RootState) => state.components.componentList;
export const selectQuestionTitle = (state: RootState) =>
  state.components.componentList.find(i => i.type === 'QuestionTitle');

export const {
  resetComponents,
  setSelectedId,
  addComponentToList,
  updateComponentPropsById,
  deleteComponentById,
  copyComponentById,
  pasteComponentByIndex,
  selectPreviousComponent,
  selectNextComponent,
  setQuestionTitle,
  sortComponent,
} = componentsSlice.actions;

export default componentsSlice.reducer;
