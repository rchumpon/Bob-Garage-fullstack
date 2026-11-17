const Title = ({ title, subTitle, align }) => {
  return (
    <div
      className={`flex flex-col jsutify-center items-center text-center ${align === "left" && "md:items-start md:text-left"}`}
    >
      <h1 className="font-semibold text-primary text-4xl md:text-[40px]">
        {title}
      </h1>
      <p className="text-sm md:text-base text-muted-foreground/90 mt-2 max-w-150">
        {subTitle}
      </p>
    </div>
  );
};
export default Title;
