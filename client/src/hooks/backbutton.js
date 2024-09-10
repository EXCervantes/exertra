import { useNavigate } from "react-router-dom";

export const backButton = () => {
    const navigate = useNavigate();

    const onBack = (e) => {
        e.preventDefault();
        navigate(-1);
    };
}
