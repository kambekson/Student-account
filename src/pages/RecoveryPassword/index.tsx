import { Box } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { RecoveryPage } from "./recoveryPassword";
import { SendLinkPage } from "./sendLink";

const RecoveryPasswordPage: React.FC = () => {
    const [params, _] = useSearchParams();
    const token = params.get('token')

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height={"100%"}>
            {
                token
                ? <RecoveryPage token={token} />
                : <SendLinkPage />
            }
        </Box>
    )
}

export default RecoveryPasswordPage;
