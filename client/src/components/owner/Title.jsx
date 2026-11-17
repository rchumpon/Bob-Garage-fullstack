const Title = ({ title, subTitle }) => {
  return (
    <>
      <h1 className="font-medium text-3xl text-primary">{title}</h1>
      <p className="text-sm md:text-base text-muted-foreground/90 mt-2 max-w-156">
        {subTitle}
      </p>
    </>
  );
};
export default Title;
