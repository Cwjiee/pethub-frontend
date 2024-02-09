export default function Tag({ filter, tag, tagId }) {
  return (
    <div
      className="flex justify-center items-center bg-white rounded-[40px] px-7 h-[32px] w-auto cursor-pointer"
      style={{
        boxShadow:
          "0px 4px 6px -2px rgba(0, 0, 0, 0.05), 0px 10px 15px -3px rgba(0, 0, 0, 0.10)",
      }}
      key={tagId}
      onClick={() => filter(tag)}
    >
      <span className="font-semibold text-md spacing" key={tagId}>
        {tag}
      </span>
    </div>
  );
}
