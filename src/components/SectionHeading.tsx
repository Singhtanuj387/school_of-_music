function SectionHeading({
  textIndigo,
  textOrange,
}: {
  textIndigo: string;
  textOrange: string;
}) {
  return (
    <h2 className="text-indigo-950 text-[28px] md:text-[42px] font-medium text-center custom-font-2 md:w-full">
      {textIndigo} <span className="text-[#FF7703]">{textOrange}</span>
    </h2>
  );
}

export default SectionHeading;
