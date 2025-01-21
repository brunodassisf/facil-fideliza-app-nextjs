import { getStoreByTag } from "@/core/actions/store";
import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({ params }: { params: { tag: string } }) {
  const store = await getStoreByTag(params.tag);
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 70,
          fontWeight: "bolder",
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: `15px solid ${store.textColor || "#000"}`,
          backgroundColor: store.bgColor || "",
          color: store.textColor || "",
        }}
      >
        {store.name}
      </div>
    ),
    {
      ...size,
    }
  );
}
