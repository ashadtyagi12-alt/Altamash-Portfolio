import { useEffect, useRef, useCallback } from 'react';
import { useBuildSystem } from '../context/BuildSystemContext';
import { BuildItemType } from '../types/buildSystem';

export function useRegisterBuildItem<T extends HTMLElement = HTMLDivElement>(
  id: string,
  type: BuildItemType,
  label: string,
  onBuilt?: () => void,
  priority = 0
) {
  const { registerItem, unregisterItem } = useBuildSystem();
  const elementRef = useRef<T | null>(null);

  const setRef = useCallback(
    (node: T | null) => {
      elementRef.current = node;
      if (node) {
        registerItem(id, type, label, node, onBuilt, priority);
      } else {
        unregisterItem(id);
      }
    },
    [id, type, label, registerItem, unregisterItem, onBuilt, priority]
  );

  useEffect(() => {
    return () => {
      unregisterItem(id);
    };
  }, [id, unregisterItem]);

  return setRef;
}
