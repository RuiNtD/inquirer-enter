import {
  createPrompt,
  useState,
  useKeypress,
  isEnterKey,
  usePrefix,
  makeTheme,
  type Theme,
  type Status,
} from "@inquirer/core";
import type { PartialDeep } from "@inquirer/type";
import { blue, green } from "@std/fmt/colors";
import figures from "@inquirer/figures";

const defaultTheme = {
  prefix: {
    idle: blue(figures.info),
    done: green(figures.tick),
  },
};

type ConfirmConfig = {
  message?: string;
  theme?: PartialDeep<Theme>;
};

export default createPrompt<boolean, ConfirmConfig>((config, done) => {
  const [status, setStatus] = useState<Status>("idle");
  const theme = makeTheme(defaultTheme, config.theme);
  const prefix = usePrefix({ status, theme });

  useKeypress((key) => {
    if (isEnterKey(key)) {
      setStatus("done");
      done(true);
    }
  });

  const message = theme.style.message(
    config.message ?? "Press Enter to continue...",
    status
  );
  return `${prefix} ${message}`;
});
