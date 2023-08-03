import { ComponentPropsType } from '@/views/Question/QuestionEdit/Components';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

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
  _id?: string;
  cover?: string;
  componentList: ComponentInfoType[];
  selectedId: string;
}

const initialState: ComponentsStateType = {
  componentList: [],
  selectedId: '',
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
  },
});

export const selectComponent = (state: RootState) => state.components;
export const selectComponentList = (state: RootState) => state.components.componentList;
export const selectQuestionTitle = (state: RootState) =>
  state.components.componentList.find(i => i.type === 'QuestionTitle');

export const { resetComponents, setSelectedId, addComponentToList, updateComponentPropsById } =
  componentsSlice.actions;

export default componentsSlice.reducer;
