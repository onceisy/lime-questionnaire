import { selectComponent } from '@/store/questionInfoSlice';
import { useAppSelector } from '@/store/hooks';

export function useGetComponentsState() {
  const componentsState = useAppSelector(selectComponent);
  const { selectedId, componentList, title, _id, isAutoSave } = componentsState;

  const selectedComponent = componentList.find(i => i.componentId === selectedId);

  return {
    selectedId,
    componentList,
    selectedComponent,
    componentsState,
    title,
    _id,
    isAutoSave,
  };
}
