import { useAtomValue, useSetAtom } from "jotai";
import { modalPopupAtom } from "../atoms/loginModalAtom";

import { selectAtom } from "jotai/utils";

// Utility hooks for reading and writing separately
export const useModalPopupAtom = () => useAtomValue(modalPopupAtom);

export const useSetModalPopupAtom = () => useSetAtom(modalPopupAtom);

modalPopupAtom;
