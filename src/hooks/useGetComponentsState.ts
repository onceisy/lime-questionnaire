import { selectComponent } from '@/store/components';
import { useAppSelector } from '@/store/hooks';

export function useGetComponentsState() {
  const componentsState = useAppSelector(selectComponent);
  const { selectedId, componentList, title, _id } = componentsState;

  const selectedComponent = componentList.find(i => i._id === selectedId);

  return {
    selectedId,
    componentList,
    selectedComponent,
    componentsState,
    title,
    _id,
  };
}
