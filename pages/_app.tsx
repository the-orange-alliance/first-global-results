import React from "react";
import type { AppProps } from "next/app";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { createEmotionCache } from "@/lib/emotion-cache";
import theme from "@/lib/theme";

const clientSideEmotionCache = createEmotionCache();

const MyApp = ({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: AppProps & { emotionCache: EmotionCache }) => {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
        <style jsx global>{`
          :root {
            --green: #00701a;
            --red: rgb(255, 82, 82);
            --light-red: rgba(255, 82, 82, 0.12);
            --lighter-red: rgba(255, 82, 82, 0.1);
            --blue: rgb(68, 138, 255);
            --light-blue: rgba(68, 138, 255, 0.12);
            --lighter-blue: rgba(68, 138, 255, 0.1);
          }
        `}</style>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;
