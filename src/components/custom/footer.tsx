import { clsx } from "clsx";

const REPOSITORY_GITHUB_URL = "https://github.com/LWJerri/FindID";

export default function Footer() {
  return (
    <div className="flex justify-between w-[350px] mx-auto my-5">
      <p className="text-xs text-gray-500">Made with ❤️ by kuhandri</p>

      <a
        href={REPOSITORY_GITHUB_URL}
        target="_blank"
        className={clsx("text-xs text-gray-500 hover:underline",
          window?.__TAURI_METADATA__ ? "hidden" : "block")
        }
      >
        Source code
      </a>
    </div>
  );
}
