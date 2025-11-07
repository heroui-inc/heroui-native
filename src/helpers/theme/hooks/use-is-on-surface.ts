import { useSurface } from '../../../components/surface';

export const useIsOnSurface = () => {
  const surfaceContext = useSurface();
  return surfaceContext?.variant && surfaceContext.variant !== 'transparent'
    ? true
    : false;
};
