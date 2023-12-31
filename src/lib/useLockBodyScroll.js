import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";
import { RefObject, useEffect } from "react";

export const TOUCH_MOVE_CONTAINER_CLASS_NAME = "DiableScroll-touch-move-container";

// @see https://github.com/willmcpo/body-scroll-lock#allowtouchmove
const allowTouchMoveFn = (el) => {
  while (el && el !== document.body) {
    if (el.className?.includes?.(TOUCH_MOVE_CONTAINER_CLASS_NAME)) return true;

    el = el.parentElement;
  }
};
/* opts{
  disableLock?: boolean;
  allowTouchMove?: boolean;
}  */
export default function useLockBodyScroll(ref, isVisible, opts = {}) {
  useEffect(() => {
    if (opts.disableLock) {
      return;
    }

    if (ref.current) {
      if (isVisible) {
        disableBodyScroll(ref.current, {
          allowTouchMove: opts.allowTouchMove ? allowTouchMoveFn : undefined,
        });
      } else {
        enableBodyScroll(ref.current);
      }
    }

    return () => clearAllBodyScrollLocks();

    // needs ref.current in deps, not just ref
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current, opts.allowTouchMove, opts.disableLock, isVisible]);
}
