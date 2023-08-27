import { Oval } from "react-loader-spinner";

const Spinner = () => {
  return (
    <Oval
      height={80}
      width={80}
      color="#2763ff"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#2763ff"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  );
};

export default Spinner;
