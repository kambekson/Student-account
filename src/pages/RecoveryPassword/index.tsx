import { useSearchParams } from "react-router-dom";
import { RecoveryPage } from "./recoveryPassword";
import { SendLinkPage } from "./sendLink";

const RecoveryPasswordPage: React.FC = () => {
    const [params] = useSearchParams();
    const token = params.get('token');

    return (
        <div className="flex justify-center items-center h-full">
            {
                token
                ? <RecoveryPage token={token} />
                : <SendLinkPage />
            }
        </div>
    );
};

export default RecoveryPasswordPage;
