import { Link } from "react-router-dom";
import errorImage from "../../assets/404.png";

const Error404 = () => {
  return (
    <div className="h-screen w-screen">
      <div className="flex justify-center items-center flex-col">
        <img height={800} width={800} src={errorImage} alt="error" />
        <Link to="/" className="bg-darkBlue px-4 py-2 text-white rounded-md">
          Back Home
        </Link>
      </div>
    </div>
  );
};

export default Error404;
