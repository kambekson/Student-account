import { getSubdomain } from "@/shared/lib/utils";
import { notifyError } from "@/shared/ui/Toasts/options";
import { UserAPI } from "@/entities/User";
import { InformationSystemError, subcodeMap } from "@/entities/Common";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/shared/ui/Switcher/LanguageSwitcher";

const useNotEmpty = (
  value: string,
  textError: string,
  setTextError: (value: string) => void
) => {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setTextError(value ? "" : textError);
  }, [value]);
};

export const SendLinkPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [textError, setTextError] = useState("");
  const [isDisabled, setDisabled] = useState(false);
  const [isSendCodeDisabled, setSendCodeDisabled] = useState(false);
  const [sendOneTime, setSendOneTime] = useState(false);
  const [sendTimeLeft, setSendTimeLeft] = useState(0);
  const [isSendTimerRunning, setSendTimerRunning] = useState(false);

  const domain = getSubdomain();

  const { t } = useTranslation();

  useNotEmpty(email, t("Поле не может быть пустым"), setTextError);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isSendTimerRunning && sendTimeLeft > 0) {
      timer = setInterval(() => {
        setSendTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (sendTimeLeft <= 0) {
      setSendTimerRunning(false);
    }

    return () => clearInterval(timer);
  }, [isSendTimerRunning, sendTimeLeft]);

  const handleButtonClick = async () => {
    if (textError || (isSendTimerRunning && sendTimeLeft)) {
      return;
    }

    setDisabled(true);
    setSendCodeDisabled(true);

    try {
      await UserAPI.recoveryPasswordSendLink({
        domain: domain ?? "",
        email: email,
      });

      setSendOneTime(true);
      setSendTimeLeft(60);
      setSendTimerRunning(true);
    } catch (e: unknown) {
      let msg: string;
      if (e instanceof InformationSystemError) {
        msg = e.subcode ? subcodeMap[e.subcode] : e.message;

        if (e.code >= 500) {
          notifyError(`${t("Не удалось отправить письмо")}.`, t(msg));
        } else {
          setTextError(msg);
        }
      } else {
        notifyError(
          `${t("Не удалось отправить письмо")}.`,
          t("Неизвестная ошибка")
        );
        console.error("send email error", e);
      }
    } finally {
      setDisabled(false);
      setSendCodeDisabled(false);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap="1rem"
      width="400px"
    >
      <div>{t("Восстановление пароля")}</div>
      <TextField
        fullWidth
        label={t("Электронная почта")}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        error={!!textError}
        helperText={textError}
        disabled={isDisabled}
      />
      {!sendOneTime ? (
        !isDisabled ? (
          <Button
            fullWidth
            variant="contained"
            onClick={handleButtonClick}
            disabled={isDisabled}
          >
            {t("Продолжить")}
          </Button>
        ) : (
          <CircularProgress />
        )
      ) : (
        <Box display="flex" flexDirection="column" gap="1rem">
          <span>
            {t(
              "Мы отправили письмо с ссылкой на восстановление пароля на Вашу почту"
            )}
            .
          </span>
          <Box>
            <span>{t("Еще не получили письмо")}?</span>
            {!isSendCodeDisabled ? (
              <Button disabled={isSendCodeDisabled} onClick={handleButtonClick}>
                {isSendTimerRunning && sendTimeLeft > 0
                  ? sendTimeLeft
                  : t("Отправить повторно")}
              </Button>
            ) : (
              <CircularProgress />
            )}
          </Box>
        </Box>
      )}
      <LanguageSwitcher />
    </Box>
  );
};
