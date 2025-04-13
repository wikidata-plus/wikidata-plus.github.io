import { inject, type Ref } from 'vue'

export function useMapInstance() {
  const map = inject<Ref<L.Map | undefined>>('map');

  if (!map) {
    throw new Error('useMapInstance() must be used inside <Map>');
  }

  return map;
}
