import React from "react";
import type { AppProps } from "next/app";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { createEmotionCache } from "@/lib/emotion-cache";
import theme from "@/lib/theme";
import NiceModal from "@ebay/nice-modal-react";

const clientSideEmotionCache = createEmotionCache();

const MyApp = ({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: AppProps & { emotionCache: EmotionCache }) => {
  return (
    <CacheProvider value={emotionCache}>
      {/* `defaultMode="system"` is what makes a first-time visitor follow their
          OS setting; once they pick from the nav selector the choice is stored
          under the `mui-mode` key and wins.  pages/_document.tsx applies the
          resolved scheme before first paint. */}
      <ThemeProvider theme={theme} defaultMode="system">
        <NiceModal.Provider>
          {/* `enableColorScheme` sets the CSS `color-scheme` property, so form
              controls and scrollbars follow the theme too. */}
          <CssBaseline enableColorScheme />
          <Component {...pageProps} />
          <style jsx global>{`
            /* The alliance colours, read by match-list.module.css.  Everything
               else it needs now comes from --mui-palette-* (see lib/theme.ts);
               these stay hand-written because they are not palette entries.

               The dark values are lighter hues with much higher tint alphas —
               a 2% or 12% wash is effectively invisible on a dark surface. */
            :root {
              --green: #00701a;
              --red: rgb(255, 82, 82);
              --light-red: rgba(255, 82, 82, 0.12);
              --lighter-red: rgba(255, 82, 82, 0.1);
              --blue: rgb(68, 138, 255);
              --light-blue: rgba(68, 138, 255, 0.12);
              --lighter-blue: rgba(68, 138, 255, 0.1);
            }

            [data-mui-color-scheme="dark"] {
              --green: #4caf50;
              --red: rgb(255, 116, 116);
              --light-red: rgba(255, 82, 82, 0.25);
              --lighter-red: rgba(255, 82, 82, 0.18);
              --blue: rgb(102, 162, 255);
              --light-blue: rgba(68, 138, 255, 0.25);
              --lighter-blue: rgba(68, 138, 255, 0.18);
            }
          `}</style>
        </NiceModal.Provider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;
