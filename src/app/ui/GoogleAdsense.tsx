import Script from "next/script";

type GoogleAdsenseScriptProps = {
  pId: string;
};

const GoogleAdsenseScript: React.FC<GoogleAdsenseScriptProps> = ({ pId }) => {
  return (
    <Script
      async
      id="Adsense-id"
      data-ad-client={pId}
      strategy="beforeInteractive"
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
    />
  );
};

export default GoogleAdsenseScript;
