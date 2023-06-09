import { useNavigate } from "react-router-dom";

interface Props {
  url: string;
  name: string;
}

const RedirectButton = ({ url, name }: Props) => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    if (url === "/") {
      window.location.reload();
    } else {
      navigate(url);
    }
  };

  return (
    <div style={{ marginRight: "25px" }}>
      <button onClick={handleRedirect}>{name}</button>
    </div>
  );
};

export default RedirectButton;
