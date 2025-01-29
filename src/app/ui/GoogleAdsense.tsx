import Script from "next/script";

type GoogleAdsenseScriptProps = {
  pId: string;
};

const GoogleAdsenseScript: React.FC<GoogleAdsenseScriptProps> = ({ pId }) => {
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${pId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
};

export default GoogleAdsenseScript;
