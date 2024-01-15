export default function Footer() {
  return (
    <div className="flex justify-between w-[350px] mx-auto my-5">
      <p className="text-xs text-gray-500">Made with ❤️ by kuhandri</p>

      <a
        className={`text-xs text-gray-500 hover:underline ${window?.__TAURI_METADATA__ ? "hidden" : "block"}`}
        href="https://github.com/LWJerri/FindID"
        target="_blank"
      >
        Source code
      </a>
    </div>
  );
}