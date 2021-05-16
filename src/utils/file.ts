/* eslint-disable no-useless-return */
import { unlinkSync, statSync } from "fs";

export const deleteFile = (filename: string): void => {
  try {
    statSync(filename);
  } catch {
    return;
  }
  unlinkSync(filename);
};
